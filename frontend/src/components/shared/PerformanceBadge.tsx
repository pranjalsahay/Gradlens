import { cn } from "@/lib/utils";
import type { PerformanceStatus } from "@/types";

const STYLES: Record<PerformanceStatus, string> = {
  high:   "bg-gl-teal/15 text-gl-teal",
  medium: "bg-gl-warn/12 text-gl-warn",
  risk:   "bg-gl-danger/15 text-gl-danger",
};

const LABELS: Record<PerformanceStatus, string> = {
  high:   "High Performer",
  medium: "Medium Performer",
  risk:   "At Risk",
};

interface Props {
  status: PerformanceStatus;
  label?: string;
  size?: "sm" | "md";
}

export function PerformanceBadge({ status, label, size = "md" }: Props) {
  return (
    <span
      className={cn(
        "inline-block rounded-full font-medium",
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-[11px] px-2.5 py-1",
        STYLES[status]
      )}
    >
      {label ?? LABELS[status]}
    </span>
  );
}