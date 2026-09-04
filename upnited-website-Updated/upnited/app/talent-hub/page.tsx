"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, UserPlus, X, MapPin, Star, BadgeCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { TalentProfile, AVAILABILITY_LABELS, AVAILABILITY_COLORS } from "@/lib/talent-types";
import { SERVICE_CATEGORIES } from "@/lib/talent-types";

function TalentCard({ talent }: { talent: TalentProfile }) {
  const initials = talent.full_name.split(" ").map(n=>n[0]).slice(0,2).join("");
  const gradients = ["from-indigo-500 to-blue-600","from-cyan-500 to-teal-600","from-orange-500 to-amber-600","from-rose-500 to-pink-600","from-emerald-500 to-green-600","from-violet-500 to-purple-600"];
  const grad = gradients[talent.full_name.charCodeAt(0)%gradients.length];
  const avail = talent.availability || "available";

  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.4}}>
      <Link href={`/talent-hub/talent/${talent.username}`}
        className="card-hover group flex h-full flex-col rounded-2xl border border-border-color bg-surface overflow-hidden">
        <div className={`h-24 bg-gradient-to-br ${grad} relative`}>
          <div className="absolute -bottom-8 left-5">
            {talent.profile_image
              ? <img src={talent.profile_image} alt={talent.full_name} className="h-16 w-16 rounded-2xl border-4 border-surface object-cover"/>
              : <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-surface bg-gradient-to-br ${grad} font-display text-xl font-bold text-white`}>{initials}</div>
            }
          </div>
        </div>
        <div className="pt-10 px-5 pb-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-sm font-bold">{talent.full_name}</h3>
              <p className="text-xs text-muted flex items-center gap-1 mt-0.5"><MapPin size={11}/>{talent.location||"Sri Lanka"}</p>
            </div>
            <span className={`text-xs font-semibold ${AVAILABILITY_COLORS[avail]}`}>● {AVAILABILITY_LABELS[avail]}</span>
          </div>
          {talent.primary_service&&<p className="mt-2 text-xs font-semibold text-brand-primary">{talent.primary_service}</p>}
          {talent.bio&&<p className="mt-2 text-xs text-muted line-clamp-2 flex-1">{talent.bio}</p>}
          {talent.talent_services&&talent.talent_services.length>0&&(
            <div className="mt-3 flex flex-wrap gap-1">
              {talent.talent_services.slice(0,3).map(s=>(
                <span key={s.id} className="rounded-full bg-brand-primary/10 px-2 py-0.5 text-xs text-brand-primary">{s.service_name}</span>
              ))}
            </div>
          )}
          <div className="mt-4 flex items-center justify-between border-t border-border-color pt-3">
            <span className="text-xs text-muted">{talent.experience||"Freelancer"}</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-brand-primary group-hover:underline">View Profile →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TalentHubPage() {
  const [talent, setTalent] = useState<TalentProfile[]>([]);
  const [filtered, setFiltered] = useState<TalentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [availFilter, setAvailFilter] = useState("");

  useEffect(()=>{
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("talent_profiles")
        .select("*,talent_services(*),social_links(*)")
        .eq("is_public",true)
        .order("created_at",{ascending:false});
      setTalent(data||[]);
      setFiltered(data||[]);
      setLoading(false);
    }
    load();
  },[]);

  useEffect(()=>{
    let result = [...talent];
    if(search){
      const q = search.toLowerCase();
      result = result.filter(t=>
        t.full_name.toLowerCase().includes(q)||
        t.username.toLowerCase().includes(q)||
        (t.primary_service||"").toLowerCase().includes(q)||
        (t.location||"").toLowerCase().includes(q)||
        (t.bio||"").toLowerCase().includes(q)||
        (t.talent_services||[]).some(s=>s.service_name.toLowerCase().includes(q))
      );
    }
    if(serviceFilter) result = result.filter(t=>(t.primary_service||"").includes(serviceFilter)||(t.talent_services||[]).some(s=>s.service_name.includes(serviceFilter)));
    if(locationFilter) result = result.filter(t=>(t.location||"").toLowerCase().includes(locationFilter.toLowerCase()));
    if(availFilter) result = result.filter(t=>t.availability===availFilter);
    setFiltered(result);
  },[search,serviceFilter,locationFilter,availFilter,talent]);

  const clearFilters = ()=>{ setSearch(""); setServiceFilter(""); setLocationFilter(""); setAvailFilter(""); };
  const hasFilters = search||serviceFilter||locationFilter||availFilter;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-primary/15 blur-3xl"/>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <span className="mb-4 inline-flex items-center rounded-full border border-border-color bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary">UpNited Talent Hub</span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl mt-2">
              Discover Sri Lanka&apos;s <span className="gradient-text">Best Talent</span>
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-muted">A free directory connecting businesses with influencers, creatives, and skilled professionals across the island.</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/talent-hub/signup" className="flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-105">
                <UserPlus size={16}/> Join Talent Hub — Free
              </Link>
              <Link href="/talent-hub/login" className="flex items-center gap-2 rounded-full border border-border-color bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary">
                My Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <section className="bg-surface border-y border-border-color py-5 sticky top-[73px] z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} type="text"
                placeholder="Search by name, service, skill, location..."
                className="w-full rounded-full border border-border-color bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-brand-primary"/>
            </div>
            <select value={serviceFilter} onChange={e=>setServiceFilter(e.target.value)}
              className="rounded-full border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary">
              <option value="">All Services</option>
              {SERVICE_CATEGORIES.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <select value={availFilter} onChange={e=>setAvailFilter(e.target.value)}
              className="rounded-full border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary">
              <option value="">Any Availability</option>
              <option value="available">Available</option>
              <option value="open">Open to Offers</option>
              <option value="busy">Busy</option>
            </select>
            {hasFilters&&(
              <button onClick={clearFilters} className="flex items-center gap-1.5 rounded-full border border-border-color px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-brand-secondary hover:text-brand-secondary">
                <X size={14}/> Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* TALENT GRID */}
      <section className="section-padding pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted">{loading?"Loading...": `${filtered.length} talent${filtered.length!==1?"s":""} found`}</p>
          </div>
          {loading?(
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({length:6}).map((_,i)=>(
                <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface border border-border-color"/>
              ))}
            </div>
          ):filtered.length>0?(
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(t=><TalentCard key={t.id} talent={t}/>)}
            </div>
          ):(
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-border-color bg-surface p-16 text-center">
              <BadgeCheck size={40} className="text-muted"/>
              <h3 className="mt-4 font-display text-lg font-bold">No talent found</h3>
              <p className="mt-2 max-w-sm text-sm text-muted">Try adjusting your search or filters. Or be the first to join this category!</p>
              <Link href="/talent-hub/signup" className="mt-5 flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-105">
                <UserPlus size={16}/> Join Talent Hub
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
