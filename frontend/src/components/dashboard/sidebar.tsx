"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  UserX,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Student {
  id: string;
  score: number;
  attendance: number;
  status: string;
}

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "Students", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch(`${API}/api/analytics/students`);
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  const totalStudents = students.length;
  const avgScore =
    students.length > 0
      ? students.reduce((sum, s) => sum + s.score, 0) / students.length
      : 0;
  const atRiskCount = students.filter(
    (s) => s.status === "at-risk" || s.status === "At Risk"
  ).length;
  const lowAttendanceCount = students.filter(
    (s) => s.attendance < 75
  ).length;

  const stats = [
    {
      label: "Total Students",
      value: loading ? "—" : totalStudents,
      icon: GraduationCap,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Avg Score",
      value: loading ? "—" : avgScore.toFixed(1),
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "At Risk",
      value: loading ? "—" : atRiskCount,
      icon: AlertTriangle,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
    {
      label: "Low Attendance",
      value: loading ? "—" : lowAttendanceCount,
      icon: UserX,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  return (
    <aside className="flex flex-col w-[220px] min-h-screen bg-[#0d0f1a] border-r border-white/[0.06]">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight">
            GradeLens
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="px-3 py-4 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150",
                active
                  ? "bg-blue-500/15 text-blue-400 font-medium"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  active ? "text-blue-400" : "text-white/40"
                )}
              />
              {item.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Stats */}
      <div className="mt-auto px-3 pb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 px-3 mb-3">
          Overview
        </p>
        <div className="flex flex-col gap-1.5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]"
              >
                <div className={cn("p-1.5 rounded-md", stat.bg)}>
                  <Icon className={cn("w-3.5 h-3.5", stat.color)} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] text-white/40 leading-none mb-0.5">
                    {stat.label}
                  </span>
                  <span className={cn("text-sm font-semibold leading-none", stat.color)}>
                    {stat.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}