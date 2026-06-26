"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [checking, setChecking] = useState(true);
  const [validInvite, setValidInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("employee");
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function validateToken() {
      if (!token) {
        setError("No invite token found. Please use the link your admin sent you.");
        setChecking(false);
        return;
      }

      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("invites")
        .select("email, role, used, expires_at")
        .eq("token", token)
        .single();

      if (fetchError || !data) {
        setError("This invite link is invalid.");
      } else if (data.used) {
        setError("This invite link has already been used.");
      } else if (new Date(data.expires_at) < new Date()) {
        setError("This invite link has expired. Please ask your admin for a new one.");
      } else {
        setValidInvite(true);
        setInviteEmail(data.email);
        setInviteRole(data.role);
      }
      setChecking(false);
    }

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email: inviteEmail,
      password,
      options: {
        data: {
          username,
          full_name: fullName,
          role: inviteRole,
          invite_token: token,
        },
        emailRedirectTo: `${window.location.origin}/workspace/login`,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSubmitted(true);
    }
  };

  if (checking) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-border-color bg-surface p-12 text-center">
        <Loader2 size={32} className="animate-spin text-brand-primary" />
        <p className="text-sm text-muted">Verifying your invite link...</p>
      </div>
    );
  }

  if (!validInvite) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-red-500/30 bg-red-500/5 p-12 text-center">
        <XCircle size={40} className="text-red-500" />
        <h2 className="font-display text-lg font-bold">Invalid Invite</h2>
        <p className="max-w-sm text-sm text-muted">{error}</p>
        <Link href="/" className="mt-2 text-sm font-semibold text-brand-primary">
          Return home
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-border-color bg-surface p-12 text-center">
        <CheckCircle2 size={40} className="text-brand-secondary" />
        <h2 className="font-display text-lg font-bold">Check Your Email</h2>
        <p className="max-w-sm text-sm text-muted">
          We&apos;ve sent a verification link to <strong className="text-foreground">{inviteEmail}</strong>.
          Click it to activate your account, then sign in.
        </p>
        <Link
          href="/workspace/login"
          className="mt-3 flex items-center gap-2 rounded-full gradient-bg px-6 py-2.5 text-sm font-semibold text-white"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8">
      <div className="mb-5 rounded-xl bg-brand-primary/5 px-4 py-3 text-sm">
        Signing up as <strong>{inviteEmail}</strong> ({inviteRole})
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
            <User size={14} />
            Full Name
          </label>
          <input
            required
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
            <Mail size={14} />
            Username
          </label>
          <input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
            <Lock size={14} />
            Confirm Password
          </label>
          <input
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70"
      >
        {loading ? "Creating account..." : "Create Account"}
        <UserPlus size={16} />
      </button>
    </form>
  );
}

export default function WorkspaceSignupPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg font-display text-2xl font-bold text-white shadow-lg shadow-brand-primary/30">
            U
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold">Join UpNited Workspace</h1>
          <p className="mt-1 text-sm text-muted">Complete your account setup</p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center rounded-3xl border border-border-color bg-surface p-12">
              <Loader2 size={28} className="animate-spin text-brand-primary" />
            </div>
          }
        >
          <SignupForm />
        </Suspense>
      </div>
    </section>
  );
}
