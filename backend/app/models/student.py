from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.database import Base
from sqlalchemy import Float


class PredictionStatus(str, enum.Enum):
    high_performer = "High Performer"
    medium_performer = "Medium Performer"
    at_risk = "At Risk"


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="admin")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Department(Base):
    __tablename__ = "departments"
    id = Column(String, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    students = relationship("Student", back_populates="dept")


class Student(Base):
    __tablename__ = "students"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    score = Column(Float, default=0)
    department_id = Column(String, ForeignKey("departments.id"))
    semester = Column(Integer, nullable=False)
    email = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    dept = relationship("Department", back_populates="students")
    marks = relationship("Mark", back_populates="student", cascade="all, delete-orphan")
    attendances = relationship("Attendance", back_populates="student", cascade="all, delete-orphan")
    predictions = relationship("Prediction", back_populates="student", cascade="all, delete-orphan")


class Subject(Base):
    __tablename__ = "subjects"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    department_id = Column(String, ForeignKey("departments.id"))
    marks = relationship("Mark", back_populates="subject")


class Mark(Base):
    __tablename__ = "marks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String, ForeignKey("students.id"))
    subject_id = Column(String, ForeignKey("subjects.id"))
    internal_marks = Column(Float, nullable=False)
    assignment_score = Column(Float, nullable=False)
    exam_score = Column(Float, nullable=False)
    total_score = Column(Float)
    semester = Column(Integer, nullable=False)
    student = relationship("Student", back_populates="marks")
    subject = relationship("Subject", back_populates="marks")


class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String, ForeignKey("students.id"))
    semester = Column(Integer, nullable=False)
    total_classes = Column(Integer, nullable=False)
    attended_classes = Column(Integer, nullable=False)
    percentage = Column(Float)
    student = relationship("Student", back_populates="attendances")


class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String, ForeignKey("students.id"))
    semester = Column(Integer, nullable=False)
    status = Column(SAEnum(PredictionStatus), nullable=False)
    confidence = Column(Float)
    predicted_at = Column(DateTime(timezone=True), server_default=func.now())
    student = relationship("Student", back_populates="predictions")