from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.db.database import get_db
from app.core.auth import get_current_user
from app.ml.predictor import run_predictions
from app.schemas.student import PredictionOut
from app.models.student import Prediction, Student, Department

router = APIRouter(prefix="/api/predictions", tags=["ML Predictions"])


@router.post("/run", response_model=List[PredictionOut])
async def run_ml_predictions(
    semester: int = Query(2, ge=1, le=8),
    db: AsyncSession = Depends(get_db),
    
):
    results = await run_predictions(db, semester)
    if not results:
        raise HTTPException(status_code=404, detail="No student data found for this semester")
    return results


@router.get("/", response_model=List[PredictionOut])
async def get_predictions(
    semester: int = Query(2, ge=1, le=8),
    status: str = None,
    db: AsyncSession = Depends(get_db),
    
):
    query = (
        select(Student.id, Student.name, Department.name.label("department"),
               Prediction.status, Prediction.confidence)
        .join(Student, Student.id == Prediction.student_id)
        .join(Department, Department.id == Student.department_id)
        .where(Prediction.semester == semester)
    )
    if status:
        query = query.where(Prediction.status == status)
    result = await db.execute(query)
    return [
        PredictionOut(
            student_id=r.id, student_name=r.name, department=r.department,
            status=r.status, confidence=r.confidence or 0,
            attendance=0, score=0,
        )
        for r in result.all()
    ]