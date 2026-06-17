"use client";

import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import type { SubjectPerformance, TrendPoint } from "@/types";

/* ── Shared tooltip style ── */
const tooltipStyle = {
  backgroundColor: "#0d1030",
  border: "1px solid #1e2560",
  borderRadius: "8px",
  color: "#e8ecff",
  fontSize: "12px",
};

/* ── Subject Bar Chart ── */
export function SubjectBarChart({ data }: { data: SubjectPerformance[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e2560" vertical={false} />
        <XAxis dataKey="subject" tick={{ fill: "#6b78b4", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#6b78b4", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(77,124,254,0.06)" }} />
        <Legend
          wrapperStyle={{ fontSize: "11px", color: "#6b78b4", paddingTop: "8px" }}
        />
        <Bar dataKey="avgScore" name="Avg Score" fill="rgba(77,124,254,0.7)"  radius={[3, 3, 0, 0]} />
        <Bar dataKey="maxScore" name="Class Max"  fill="rgba(56,217,169,0.25)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Score Trend Line Chart ── */
export function ScoreTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e2560" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "#6b78b4", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#6b78b4", fontSize: 11 }} axisLine={false} tickLine={false} domain={[20, 100]} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: "11px", color: "#6b78b4", paddingTop: "8px" }} />
        <Line
          dataKey="avgScore"   name="Class Average"
          type="monotone" stroke="#4d7cfe" strokeWidth={2}
          dot={{ fill: "#4d7cfe", r: 3 }} activeDot={{ r: 5 }}
        />
        <Line
          dataKey="atRiskAvg"  name="At-Risk Avg"
          type="monotone" stroke="#ff6b6b" strokeWidth={2} strokeDasharray="4 3"
          dot={{ fill: "#ff6b6b", r: 3 }} activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}