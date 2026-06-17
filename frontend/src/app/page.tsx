"use client";

import { useMemo, useState, useRef } from "react";
import { useAnalytics } from "@/services/AnalyticsContext";

import { Topbar }       from "@/components/dashboard/topbar";
import { StatCard }     from "@/components/dashboard/StatCard";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { SubjectBarChart, ScoreTrendChart } from "@/components/charts/charts";
import { AttendanceDonut, AtRiskPanel }     from "@/components/charts/AttendanceDonut";
import { Card } from "@/components/shared/Card";

import { TREND_DATA } from "@/lib/data";

const API =
  process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const {
    students,
    loading,
    totalStudents,
    avgScore,
    avgAttendance,
    atRiskCount,
  } = useAnalytics();

  /* ── CSV Upload state ── */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ text: string; ok: boolean } | null>(null);

  async function handleUpload(file: File) {
    if (!file) return;
    setUploading(true);
    setUploadMsg(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${API}/api/upload/csv`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      setUploadMsg({ text: data.message ?? "Upload successful!", ok: true });
      // Reload the page after a short pause so new data shows up
      setTimeout(() => window.location.reload(), 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setUploadMsg({ text: msg, ok: false });
    } finally {
      setUploading(false);
    }
  }

  /* ── Derived charts data from live students ── */

  // Subject bar chart — aggregate avg score per department from backend students
  const subjectPerformance = useMemo(() => {
    if (loading || students.length === 0) return [];
    const deptMap: Record<string, { total: number; count: number; max: number }> = {};
    for (const s of students) {
      const key = s.department;
      if (!deptMap[key]) deptMap[key] = { total: 0, count: 0, max: 0 };
      deptMap[key].total += s.score;
      deptMap[key].count += 1;
      if (s.score > deptMap[key].max) deptMap[key].max = s.score;
    }
    return Object.entries(deptMap).map(([dept, v]) => ({
      subject: dept.length > 7 ? dept.slice(0, 7) : dept, // abbreviate long names
      avgScore: Math.round(v.total / v.count),
      maxScore: v.max,
    }));
  }, [students, loading]);

  // Attendance donut — build buckets from live student attendance values
  const attendanceBuckets = useMemo(() => {
    if (loading || students.length === 0) return [];
    const buckets = [
      { label: "≥ 85% Present",  color: "#38d9a9", min: 85, max: 101, count: 0 },
      { label: "75–85% Regular", color: "#4d7cfe", min: 75, max: 85,  count: 0 },
      { label: "60–75% Low",     color: "#ffd43b", min: 60, max: 75,  count: 0 },
      { label: "< 60% Absent",   color: "#ff6b6b", min: 0,  max: 60,  count: 0 },
    ];
    for (const s of students) {
      const b = buckets.find((b) => s.attendance >= b.min && s.attendance < b.max);
      if (b) b.count++;
    }
    return buckets.map((b) => ({
      label:      b.label,
      color:      b.color,
      percentage: Math.round((b.count / students.length) * 100),
    }));
  }, [students, loading]);

  // At-risk students panel — derived from live data
  const atRiskStudents = useMemo(() => {
    if (loading) return [];
    return students
      .filter((s) => s.status === "risk")
      .map((s) => ({
        name:  s.name,
        score: s.score,
        info:  `${s.department} · Att: ${s.attendance}%`,
      }));
  }, [students, loading]);

  /* ── Stat cards ── */
  const stats = useMemo(
    () => [
      {
        label:      "TOTAL STUDENTS",
        value:      totalStudents,
        change:     loading ? "Loading…" : `↑ this semester`,
        changeType: "up"   as const,
        accent:     "blue" as const,
      },
      {
        label:      "AVG SCORE",
        value:      loading ? "—" : avgScore.toFixed(1),
        change:     loading ? "Loading…" : avgScore >= 60 ? "↑ from last sem" : "↓ from last sem",
        changeType: (avgScore >= 60 ? "up" : "down") as "up" | "down",
        accent:     "teal" as const,
      },
      {
        label:      "AVG ATTENDANCE",
        value:      loading ? "—" : `${Math.round(avgAttendance)}%`,
        change:     loading ? "Loading…" : avgAttendance >= 75 ? "↑ from last sem" : "↓ from last sem",
        changeType: (avgAttendance >= 75 ? "up" : "down") as "up" | "down",
        accent:     "purple" as const,
      },
      {
        label:      "AT-RISK STUDENTS",
        value:      loading ? "—" : atRiskCount,
        change:     loading ? "Loading…" : `${atRiskCount} flagged`,
        changeType: (atRiskCount === 0 ? "up" : "down") as "up" | "down",
        accent:     "red" as const,
      },
    ],
    [loading, totalStudents, avgScore, avgAttendance, atRiskCount]
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Pass upload handler down to Topbar */}
      <TopbarWithUpload
        title="Analytics Dashboard"
        subtitle="Live · Semester 2 · 2024–25"
        uploading={uploading}
        uploadMsg={uploadMsg}
        onUploadClick={() => fileInputRef.current?.click()}
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
          // Reset so same file can be re-uploaded
          e.target.value = "";
        }}
      />

      <main className="flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 md:p-7 space-y-3.5 md:space-y-5">

        {/* Upload feedback toast */}
        {uploadMsg && (
          <div
            className={`px-4 py-2.5 rounded-lg text-[13px] border ${
              uploadMsg.ok
                ? "bg-gl-teal/10 border-gl-teal/40 text-gl-teal"
                : "bg-gl-danger/10 border-gl-danger/40 text-gl-danger"
            }`}
          >
            {uploadMsg.ok ? "✓ " : "✗ "}{uploadMsg.text}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3.5">
          {stats.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          <Card title="Subject Performance">
            {loading ? (
              <div className="h-[200px] flex items-center justify-center text-gl-muted text-[13px]">
                Loading…
              </div>
            ) : (
              <SubjectBarChart data={subjectPerformance} />
            )}
          </Card>
          <Card title="Score Trend">
            <ScoreTrendChart data={TREND_DATA} />
          </Card>
        </div>

        <Card title="Student Performance Overview" action={`View all ${totalStudents} →`}>
          {loading ? (
            <div className="text-center py-10 text-gl-muted text-[13px]">Loading students…</div>
          ) : (
            <div className="overflow-x-auto">
              <StudentTable students={students} />
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-3.5 pb-2">
          <Card title="Attendance Distribution">
            {loading ? (
              <div className="h-[200px] flex items-center justify-center text-gl-muted text-[13px]">
                Loading…
              </div>
            ) : (
              <AttendanceDonut
                data={attendanceBuckets}
                overallAttendance={avgAttendance}
              />
            )}
          </Card>
          <Card title="ML Predictions · At-Risk Alerts">
            {loading ? (
              <div className="text-center py-10 text-gl-muted text-[13px]">Loading…</div>
            ) : (
              <AtRiskPanel students={atRiskStudents} />
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

/* ── Inline Topbar wrapper that adds upload UX ── */
interface TopbarWithUploadProps {
  title: string;
  subtitle?: string;
  uploading: boolean;
  uploadMsg: { text: string; ok: boolean } | null;
  onUploadClick: () => void;
}

function TopbarWithUpload({ title, subtitle, uploading, onUploadClick }: TopbarWithUploadProps) {
  return (
    <header className="bg-gl-bg/90 border-b border-gl-border px-7 py-3.5 flex items-center justify-between backdrop-blur-md sticky top-0 z-20">
      <div>
        <h1 className="font-mono font-bold text-[15px] text-white">{title}</h1>
        {subtitle && (
          <p className="text-[12px] text-gl-muted mt-0.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gl-teal inline-block animate-pulse2" />
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3.5">
        <select className="bg-gl-surface border border-gl-border text-gl-muted px-3 py-1.5 rounded-lg text-[12px] font-sans outline-none focus:border-gl-accent/60 transition-colors cursor-pointer">
          <option>All Departments</option>
          <option>Computer Science</option>
          <option>Mathematics</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>English</option>
        </select>

        <button
          onClick={onUploadClick}
          disabled={uploading}
          className="flex items-center gap-1.5 bg-gl-accent/15 border border-gl-accent/40 text-gl-accent px-4 py-1.5 rounded-lg text-[12px] font-sans transition-all hover:bg-gl-accent/25 hover:shadow-[0_0_12px_rgba(77,124,254,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Uploading…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload CSV
            </>
          )}
        </button>
      </div>
    </header>
  );
}
