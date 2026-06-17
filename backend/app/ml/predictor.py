import joblib
import numpy as np
from pathlib import Path
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.models.student import Student, Mark, Attendance, Prediction, Department
from app.schemas.student import PredictionOut

MODEL_PATH = Path("app/ml/model.joblib")
ENCODER_PATH = Path("app/ml/label_encoder.joblib")


def _label(attendance: float, score: float) -> str:
    if score >= 75 and attendance >= 75:
        return "High Performer"
    elif score >= 50 and attendance >= 60:
        return "Medium Performer"
    else:
        return "At Risk"


def load_model():
    if not MODEL_PATH.exists():
        return None, None
    return joblib.load(MODEL_PATH), joblib.load(ENCODER_PATH)


def predict_single(attendance: float, avg_internal: float, avg_assignment: float,
                   avg_exam: float, total_score: float) -> tuple[str, float]:
    clf, le = load_model()
    if clf is None:
        label = _label(attendance, total_score)
        return label, 1.0

    X = np.array([[attendance, avg_internal, avg_assignment, avg_exam, total_score]])
    proba = clf.predict_proba(X)[0]
    pred_idx = np.argmax(proba)
    label = le.inverse_transform([pred_idx])[0]
    confidence = round(float(proba[pred_idx]), 3)
    return label, confidence


async def run_predictions(db: AsyncSession, semester: int) -> List[PredictionOut]:
    result = await db.execute(
        select(
            Student.id,
            Student.name,
            Department.name.label("department"),
            func.avg(Mark.internal_marks).label("avg_internal"),
            func.avg(Mark.assignment_score).label("avg_assignment"),
            func.avg(Mark.exam_score).label("avg_exam"),
            func.avg(Mark.total_score).label("total_score"),
            Attendance.percentage.label("attendance"),
        )
        .join(Department, Department.id == Student.department_id)
        .outerjoin(Mark, (Mark.student_id == Student.id) & (Mark.semester == semester))
        .outerjoin(Attendance, (Attendance.student_id == Student.id) & (Attendance.semester == semester))
        .group_by(Student.id, Student.name, Department.name, Attendance.percentage)
    )
    rows = result.all()
    outputs: List[PredictionOut] = []

    for r in rows:
        attendance = r.attendance or 0
        avg_internal = r.avg_internal or 0
        avg_assignment = r.avg_assignment or 0
        avg_exam = r.avg_exam or 0
        total_score = r.total_score or 0

        status, confidence = predict_single(
            attendance, avg_internal, avg_assignment, avg_exam, total_score
        )

        existing = await db.execute(
            select(Prediction).where(
                Prediction.student_id == r.id,
                Prediction.semester == semester,
            )
        )
        pred = existing.scalars().first()
        if pred:
            pred.status = status
            pred.confidence = confidence
        else:
            db.add(Prediction(
                student_id=r.id,
                semester=semester,
                status=status,
                confidence=confidence,
            ))

        outputs.append(PredictionOut(
            student_id=r.id,
            student_name=r.name,
            department=r.department,
            status=status,
            confidence=confidence,
            attendance=round(attendance, 1),
            score=round(total_score, 1),
        ))

    await db.commit()
    return outputs