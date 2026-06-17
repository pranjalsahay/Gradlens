from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.database import get_db
from app.core.auth import get_current_user
from app.services.analytics import get_students_detail
from app.schemas.student import StudentDetail

router = APIRouter(prefix="/api/students", tags=["Students"])


@router.get("/", response_model=List[StudentDetail])
async def get_students(
    semester: int = Query(2, ge=1, le=8),
    department_id: str = None,
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    return await get_students_detail(db, semester, department_id, limit, offset)