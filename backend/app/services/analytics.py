
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List

from app.models.student import (
    Student,
    Mark,
    Attendance,
    Prediction,
    Subject,
    Department,
)

from app.schemas.student import (
    StatCardOut,
    SubjectPerformanceOut,
    TrendPointOut,
    AttendanceBucketOut,
    AnalyticsSummaryOut,
    StudentDetail,
)


async def get_stat_cards(
    db: AsyncSession,
    semester: int,
) -> StatCardOut:

    total = await db.scalar(
        select(func.count()).select_from(Student)
    )

    avg_score = await db.scalar(
        select(func.avg(Mark.total_score))
        .where(Mark.semester == semester)
    )

    avg_att = await db.scalar(
        select(func.avg(Attendance.percentage))
        .where(Attendance.semester == semester)
    )

    at_risk = await db.scalar(
        select(func.count())
        .select_from(Prediction)
        .where(
            Prediction.status == "At Risk",
            Prediction.semester == semester,
        )
    )

    return StatCardOut(
        total_students=total or 0,
        average_score=round(avg_score or 0, 1),
        average_attendance=round(avg_att or 0, 1),
        at_risk_count=at_risk or 0,
    )


async def get_subject_performance(
    db: AsyncSession,
    semester: int,
) -> List[SubjectPerformanceOut]:

    result = await db.execute(
        select(
            Subject.name,
            func.avg(Mark.total_score).label("avg")
        )
        .join(
            Mark,
            Mark.subject_id == Subject.id
        )
        .where(Mark.semester == semester)
        .group_by(Subject.name)
        .order_by(
            func.avg(Mark.total_score).desc()
        )
    )

    return [
        SubjectPerformanceOut(
            subject=r.name,
            average_score=round(r.avg, 1),
        )
        for r in result.all()
    ]


async def get_score_trend(
    db: AsyncSession,
) -> List[TrendPointOut]:

    result = await db.execute(
        select(
            Mark.semester.label("sem"),
            func.avg(Mark.total_score)
            .label("avg")
        )
        .group_by(Mark.semester)
        .order_by(Mark.semester)
    )

    return [
        TrendPointOut(
            month=f"Sem {r.sem}",
            average_score=round(r.avg, 1),
        )
        for r in result.all()
    ]


async def get_attendance_distribution(
    db: AsyncSession,
    semester: int,
) -> List[AttendanceBucketOut]:

    result = await db.execute(
        select(Attendance.percentage)
        .where(
            Attendance.semester == semester
        )
    )

    percentages = [r[0] for r in result.all()]
    total = len(percentages) or 1

    buckets = {
        "≥ 85% Present": 0,
        "75–85% Regular": 0,
        "60–75% Low": 0,
        "< 60% Absent": 0,
    }

    for p in percentages:
        if p >= 85:
            buckets["≥ 85% Present"] += 1
        elif p >= 75:
            buckets["75–85% Regular"] += 1
        elif p >= 60:
            buckets["60–75% Low"] += 1
        else:
            buckets["< 60% Absent"] += 1

    return [
        AttendanceBucketOut(
            label=k,
            count=v,
            percentage=round(
                v / total * 100,
                1
            ),
        )
        for k, v in buckets.items()
    ]


async def get_analytics_summary(
    db: AsyncSession,
    semester: int,
) -> AnalyticsSummaryOut:

    return AnalyticsSummaryOut(
        stats=await get_stat_cards(
            db,
            semester,
        ),
        subject_performance=
        await get_subject_performance(
            db,
            semester,
        ),
        score_trend=
        await get_score_trend(db),
        attendance_distribution=
        await get_attendance_distribution(
            db,
            semester,
        ),
    )


async def get_students_detail(
    db: AsyncSession,
    semester: int,
    department_id: str = None,
    limit: int = 100,
    offset: int = 0,
) -> List[StudentDetail]:

    query = (
        select(
            Student.id,
            Student.name,
            Department.name.label(
                "department"
            ),
            Student.semester,
            Student.score.label("score"),
            func.avg(
                Attendance.percentage
            ).label("attendance"),
            Prediction.status,
        )
        .join(
            Department,
            Department.id
            == Student.department_id,
        )
        
        .outerjoin(
            Attendance,
            (
                (
                    Attendance.student_id
                    == Student.id
                )
                &
                (
                    Attendance.semester
                    == semester
                )
            ),
        )
        .outerjoin(
            Prediction,
            (
                (
                    Prediction.student_id
                    == Student.id
                )
                &
                (
                    Prediction.semester
                    == semester
                )
            ),
        )
        .group_by(
            Student.id,
            Student.name,
            Department.name,
            Student.semester,
            Prediction.status,
        )
        .limit(limit)
        .offset(offset)
    )

    if department_id:
        query = query.where(
            Student.department_id
            == department_id
        )

    result = await db.execute(query)
    rows = result.all()

    return [
        StudentDetail(
            id=r.id,
            name=r.name,
            department=r.department,
            semester=r.semester,
            score=round(r.score or 0, 1),
            attendance=round(
                r.attendance or 0,
                1,
            ),
            status=r.status or "Unknown",
        )
        for r in rows
    ]

