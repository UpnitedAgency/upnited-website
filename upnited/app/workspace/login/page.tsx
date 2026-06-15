"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, ShieldCheck } from "lucide-react";

export default function WorkspaceLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TODO: Connect to Supabase Auth - supabase.auth.signInWithPassword({ email, password })
    setTimeout(() => {
      setLoading(false);
      router.push("/workspace/dashboard");
    }, 800);
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg font-display text-2xl font-bold text-white shadow-lg shadow-brand-primary/30">
            U
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold">UpNited Workspace</h1>
          <p className="mt-1 text-sm text-muted">Sign in with your employee credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
                <Mail size={14} />
                Work Email
              </label>
              <input
                required
                type="email"
                placeholder="you@upnited.com"
                className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
                <Lock size={14} />
                Password
              </label>
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
              />
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
            <LogIn size={16} />
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
            <ShieldCheck size={14} className="text-brand-secondary" />
            Authorized personnel only
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Not an employee?{" "}
          <Link href="/" className="font-semibold text-brand-primary">
            Return home
          </Link>
        </p>
      </div>
    </section>
  );
}
