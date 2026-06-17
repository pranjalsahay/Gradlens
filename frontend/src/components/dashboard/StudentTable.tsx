"use client";

import { useState } from "react";
import { PerformanceBadge } from "@/components/shared/PerformanceBadge";
import { cn } from "@/lib/utils";
import type { Student } from "@/types";

interface Props {
  students: Student[];
}

// FIX #1 & #4: Moved Th outside StudentTable so React doesn't
// remount it on every render, restoring proper reconciliation.
interface ThProps {
  label: string;
  colKey: keyof Student;
  sortKey: keyof Student;
  sortDir: "asc" | "desc";
  onSort: (key: keyof Student) => void;
}

function Th({ label, colKey, sortKey, sortDir, onSort }: ThProps) {
  return (
    <th
      className="text-left text-[10px] uppercase tracking-widest text-gl-muted pb-3 border-b border-gl-border cursor-pointer hover:text-white transition-colors"
      onClick={() => onSort(colKey)}
    >
      {label}
      {sortKey === colKey && (
        <span className="ml-1 text-gl-accent">
          {sortDir === "asc" ? "↑" : "↓"}
        </span>
      )}
    </th>
  );
}

const SCORE_COLOR = (score: number) =>
  score >= 75 ? "#38d9a9" : score >= 60 ? "#ffd43b" : "#ff6b6b";

export function StudentTable({ students }: Props) {
  const [sortKey, setSortKey] = useState<keyof Student>("score");

  // FIX #2: Tracks the "natural" default direction per column.
  // Numeric fields default to "desc" (highest first),
  // string fields default to "asc" (A→Z). Switching columns
  // no longer blindly resets to "desc" for everything.
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = [...students].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];

    // FIX #3: Guard against non-primitive / mismatched types
    // so the comparator never silently produces wrong results.
    if (typeof av !== typeof bv) return 0;
    if (typeof av !== "number" && typeof av !== "string") return 0;

    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  function toggleSort(key: keyof Student) {
    if (sortKey === key) {
      // Same column — flip direction
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      // New column — pick a sensible default direction:
      // numeric fields → desc (highest first), strings → asc (A→Z)
      setSortKey(key);
      const numericKeys: Array<keyof Student> = ["score", "attendance"];
      setSortDir(numericKeys.includes(key) ? "desc" : "asc");
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            <Th
              label="Student"
              colKey="name"
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={toggleSort}
            />
            <Th
              label="Department"
              colKey="department"
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={toggleSort}
            />
            <Th
              label="Score"
              colKey="score"
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={toggleSort}
            />
            <Th
              label="Attendance"
              colKey="attendance"
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={toggleSort}
            />
            <th className="text-left text-[10px] uppercase tracking-widest text-gl-muted pb-3 border-b border-gl-border">
              Prediction
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((s) => {
            const scoreColor = SCORE_COLOR(s.score);

            return (
              <tr
                key={s.id}
                className="border-b border-gl-border/50 hover:bg-gl-accent/5 transition-colors group"
              >
                <td className="py-3 pr-4">
                  <p className="font-medium text-white group-hover:text-gl-accent transition-colors">
                    {s.name}
                  </p>
                  <p className="text-[11px] text-gl-muted">{s.studentId}</p>
                </td>

                <td className="py-3 pr-4 text-gl-muted">{s.department}</td>

                <td className="py-3 pr-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono font-bold text-[13px] min-w-[28px]"
                      style={{ color: scoreColor }}
                    >
                      {s.score}
                    </span>
                    <div className="flex-1 h-1 bg-white/5 rounded-full min-w-[60px]">
                      <div
                        className="h-1 rounded-full"
                        style={{
                          width: `${s.score}%`,
                          backgroundColor: scoreColor,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td className="py-3 pr-4">
                  <span
                    className={cn(
                      "font-mono text-[13px]",
                      s.attendance >= 75 ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {s.attendance}%
                  </span>
                </td>

                <td className="py-3">
                  <PerformanceBadge status={s.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}