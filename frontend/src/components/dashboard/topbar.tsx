"use client";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
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

        <button className="flex items-center gap-1.5 bg-gl-accent/15 border border-gl-accent/40 text-gl-accent px-4 py-1.5 rounded-lg text-[12px] font-sans transition-all hover:bg-gl-accent/25 hover:shadow-[0_0_12px_rgba(77,124,254,0.2)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload CSV
        </button>
      </div>
    </header>
  );
}