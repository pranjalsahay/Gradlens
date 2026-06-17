"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PerformanceBadge } from "@/components/shared/PerformanceBadge";
import type { AttendanceBucket, AtRiskStudent } from "@/types";

/* ── Attendance Donut ── */
interface AttendanceDonutProps {
  data: AttendanceBucket[];
  overallAttendance?: number; // ← NEW: receives live value from backend
}

export function AttendanceDonut({ data, overallAttendance }: AttendanceDonutProps) {
  // Compute overall from data if not passed explicitly
  const computed =
    overallAttendance ??
    data.reduce((sum, d) => sum + (d.percentage >= 75 ? d.percentage : 0), 0);

  // Weighted average attendance from buckets
  // Bucket mid-points: ≥85 → 90, 75-85 → 80, 60-75 → 67, <60 → 50
  const MID: Record<string, number> = {
    "≥ 85% Present":  90,
    "75–85% Regular": 80,
    "60–75% Low":     67,
    "< 60% Absent":   50,
  };
  const displayPct =
    overallAttendance != null
      ? Math.round(overallAttendance)
      : Math.round(
          data.reduce((sum, d) => sum + (MID[d.label] ?? 75) * (d.percentage / 100), 0)
        );

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[140px] h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="percentage"
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={64}
              strokeWidth={0}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number) => [`${v}%`, ""]}
              contentStyle={{
                backgroundColor: "#0d1030",
                border: "1px solid #1e2560",
                borderRadius: "8px",
                fontSize: "11px",
                color: "#e8ecff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label — now dynamic */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-mono text-[22px] font-bold text-white">{displayPct}%</span>
          <span className="text-[10px] text-gl-muted tracking-widest uppercase">Overall</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4 w-full">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-[12px] text-gl-muted">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: d.color }}
            />
            {d.label}
            <span className="ml-auto font-mono text-[11px]" style={{ color: d.color }}>
              {d.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── At-Risk Panel ── */
export function AtRiskPanel({ students }: { students: AtRiskStudent[] }) {
  const getColor = (score: number) => (score < 40 ? "#ff6b6b" : "#ffd43b");
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <div className="flex flex-col divide-y divide-gl-border/50">
      {students.map((s) => {
        const color = getColor(s.score);
        return (
          <div
            key={s.name}
            className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
          >
            <div
              className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
              style={{ backgroundColor: color + "22", color }}
            >
              {getInitials(s.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">{s.name}</p>
              <p className="text-[11px] text-gl-muted">{s.info}</p>
            </div>
            <span className="font-mono text-[14px] font-bold" style={{ color }}>
              {s.score}%
            </span>
            <PerformanceBadge status="risk" size="sm" />
          </div>
        );
      })}
    </div>
  );
}