"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Briefcase, Image, Settings, LogOut, Eye, CheckCircle2, AlertCircle, ArrowRight, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { TalentProfile } from "@/lib/talent-types";

function calcCompletion(profile: TalentProfile, services: number, portfolio: number, socials: Record<string,string|undefined>) {
  let pct = 0;
  if(profile.profile_image) pct+=10;
  if(profile.full_name) pct+=10;
  if(profile.location) pct+=10;
  if(profile.age) pct+=5;
  if(profile.bio) pct+=15;
  if(profile.primary_service) pct+=15;
  if(services>0) pct+=10;
  if(portfolio>0) pct+=15;
  if(Object.values(socials).some(v=>v)) pct+=10;
  return pct;
}

export default function TalentDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<TalentProfile|null>(null);
  const [serviceCount, setServiceCount] = useState(0);
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [socials, setSocials] = useState<Record<string,string|undefined>>({});
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function load() {
      const supabase = createClient();
      const { data:{user} } = await supabase.auth.getUser();
      if(!user) { router.push("/talent-hub/login"); return; }
      const { data: tp } = await supabase.from("talent_profiles").select("*").eq("user_id",user.id).single();
      if(!tp) { router.push("/talent-hub/dashboard/profile"); return; }
      setProfile(tp);
      const { count:sc } = await supabase.from("talent_services").select("*",{count:"exact",head:true}).eq("talent_id",tp.id);
      setServiceCount(sc||0);
      const { count:pc } = await supabase.from("portfolio_projects").select("*",{count:"exact",head:true}).eq("talent_id",tp.id);
      setPortfolioCount(pc||0);
      const { data:sl } = await supabase.from("social_links").select("*").eq("talent_id",tp.id).single();
      setSocials(sl||{});
      const { count:rc } = await supabase.from("hire_requests").select("*",{count:"exact",head:true}).eq("talent_id",tp.id).eq("status","new");
      setRequestCount(rc||0);
      setLoading(false);
    }
    load();
  },[router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/talent-hub/login");
  };

  if(loading) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"/>
    </div>
  );

  if(!profile) return null;

  const completion = calcCompletion(profile, serviceCount, portfolioCount, socials);
  const suggestions = [];
  if(!profile.profile_image) suggestions.push("Add a profile photo (+10%)");
  if(!profile.bio) suggestions.push("Write a short bio (+15%)");
  if(!profile.primary_service) suggestions.push("Set your primary service (+15%)");
  if(portfolioCount===0) suggestions.push("Add a portfolio project (+15%)");
  if(serviceCount===0) suggestions.push("Add your services (+10%)");
  if(!Object.values(socials).some(v=>v)) suggestions.push("Add social media links (+10%)");

  const navItems = [
    { icon: User, label: "Edit Profile", href: "/talent-hub/dashboard/profile", desc: "Personal & professional info" },
    { icon: Briefcase, label: "My Services", href: "/talent-hub/dashboard/services", desc: "Add and manage your services" },
    { icon: Image, label: "Portfolio", href: "/talent-hub/dashboard/portfolio", desc: "Showcase your best work" },
    { icon: Settings, label: "Settings", href: "/talent-hub/dashboard/settings", desc: "Visibility and account settings" },
  ];

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Welcome back, {profile.full_name.split(" ")[0]} 👋</h1>
            <p className="mt-1 text-sm text-muted">@{profile.username} · {profile.is_public?"🟢 Published":"🔴 Draft"}</p>
          </div>
          <div className="flex items-center gap-3">
            {profile.is_public&&(
              <Link href={`/talent-hub/talent/${profile.username}`} target="_blank"
                className="flex items-center gap-1.5 rounded-full border border-border-color px-4 py-2 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary">
                <ExternalLink size={15}/> View Profile
              </Link>
            )}
            <button onClick={handleSignOut} className="flex items-center gap-1.5 rounded-full border border-border-color px-4 py-2 text-sm font-semibold transition-colors hover:border-red-400 hover:text-red-400">
              <LogOut size={15}/> Sign Out
            </button>
          </div>
        </div>

        {/* Completion */}
        <div className="rounded-3xl border border-border-color bg-surface p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-base font-bold">Profile Completion</h2>
            <span className="font-display text-2xl font-extrabold text-brand-primary">{completion}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-background">
            <div className="h-full gradient-bg transition-all duration-700 rounded-full" style={{width:`${completion}%`}}/>
          </div>
          {suggestions.length>0&&(
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {suggestions.slice(0,4).map(s=>(
                <div key={s} className="flex items-center gap-2 text-sm text-muted">
                  <AlertCircle size={14} className="shrink-0 text-brand-accent"/>{s}
                </div>
              ))}
            </div>
          )}
          {completion===100&&(
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-500"><CheckCircle2 size={16}/> Your profile is complete!</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-4">
          {[
            { label: "Services", value: serviceCount },
            { label: "Projects", value: portfolioCount },
            { label: "New Requests", value: requestCount, highlight: requestCount>0 },
            { label: "Profile Status", value: profile.is_public?"Live":"Draft", isText:true },
          ].map(stat=>(
            <div key={stat.label} className="rounded-2xl border border-border-color bg-surface p-4 text-center">
              <p className={`font-display text-2xl font-extrabold ${stat.highlight?"text-brand-accent":""}`}>{stat.value}</p>
              <p className="mt-1 text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Nav Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {navItems.map(item=>(
            <Link key={item.href} href={item.href}
              className="card-hover group flex items-center gap-4 rounded-2xl border border-border-color bg-surface p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                <item.icon size={22}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-bold">{item.label}</p>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
              <ArrowRight size={16} className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-primary"/>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
