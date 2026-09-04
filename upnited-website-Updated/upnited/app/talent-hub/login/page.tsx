"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function TalentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if(signInError) {
      if(signInError.message.includes("Email not confirmed")) setError("Please verify your email first — check your inbox.");
      else setError("Invalid email or password.");
      return;
    }
    router.push("/talent-hub/dashboard");
    router.refresh();
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg font-display text-2xl font-bold text-white shadow-lg shadow-brand-primary/30">U</span>
          <h1 className="mt-4 font-display text-2xl font-bold">Talent Hub Login</h1>
          <p className="mt-1 text-sm text-muted">Sign in to your professional dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8 space-y-4">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Mail size={14}/> Email Address</label>
            <input required value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com"
              className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Lock size={14}/> Password</label>
            <div className="relative">
              <input required value={password} onChange={e=>setPassword(e.target.value)} type={showPw?"text":"password"} placeholder="Your password"
                className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 pr-10 text-sm outline-none focus:border-brand-primary"/>
              <button type="button" onClick={()=>setShowPw(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                {showPw?<EyeOff size={16}/>:<Eye size={16}/>}
              </button>
            </div>
          </div>
          {error&&<p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70">
            {loading?"Signing in...":"Sign In"}<LogIn size={16}/>
          </button>
          <p className="text-center text-sm text-muted">Don&apos;t have an account? <Link href="/talent-hub/signup" className="font-semibold text-brand-primary">Join free</Link></p>
        </form>
      </div>
    </section>
  );
}
