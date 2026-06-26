"use client";

import { useState } from "react";
import { Send, Copy, Check, Link2, ShieldAlert } from "lucide-react";

export default function InvitesPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInviteLink("");

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setInviteLink(data.inviteLink);
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-2xl font-bold">Invite an Employee</h1>
        <p className="mt-1 text-sm text-muted">
          Generate a secure, one-time signup link to send to a new team member.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-border-color bg-surface p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Employee Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="employee@example.com"
                className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="mt-4 flex items-center gap-2 text-sm text-red-500">
              <ShieldAlert size={15} />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70"
          >
            {loading ? "Generating..." : "Generate Invite Link"}
            <Send size={16} />
          </button>
        </form>

        {inviteLink && (
          <div className="mt-6 rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
              <Link2 size={16} />
              Invite link ready — valid for 7 days
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-border-color bg-background px-4 py-3">
              <span className="flex-1 truncate text-sm">{inviteLink}</span>
              <button
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition-transform hover:scale-105"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-3 text-xs text-muted">
              Send this link to the employee directly (WhatsApp, email, etc). They&apos;ll sign up
              and verify their email automatically — no further action needed from you.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
