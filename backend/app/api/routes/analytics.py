
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.database import get_db
from app.services.analytics import (
    get_analytics_summary,
    get_students_detail,
    get_stat_cards,
    get_subject_performance,
    get_score_trend,
    get_attendance_distribution,
)

from app.schemas.student import (
    AnalyticsSummaryOut,
    StudentDetail,
    StatCardOut,
    SubjectPerformanceOut,
    TrendPointOut,
    AttendanceBucketOut,
)

router = APIRouter(
    prefix="/api/analytics",
    tags=["Analytics"]
)


@router.get(
    "/summary",
    response_model=AnalyticsSummaryOut
)
async def analytics_summary(
    semester: int = Query(
        2,
        ge=1,
        le=8
    ),
    db: AsyncSession = Depends(get_db),
):
    return await get_analytics_summary(
        db,
        semester
    )


@router.get(
    "/stats",
    response_model=StatCardOut
)
async def stat_cards(
    semester: int = Query(
        2,
        ge=1,
        le=8
    ),
    db: AsyncSession = Depends(get_db),
):
    return await get_stat_cards(
        db,
        semester
    )


@router.get(
    "/subjects",
    response_model=List[
        SubjectPerformanceOut
    ]
)
async def subject_performance(
    semester: int = Query(
        2,
        ge=1,
        le=8
    ),
    db: AsyncSession = Depends(get_db),
):
    return await get_subject_performance(
        db,
        semester
    )


@router.get(
    "/trend",
    response_model=List[TrendPointOut]
)
async def score_trend(
    db: AsyncSession = Depends(get_db),
):
    return await get_score_trend(db)


@router.get(
    "/attendance",
    response_model=List[
        AttendanceBucketOut
    ]
)
async def attendance_distribution(
    semester: int = Query(
        2,
        ge=1,
        le=8
    ),
    db: AsyncSession = Depends(get_db),
):
    return await get_attendance_distribution(
        db,
        semester
    )


@router.get(
    "/students",
    response_model=List[
        StudentDetail
    ]
)
async def students_detail(
    semester: int = Query(
        2,
        ge=1,
        le=8
    ),
    department_id: str = None,
    limit: int = Query(
        100,
        ge=1,
        le=500
    ),
    offset: int = Query(
        0,
        ge=0
    ),
    db: AsyncSession = Depends(get_db),
):
    return await get_students_detail(
        db,
        semester,
        department_id,
        limit,
        offset,
    )

