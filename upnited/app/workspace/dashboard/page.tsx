"use client";

import { useState } from "react";
import { Camera, CheckCircle2, Clock, ListChecks, FileText, TrendingUp, LogOut } from "lucide-react";
import Link from "next/link";

const tasks = [
  { id: 1, title: "Create 5 reels for Good Heart Cafe", status: "In Progress", due: "Today" },
  { id: 2, title: "Design carousel post for Kard Nation launch", status: "Pending", due: "Tomorrow" },
  { id: 3, title: "Edit drone footage - Coastal Stays", status: "Completed", due: "Yesterday" },
  { id: 4, title: "Submit weekly analytics report", status: "Pending", due: "Friday" },
];

const statusColors: Record<string, string> = {
  "In Progress": "bg-brand-accent/10 text-brand-accent",
  Pending: "bg-muted/10 text-muted",
  Completed: "bg-brand-secondary/10 text-brand-secondary",
};

export default function WorkspaceDashboardPage() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [selfieDone, setSelfieDone] = useState(false);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-2xl font-bold">Welcome back, Pasindu 👋</h1>
            <p className="mt-1 text-sm text-muted">Here&apos;s your overview for today.</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-border-color px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary"
          >
            <LogOut size={16} />
            Sign Out
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Attendance Card */}
          <div className="card-hover rounded-3xl border border-border-color bg-surface p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
              <Clock size={18} />
              Daily Attendance
            </div>
            <p className="mt-2 text-sm text-muted">Check in to start tracking your work day.</p>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => setSelfieDone(true)}
                disabled={selfieDone}
                className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  selfieDone
                    ? "border-brand-secondary bg-brand-secondary/10 text-brand-secondary"
                    : "border-border-color hover:border-brand-primary"
                }`}
              >
                <Camera size={16} />
                {selfieDone ? "Selfie Verified" : "Take Morning Selfie"}
              </button>

              <button
                onClick={() => setCheckedIn((c) => !c)}
                disabled={!selfieDone}
                className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-50 ${
                  checkedIn ? "bg-red-500" : "gradient-bg"
                }`}
              >
                {checkedIn ? "Check Out" : "Check In"}
              </button>

              {checkedIn && (
                <p className="flex items-center justify-center gap-1.5 text-xs text-brand-secondary">
                  <CheckCircle2 size={14} />
                  Checked in at 9:02 AM
                </p>
              )}
            </div>
          </div>

          {/* Performance Card */}
          <div className="card-hover rounded-3xl border border-border-color bg-surface p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
              <TrendingUp size={18} />
              This Week&apos;s Performance
            </div>
            <div className="mt-5 space-y-4">
              {[
                { label: "Tasks Completed", value: "12/15", pct: 80 },
                { label: "Attendance", value: "5/5 days", pct: 100 },
                { label: "Reports Submitted", value: "4/5", pct: 80 },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-sm">
                    <span>{stat.label}</span>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-background">
                    <div className="h-full gradient-bg" style={{ width: `${stat.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Report Card */}
          <div className="card-hover rounded-3xl border border-border-color bg-surface p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
              <FileText size={18} />
              Daily Work Report
            </div>
            <p className="mt-2 text-sm text-muted">Submit your end-of-day summary.</p>
            <textarea
              rows={4}
              placeholder="What did you work on today?"
              className="mt-4 w-full resize-none rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
            />
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
              Submit Report
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div className="mt-6 rounded-3xl border border-border-color bg-surface p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
            <ListChecks size={18} />
            My Tasks
          </div>
          <div className="mt-4 space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-2 rounded-2xl border border-border-color bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted">Due: {task.due}</p>
                </div>
                <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColors[task.status]}`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          This is a demo dashboard. Connect Supabase Auth and database tables for live data, Google Form integration, and manager dashboards.
        </p>
      </div>
    </section>
  );
}
