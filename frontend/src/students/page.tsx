"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card } from "@/components/shared/Card";
import { PerformanceBadge } from "@/components/shared/PerformanceBadge";
import { STUDENTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { PerformanceStatus } from "@/types";

const FILTER_OPTIONS: { label: string; value: PerformanceStatus | "all" }[] = [
  { label: "All",           value: "all"   },
  { label: "High Performer", value: "high"   },
  { label: "Medium",        value: "medium" },
  { label: "At Risk",       value: "risk"   },
];

export default function StudentsPage() {
  const [filter, setFilter] = useState<PerformanceStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = STUDENTS.filter((s) => {
    const matchFilter = filter === "all" || s.status === filter;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Students" subtitle={`${filtered.length} students`} />

      <main className="flex-1 overflow-y-auto p-7 space-y-5 animate-fade-in">

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gl-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search students…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gl-surface border border-gl-border text-white placeholder:text-gl-muted rounded-lg pl-9 pr-4 py-2 text-[13px] outline-none focus:border-gl-accent/60 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[12px] transition-all border",
                  filter === opt.value
                    ? "bg-gl-accent/20 border-gl-accent/50 text-gl-accent"
                    : "bg-gl-surface border-gl-border text-gl-muted hover:text-white"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3.5">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="bg-gl-surface/80 border border-gl-border rounded-xl p-4 backdrop-blur-sm hover:border-gl-accent/40 transition-all hover:-translate-y-0.5 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gl-accent/20 flex items-center justify-center text-gl-accent text-[12px] font-semibold">
                    {s.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white group-hover:text-gl-accent transition-colors">
                      {s.name}
                    </p>
                    <p className="text-[11px] text-gl-muted">{s.studentId}</p>
                  </div>
                </div>
                <PerformanceBadge status={s.status} size="sm" />
              </div>

              <p className="text-[11px] text-gl-muted mb-3">{s.department}</p>

              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Score",   value: s.score,       suffix: "" },
                  { label: "Attend.", value: s.attendance,  suffix: "%" },
                  { label: "Internal", value: s.internalMarks, suffix: "" },
                ].map((m) => (
                  <div key={m.label} className="bg-gl-bg/60 rounded-lg py-2">
                    <p className="font-mono text-[14px] font-bold text-white">
                      {m.value}{m.suffix}
                    </p>
                    <p className="text-[10px] text-gl-muted mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gl-muted">
            <p className="text-[15px]">No students found</p>
            <p className="text-[12px] mt-1">Try adjusting your search or filter</p>
          </div>
        )}

      </main>
    </div>
  );
}
