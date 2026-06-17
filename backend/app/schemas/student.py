from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


# ── Auth ──────────────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "admin"


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    role: str
    created_at: datetime
    model_config = {"from_attributes": True}


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ── Student ───────────────────────────────────────────────────────────────────

class StudentCreate(BaseModel):
    id: str
    name: str
    department_id: str
    semester: int
    email: Optional[str] = None


class StudentOut(StudentCreate):
    created_at: datetime
    model_config = {"from_attributes": True}


class StudentDetail(BaseModel):
    id: str
    name: str
    department: str
    semester: int
    score: float
    attendance: float
    status: str
    model_config = {"from_attributes": True}


# ── Analytics ─────────────────────────────────────────────────────────────────

class StatCardOut(BaseModel):
    total_students: int
    average_score: float
    average_attendance: float
    at_risk_count: int


class SubjectPerformanceOut(BaseModel):
    subject: str
    average_score: float


class TrendPointOut(BaseModel):
    month: str
    average_score: float


class AttendanceBucketOut(BaseModel):
    label: str
    count: int
    percentage: float


class AnalyticsSummaryOut(BaseModel):
    stats: StatCardOut
    subject_performance: List[SubjectPerformanceOut]
    score_trend: List[TrendPointOut]
    attendance_distribution: List[AttendanceBucketOut]


# ── CSV Upload ────────────────────────────────────────────────────────────────

class CSVUploadResult(BaseModel):
    total_rows: int
    inserted: int
    skipped: int
    errors: List[str]


# ── Prediction ────────────────────────────────────────────────────────────────

class PredictionOut(BaseModel):
    student_id: str
    student_name: str
    department: str
    status: str
    confidence: float
    attendance: float
    score: float
    model_config = {"from_attributes": True}