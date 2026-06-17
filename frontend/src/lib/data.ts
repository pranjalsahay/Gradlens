import type {
  Student,
  StatCard,
  SubjectPerformance,
  TrendPoint,
  AttendanceBucket,
  AtRiskStudent,
} from "@/types";

export const STAT_CARDS: StatCard[] = [
  { label: "Total Students",    value: 248,   change: "↑ 12 this semester",    changeType: "up",   accent: "blue"   },
  { label: "Avg Score",         value: "73.4", change: "↑ 2.1 from last sem",  changeType: "up",   accent: "teal"   },
  { label: "Avg Attendance",    value: "81%",  change: "↓ 1.3% from last sem", changeType: "down", accent: "purple" },
  { label: "At-Risk Students",  value: 34,    change: "↑ 5 flagged this week", changeType: "down", accent: "red"    },
];

export const SUBJECT_PERFORMANCE: SubjectPerformance[] = [
  { subject: "Math",      avgScore: 72, maxScore: 95 },
  { subject: "Physics",   avgScore: 68, maxScore: 90 },
  { subject: "CS",        avgScore: 81, maxScore: 98 },
  { subject: "English",   avgScore: 75, maxScore: 92 },
  { subject: "Chemistry", avgScore: 64, maxScore: 88 },
  { subject: "Stats",     avgScore: 78, maxScore: 96 },
];

export const TREND_DATA: TrendPoint[] = [
  { month: "Jan", avgScore: 68, atRiskAvg: 45 },
  { month: "Feb", avgScore: 70, atRiskAvg: 42 },
  { month: "Mar", avgScore: 67, atRiskAvg: 40 },
  { month: "Apr", avgScore: 73, atRiskAvg: 43 },
  { month: "May", avgScore: 71, atRiskAvg: 39 },
  { month: "Jun", avgScore: 74, atRiskAvg: 37 },
];

export const ATTENDANCE_BUCKETS: AttendanceBucket[] = [
  { label: "≥ 85% Present",  percentage: 58, color: "#38d9a9" },
  { label: "75–85% Regular", percentage: 23, color: "#4d7cfe" },
  { label: "60–75% Low",     percentage: 12, color: "#ffd43b" },
  { label: "< 60% Absent",   percentage: 7,  color: "#ff6b6b" },
];

export const AT_RISK_STUDENTS: AtRiskStudent[] = [
  { name: "Priya Nair",   info: "Physics · Att: 58%",     score: 37, attendance: 58 },
  { name: "Sara Khan",    info: "English · Att: 61%",     score: 42, attendance: 61 },
  { name: "Vikram Das",   info: "Chemistry · Att: 55%",   score: 35, attendance: 55 },
  { name: "Meera Iyer",   info: "Mathematics · Att: 63%", score: 48, attendance: 63 },
];

export const STUDENTS: Student[] = [
  { id: "1", name: "Aisha Patel",   studentId: "CS-2024-001", department: "Computer Sci.", score: 88, attendance: 92, status: "High Performer",   prediction: "High Performer",   internalMarks: 86, assignmentScore: 90, prevSemesterScore: 84 },
  { id: "2", name: "Rohan Sharma",  studentId: "MA-2024-045", department: "Mathematics",   score: 71, attendance: 78, status: "Medium Performer", prediction: "Medium Performer", internalMarks: 69, assignmentScore: 73, prevSemesterScore: 68 },
  { id: "3", name: "Priya Nair",    studentId: "PH-2024-023", department: "Physics",       score: 45, attendance: 58, status: "At Risk",   prediction: "At Risk",          internalMarks: 42, assignmentScore: 48, prevSemesterScore: 50 },
  { id: "4", name: "Dev Mehta",     studentId: "CS-2024-067", department: "Computer Sci.", score: 81, attendance: 85, status: "High Performer",   prediction: "High Performer",   internalMarks: 79, assignmentScore: 83, prevSemesterScore: 77 },
  { id: "5", name: "Sara Khan",     studentId: "EN-2024-012", department: "English",       score: 63, attendance: 61, status: "At Risk",   prediction: "At Risk",          internalMarks: 60, assignmentScore: 65, prevSemesterScore: 67 },
  { id: "6", name: "Arjun Rao",     studentId: "CH-2024-089", department: "Chemistry",     score: 76, attendance: 80, status: "Medium Perfomer", prediction: "Medium Performer", internalMarks: 74, assignmentScore: 78, prevSemesterScore: 72 },
  { id: "7", name: "Deepa Menon",   studentId: "MA-2024-031", department: "Mathematics",   score: 91, attendance: 95, status: "High Performer",   prediction: "High Performer",   internalMarks: 89, assignmentScore: 93, prevSemesterScore: 88 },
  { id: "8", name: "Vikram Das",    studentId: "CH-2024-055", department: "Chemistry",     score: 39, attendance: 55, status: "At Risk",   prediction: "At Risk",          internalMarks: 36, assignmentScore: 41, prevSemesterScore: 44 },
];
