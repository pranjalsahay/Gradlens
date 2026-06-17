import { cn } from "@/lib/utils";
import type { StatCard as StatCardType } from "@/types";

const ACCENT_STYLES: Record<StatCardType["accent"], string> = {
  blue:   "border-gl-accent/30 hover:border-gl-accent/50",
  teal:   "border-gl-teal/30 hover:border-gl-teal/50",
  purple: "border-gl-purple/30 hover:border-gl-purple/50",
  red:    "border-gl-danger/30 hover:border-gl-danger/50",
};

const CHANGE_STYLES = {
  up:   "text-gl-teal",
  down: "text-gl-danger",
};

export function StatCard({ label, value, change, changeType, accent }: StatCardType) {
  return (
    <div
      className={cn(
        "relative bg-gl-surface/80 border rounded-xl px-5 py-4 backdrop-blur-sm",
        "transition-all duration-200 hover:-translate-y-0.5 cursor-default overflow-hidden",
        ACCENT_STYLES[accent]
      )}
    >
      {/* Decorative corner glow */}
      <div
        className={cn(
          "absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-[0.07]",
          accent === "blue"   && "bg-gl-accent",
          accent === "teal"   && "bg-gl-teal",
          accent === "purple" && "bg-gl-purple",
          accent === "red"    && "bg-gl-danger"
        )}
      />

      <p className="text-[11px] uppercase tracking-widest text-gl-muted mb-2">{label}</p>
      <p className="font-mono text-[28px] font-bold text-white leading-none">{value}</p>
      <p className={cn("text-[11px] mt-1.5", CHANGE_STYLES[changeType])}>{change}</p>
    </div>
  );
}