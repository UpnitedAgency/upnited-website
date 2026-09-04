"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Copy, Check, Link2 } from "lucide-react";

export default function AdminInvitesPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setInviteLink("");
    try {
      const res = await fetch("/api/invite",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email,role}) });
      const data = await res.json();
      if(!res.ok) setError(data.error||"Something went wrong");
      else setInviteLink(data.inviteLink);
    } catch { setError("Network error — please try again"); }
    setLoading(false);
  };

  const handleCopy = () => { navigator.clipboard.writeText(inviteLink); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/workspace/dashboard" className="flex h-9 w-9 items-center justify-center rounded-full border border-border-color hover:border-brand-primary hover:text-brand-primary transition-colors"><ArrowLeft size={18}/></Link>
          <h1 className="font-display text-2xl font-bold">Invite an Employee</h1>
        </div>
        <form onSubmit={handleSubmit} className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Employee Email</label>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="employee@example.com"
              className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Role</label>
            <select value={role} onChange={e=>setRole(e.target.value)}
              className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary">
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error&&<p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70">
            {loading?"Generating...":"Generate Invite Link"}<Send size={16}/>
          </button>
        </form>
        {inviteLink&&(
          <div className="mt-6 rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary mb-3"><Link2 size={16}/>Invite link ready — valid for 7 days</div>
            <div className="flex items-center gap-2 rounded-xl border border-border-color bg-background px-4 py-3">
              <span className="flex-1 truncate text-sm">{inviteLink}</span>
              <button onClick={handleCopy} className="flex shrink-0 items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:scale-105 transition-transform">
                {copied?<Check size={14}/>:<Copy size={14}/>}{copied?"Copied":"Copy"}
              </button>
            </div>
            <p className="mt-3 text-xs text-muted">Send this link to the employee via WhatsApp or email.</p>
          </div>
        )}
      </div>
    </section>
  );
}
