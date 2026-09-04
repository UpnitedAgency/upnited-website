"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, User, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { RESERVED_USERNAMES } from "@/lib/constants";

export default function TalentSignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const validateUsername = (u: string) => {
    if(!/^[a-z0-9-]+$/.test(u)) return "Username can only contain lowercase letters, numbers, and hyphens.";
    if(u.length<3) return "Username must be at least 3 characters.";
    if(RESERVED_USERNAMES.includes(u)) return "This username is reserved. Please choose another.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const uErr = validateUsername(username);
    if(uErr) { setError(uErr); return; }
    if(password!==confirm) { setError("Passwords do not match."); return; }
    if(password.length<8) { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    const supabase = createClient();

    // Check username uniqueness
    const { data: existing } = await supabase.from("talent_profiles").select("id").eq("username",username).single();
    if(existing) { setError("This username is already taken."); setLoading(false); return; }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { full_name: fullName, talent_username: username },
        emailRedirectTo: `${window.location.origin}/talent-hub/dashboard`,
      },
    });

    if(signUpError) { setError(signUpError.message); setLoading(false); return; }

    // Create talent profile
    if(data.user) {
      await supabase.from("talent_profiles").insert({
        user_id: data.user.id,
        username,
        full_name: fullName,
        is_public: false,
      });
      // Create empty social links row
      const { data: profile } = await supabase.from("talent_profiles").select("id").eq("user_id",data.user.id).single();
      if(profile) await supabase.from("social_links").insert({ talent_id: profile.id });
    }

    setLoading(false);
    setDone(true);
  };

  if(done) return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-bg text-white shadow-lg"><CheckCircle2 size={32}/></div>
        <h1 className="mt-6 font-display text-2xl font-bold">Check Your Email</h1>
        <p className="mt-2 text-sm text-muted">We&apos;ve sent a verification link to <strong className="text-foreground">{email}</strong>. Click it to activate your account, then come back to log in.</p>
        <Link href="/talent-hub/login" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-105">
          Go to Login
        </Link>
      </div>
    </section>
  );

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg font-display text-2xl font-bold text-white shadow-lg shadow-brand-primary/30">U</span>
          <h1 className="mt-4 font-display text-2xl font-bold">Join Talent Hub</h1>
          <p className="mt-1 text-sm text-muted">Create your free professional profile</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8 space-y-4">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><User size={14}/> Full Name</label>
            <input required value={fullName} onChange={e=>setFullName(e.target.value)} type="text" placeholder="Your full name"
              className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><User size={14}/> Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">@</span>
              <input required value={username} onChange={e=>setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,""))}
                type="text" placeholder="your-username"
                className="w-full rounded-xl border border-border-color bg-background py-2.5 pl-8 pr-4 text-sm outline-none focus:border-brand-primary"/>
            </div>
            <p className="mt-1 text-xs text-muted">Lowercase letters, numbers, hyphens only. This becomes your profile URL.</p>
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Mail size={14}/> Email Address</label>
            <input required value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com"
              className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Lock size={14}/> Password</label>
            <div className="relative">
              <input required value={password} onChange={e=>setPassword(e.target.value)} type={showPw?"text":"password"} placeholder="At least 8 characters"
                className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 pr-10 text-sm outline-none focus:border-brand-primary"/>
              <button type="button" onClick={()=>setShowPw(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                {showPw?<EyeOff size={16}/>:<Eye size={16}/>}
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Lock size={14}/> Confirm Password</label>
            <input required value={confirm} onChange={e=>setConfirm(e.target.value)} type="password" placeholder="Re-enter password"
              className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
          </div>
          {error&&<p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70">
            {loading?"Creating account...":"Create Free Account"}<UserPlus size={16}/>
          </button>
          <p className="text-center text-sm text-muted">Already have an account? <Link href="/talent-hub/login" className="font-semibold text-brand-primary">Sign in</Link></p>
        </form>
      </div>
    </section>
  );
}
