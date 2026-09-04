"use client";
import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Globe, ExternalLink, MessageCircle, Send, CheckCircle2, X, ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { InstagramIcon, FacebookIcon, LinkedInIcon, TikTokIcon } from "@/components/shared/SocialIcons";
import { TalentProfile, AVAILABILITY_LABELS, AVAILABILITY_COLORS, SERVICE_CATEGORIES } from "@/lib/talent-types";

function HireModal({ talent, onClose }: { talent: TalentProfile; onClose: ()=>void }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", service:"", message:"" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const supabase = createClient();
    const { error: err } = await supabase.from("hire_requests").insert({
      talent_id: talent.id,
      name: form.name, email: form.email, phone: form.phone,
      service: form.service, message: form.message, status: "new",
    });
    setLoading(false);
    if(err){ setError("Something went wrong. Please try again."); return; }
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md rounded-3xl border border-border-color bg-background p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-bold">Contact {talent.full_name.split(" ")[0]}</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-border-color text-muted hover:border-brand-primary hover:text-brand-primary"><X size={16}/></button>
        </div>
        {done?(
          <div className="flex flex-col items-center text-center py-6">
            <CheckCircle2 size={40} className="text-brand-primary"/>
            <p className="mt-3 font-display text-lg font-bold">Request Sent!</p>
            <p className="mt-1 text-sm text-muted">{talent.full_name.split(" ")[0]} will get back to you soon.</p>
            <button onClick={onClose} className="mt-5 rounded-full gradient-bg px-6 py-2.5 text-sm font-semibold text-white">Close</button>
          </div>
        ):(
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Your Name</label>
              <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} type="text" placeholder="Full name"
                className="w-full rounded-xl border border-border-color bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input required value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} type="email" placeholder="your@email.com"
                className="w-full rounded-xl border border-border-color bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Phone (Optional)</label>
              <input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} type="tel" placeholder="+94 7X XXX XXXX"
                className="w-full rounded-xl border border-border-color bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Service Required</label>
              <select value={form.service} onChange={e=>setForm(f=>({...f,service:e.target.value}))}
                className="w-full rounded-xl border border-border-color bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand-primary">
                <option value="">Select a service...</option>
                {SERVICE_CATEGORIES.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea required value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} rows={4}
                placeholder="Tell them about your project..."
                className="w-full resize-none rounded-xl border border-border-color bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
            </div>
            {error&&<p className="text-sm text-red-500">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70">
              <Send size={15}/>{loading?"Sending...":"Send Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function PublicTalentProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<TalentProfile|null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showHire, setShowHire] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number|null>(null);

  useEffect(()=>{
    async function load(){
      const supabase = createClient();
      const { data } = await supabase
        .from("talent_profiles")
        .select("*,talent_services(*),social_links(*),portfolio_projects(*)")
        .eq("username",username)
        .eq("is_public",true)
        .single();
      if(!data){ setNotFound(true); setLoading(false); return; }
      // sort portfolio
      if(data.portfolio_projects) data.portfolio_projects.sort((a:any,b:any)=>a.order_index-b.order_index);
      if(data.talent_services) data.talent_services.sort((a:any,b:any)=>a.order_index-b.order_index);
      setProfile(data);
      setLoading(false);
    }
    load();
  },[username]);

  if(loading) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"/>
    </div>
  );

  if(notFound) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-3xl font-bold">Profile Not Found</h1>
      <p className="mt-2 text-muted">This talent profile doesn&apos;t exist or is currently private.</p>
      <Link href="/talent-hub" className="mt-6 flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25">Browse Talent Hub</Link>
    </div>
  );

  if(!profile) return null;

  const avail = profile.availability||"available";
  const gradients = ["from-indigo-500 to-blue-600","from-cyan-500 to-teal-600","from-orange-500 to-amber-600","from-rose-500 to-pink-600","from-emerald-500 to-green-600","from-violet-500 to-purple-600"];
  const grad = gradients[profile.full_name.charCodeAt(0)%gradients.length];
  const initials = profile.full_name.split(" ").map((n:string)=>n[0]).slice(0,2).join("");
  const sl = profile.social_links as any;

  return (
    <>
      {showHire&&<HireModal talent={profile} onClose={()=>setShowHire(false)}/>}

      {/* Hero Banner */}
      <div className={`h-48 sm:h-64 w-full bg-gradient-to-br ${grad} relative`}>
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 30% 50%,white 0%,transparent 50%)"}}/>
        <div className="absolute top-4 left-4">
          <Link href="/talent-hub" className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-colors">
            <ChevronLeft size={16}/> Back
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-end gap-4">
              {profile.profile_image
                ? <img src={profile.profile_image} alt={profile.full_name} className="h-28 w-28 rounded-2xl border-4 border-background object-cover shadow-xl"/>
                : <div className={`flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-background bg-gradient-to-br ${grad} font-display text-3xl font-bold text-white shadow-xl`}>{initials}</div>
              }
              <div className="pb-2">
                <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{profile.full_name}</h1>
                <p className="text-sm text-muted">@{profile.username}</p>
                {profile.location&&<p className="flex items-center gap-1 text-sm text-muted mt-1"><MapPin size={13}/>{profile.location}</p>}
              </div>
            </div>
            <div className="flex gap-3 pb-2">
              <button onClick={()=>setShowHire(true)}
                className="flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-105">
                <MessageCircle size={16}/> Contact / Hire
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-5">
            {/* Status */}
            <div className="rounded-2xl border border-border-color bg-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Status</p>
              <span className={`text-sm font-semibold ${AVAILABILITY_COLORS[avail]}`}>● {AVAILABILITY_LABELS[avail]}</span>
              {profile.primary_service&&<p className="mt-2 text-sm font-semibold text-brand-primary">{profile.primary_service}</p>}
              {profile.experience&&<p className="mt-1 text-xs text-muted">{profile.experience} experience</p>}
            </div>

            {/* Services */}
            {profile.talent_services&&profile.talent_services.length>0&&(
              <div className="rounded-2xl border border-border-color bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Services</p>
                <div className="flex flex-wrap gap-2">
                  {profile.talent_services.map((s:any)=>(
                    <span key={s.id} className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">{s.service_name}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {sl&&(sl.instagram||sl.facebook||sl.tiktok||sl.linkedin||sl.website)&&(
              <div className="rounded-2xl border border-border-color bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Connect</p>
                <div className="space-y-2">
                  {sl.instagram&&<a href={sl.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-brand-primary transition-colors"><InstagramIcon size={15}/>Instagram<ExternalLink size={12} className="ml-auto"/></a>}
                  {sl.facebook&&<a href={sl.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-brand-primary transition-colors"><FacebookIcon size={15}/>Facebook<ExternalLink size={12} className="ml-auto"/></a>}
                  {sl.tiktok&&<a href={sl.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-brand-primary transition-colors"><TikTokIcon size={15}/>TikTok<ExternalLink size={12} className="ml-auto"/></a>}
                  {sl.linkedin&&<a href={sl.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-brand-primary transition-colors"><LinkedInIcon size={15}/>LinkedIn<ExternalLink size={12} className="ml-auto"/></a>}
                  {sl.website&&<a href={sl.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-brand-primary transition-colors"><Globe size={15}/>Website<ExternalLink size={12} className="ml-auto"/></a>}
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            {profile.bio&&(
              <div className="rounded-2xl border border-border-color bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">About</p>
                <p className="text-sm leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {/* Portfolio */}
            {profile.portfolio_projects&&profile.portfolio_projects.length>0&&(
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Portfolio</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {profile.portfolio_projects.map((p:any,i:number)=>(
                    <div key={p.id} className="card-hover group cursor-pointer overflow-hidden rounded-2xl border border-border-color bg-surface"
                      onClick={()=>setSelectedProject(selectedProject===i?null:i)}>
                      {p.cover_image?(
                        <div className="h-40 overflow-hidden"><img src={p.cover_image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/></div>
                      ):(
                        <div className={`h-40 bg-gradient-to-br ${gradients[i%gradients.length]} flex items-center justify-center`}>
                          <span className="font-display text-white/40 text-4xl font-extrabold">{p.title[0]}</span>
                        </div>
                      )}
                      <div className="p-4">
                        {p.category&&<p className="text-xs font-semibold text-brand-primary">{p.category}</p>}
                        <h3 className="font-display text-sm font-bold mt-1">{p.title}</h3>
                        {selectedProject===i&&(
                          <div className="mt-3 space-y-2 border-t border-border-color pt-3">
                            {p.description&&<p className="text-xs text-muted">{p.description}</p>}
                            <div className="flex flex-wrap gap-3 text-xs text-muted">
                              {p.client_name&&<span>Client: {p.client_name}</span>}
                              {p.project_date&&<span>{p.project_date}</span>}
                            </div>
                            {p.project_url&&(
                              <a href={p.project_url} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline" onClick={e=>e.stopPropagation()}>
                                View Project <ExternalLink size={11}/>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl gradient-bg p-6 text-center">
              <p className="font-display text-lg font-bold text-white">Want to work with {profile.full_name.split(" ")[0]}?</p>
              <p className="mt-1 text-sm text-white/80">Send a message and start a conversation.</p>
              <button onClick={()=>setShowHire(true)}
                className="mt-4 flex mx-auto items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-primary shadow-lg transition-transform hover:scale-105">
                <MessageCircle size={16}/> Contact / Hire
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
