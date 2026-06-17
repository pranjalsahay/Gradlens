import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}

export function Card({ children, className, title, action }: CardProps) {
  return (
    <div
      className={cn(
        "bg-gl-surface/80 border border-gl-border rounded-xl p-5 backdrop-blur-sm",
        className
      )}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="font-mono text-[13px] font-bold text-white">{title}</h2>
          )}
          {action && (
            <span className="text-[12px] text-gl-accent cursor-pointer hover:opacity-100 opacity-80 transition-opacity">
              {action}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}