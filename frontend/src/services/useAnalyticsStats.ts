import { useEffect, useState, useMemo } from "react";
import type { Student } from "@/types";

export interface AnalyticsStats {
  students: Student[];
  totalStudents: number;
  avgScore: number;
  avgAttendance: number;
  atRiskCount: number;
  lowAttendanceCount: number;
  loading: boolean;
  refetch: () => void;
}

export function useAnalyticsStats(): AnalyticsStats {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/students`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => { if (!cancelled) setStudents(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });

    // Auto-refresh every 60s
    const interval = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [tick]);

const derived = useMemo(() => {
  const total = students.length;

  const avgScore = total > 0
    ? students.reduce((s, x) => s + x.score, 0) / total
    : 0;

  const avgAttendance = total > 0
    ? students.reduce((s, x) => s + x.attendance, 0) / total
    : 0;

  const atRiskCount = students.filter(
    (s) => s.status === "risk"
  ).length;

  const lowAttendanceCount = students.filter(
    (s) => s.attendance < 75
  ).length;

  return {
    totalStudents: total,
    avgScore,
    avgAttendance,
    atRiskCount,
    lowAttendanceCount,
  };
}, [students]);

  return {
    ...derived,
    students,
    loading,
    refetch: () => setTick((t) => t + 1),
  };
}
