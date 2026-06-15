import type { Metadata } from "next";
import Link from "next/link";
import { LogIn, CheckSquare, Camera, BarChart3, FileText, Shield } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Workspace",
  description: "UpNited Workspace — secure employee portal for attendance, tasks, and performance tracking.",
};

const features = [
  { icon: Camera, title: "Morning Selfie Verification", description: "Quick daily check-in with selfie verification for remote attendance." },
  { icon: CheckSquare, title: "Task Management", description: "View assigned tasks, update progress, and submit completed work." },
  { icon: FileText, title: "Daily Work Reports", description: "Submit structured daily reports linked to Google Forms." },
  { icon: BarChart3, title: "Performance Tracking", description: "Track your productivity and performance metrics over time." },
  { icon: Shield, title: "Role-Based Access", description: "Managers get team oversight; employees see their own dashboard." },
  { icon: LogIn, title: "Secure Login", description: "Authorized employees only, protected by secure authentication." },
];

export default function WorkspacePage() {
  return (
    <>
      <PageHeader
        eyebrow="UpNited Workspace"
        title={
          <>
            The Home Base for Our <span className="gradient-text">Remote Team</span>
          </>
        }
        description="A secure portal for UpNited employees to manage attendance, tasks, and daily reports — accessible only to authorized team members."
      />

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="card-hover rounded-2xl border border-border-color bg-surface p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <feature.icon size={20} />
                </div>
                <h3 className="font-display text-base font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-border-color bg-surface p-10 text-center">
            <Shield size={36} className="text-brand-primary" />
            <h2 className="mt-4 font-display text-xl font-bold">Authorized Access Only</h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              This portal is exclusively for UpNited employees and contractors. If you&apos;ve received login
              credentials, sign in below.
            </p>
            <Link
              href="/workspace/login"
              className="mt-6 flex items-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-105"
            >
              <LogIn size={18} />
              Employee Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
