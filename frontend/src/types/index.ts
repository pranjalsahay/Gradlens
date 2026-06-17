export type PerformanceStatus =
  | "High Performer"
  | "Medium Performer"
  | "At Risk";

export interface Student {
  id: string;
  name: string;
  studentId: string;
  department: string;
  score: number;
  attendance: number;
  status: PerformanceStatus;
  prediction: string;
  internalMarks: number;
  assignmentScore: number;
  prevSemesterScore: number;
}

export interface StatCard {
  label: string;
  value: string | number;
  change: string;
  changeType: "up" | "down";
  accent: "blue" | "teal" | "purple" | "red";
}

export interface SubjectPerformance {
  subject: string;
  avgScore: number;
  maxScore: number;
}

export interface TrendPoint {
  month: string;
  avgScore: number;
  atRiskAvg: number;
}

export interface AttendanceBucket {
  label: string;
  percentage: number;
  color: string;
}

export interface AtRiskStudent {
  name: string;
  info: string;
  score: number;
  attendance: number;
}
