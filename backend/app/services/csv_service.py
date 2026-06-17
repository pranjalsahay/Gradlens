
import io
import pandas as pd
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete

from app.models.student import (
    Student,
    Attendance,
    Department,
    Prediction,
)

from app.schemas.student import (
    CSVUploadResult,
)

REQUIRED_COLUMNS = {
    "student_id",
    "name",
    "department",
    "score",
    "attendance",
    "status",
}


async def _get_or_create_department(
    db: AsyncSession,
    name: str,
) -> str:

    dept_id = (
        name.lower()
        .replace(" ", "_")
    )

    existing = await db.get(
        Department,
        dept_id
    )

    if not existing:
        db.add(
            Department(
                id=dept_id,
                name=name,
            )
        )

    return dept_id


async def process_csv(
    file_bytes: bytes,
    db: AsyncSession,
) -> CSVUploadResult:

    errors = []
    inserted = 0
    skipped = 0

    try:
        df = pd.read_csv(
            io.BytesIO(file_bytes)
        )
    except Exception as e:
        return CSVUploadResult(
            total_rows=0,
            inserted=0,
            skipped=0,
            errors=[
                f"Cannot parse CSV: {e}"
            ],
        )

    # normalize column names
    df.columns = [
        c.strip()
        .lower()
        .replace(" ", "_")
        for c in df.columns
    ]

    missing = (
        REQUIRED_COLUMNS
        - set(df.columns)
    )

    if missing:
        return CSVUploadResult(
            total_rows=0,
            inserted=0,
            skipped=0,
            errors=[
                f"Missing columns: "
                f"{', '.join(sorted(missing))}"
            ],
        )

    df = df.dropna(how="all")
    total_rows = len(df)

    # Delete old data first
    await db.execute(
        delete(Prediction)
    )

    await db.execute(
        delete(Attendance)
    )

    await db.execute(
       delete(Student)
    )

    await db.commit()

    for idx, row in df.iterrows():
        row_num = idx + 2

        try:
            student_id = str(
                row["student_id"]
            ).strip()

            name = str(
                row["name"]
            ).strip()

            department = str(
                row["department"]
            ).strip()

            score = float(
                row["score"]
            )

            attendance = float(
                row["attendance"]
            )

            status = str(
                row["status"]
            ).strip()

            dept_id = (
                await _get_or_create_department(
                    db,
                    department,
                )
            )

            db.add(
                Student(
                    id=student_id,
                    name=name,
                    department_id=dept_id,
                    score=score,
                    semester=2,
                )
            )

            db.add(
                Attendance(
                    student_id=student_id,
                    semester=2,
                    total_classes=100,
                    attended_classes=int(
                        attendance
                    ),
                    percentage=attendance,
                )
            )

            db.add(
                Prediction(
                    student_id=student_id,
                    semester=2,
                    confidence=round(
                        score / 100,
                        2,
                    ),
                    status=status,
                )
            )

            inserted += 1

        except Exception as e:
            skipped += 1
            errors.append(
                f"Row {row_num}: {e}"
            )

    await db.commit()

    return CSVUploadResult(
        total_rows=total_rows,
        inserted=inserted,
        skipped=skipped,
        errors=errors,
    )

