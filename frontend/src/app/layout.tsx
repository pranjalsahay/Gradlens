import type { Metadata } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { ParticleBackground } from "@/components/shared/ParticleBackground";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AnalyticsProvider } from "@/services/AnalyticsContext"; // ← ADD

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GradeLens · Student Analytics",
  description: "AI-powered student performance analytics dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${spaceMono.variable} font-sans bg-gl-bg text-white antialiased`}>
        <AnalyticsProvider>           {/* ← WRAP everything */}
          <ParticleBackground />
          <div className="relative z-10 flex h-screen overflow-hidden">
            <div className="w-[220px] flex-shrink-0 h-full">
              <Sidebar />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </AnalyticsProvider>
      </body>
    </html>
  );
}