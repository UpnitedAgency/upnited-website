"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft, Upload, Trash2, CheckCircle2, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { TalentProfile, SERVICE_CATEGORIES } from "@/lib/talent-types";

export default function ProfileEditPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [talentId, setTalentId] = useState("");

  const [form, setForm] = useState({
    full_name:"", username:"", age:"", location:"", bio:"",
    primary_service:"", experience:"", availability:"available",
    profile_image:"",
  });
  const [socials, setSocials] = useState({
    instagram:"", facebook:"", tiktok:"", linkedin:"", website:""
  });
  const [socialId, setSocialId] = useState("");

  useEffect(()=>{
    async function load(){
      const supabase = createClient();
      const { data:{user} } = await supabase.auth.getUser();
      if(!user){ router.push("/talent-hub/login"); return; }
      const { data:tp } = await supabase.from("talent_profiles").select("*").eq("user_id",user.id).single();
      if(tp){
        setTalentId(tp.id);
        setForm({ full_name:tp.full_name||"", username:tp.username||"", age:tp.age||"", location:tp.location||"", bio:tp.bio||"", primary_service:tp.primary_service||"", experience:tp.experience||"", availability:tp.availability||"available", profile_image:tp.profile_image||"" });
        const { data:sl } = await supabase.from("social_links").select("*").eq("talent_id",tp.id).single();
        if(sl){ setSocialId(sl.id); setSocials({ instagram:sl.instagram||"", facebook:sl.facebook||"", tiktok:sl.tiktok||"", linkedin:sl.linkedin||"", website:sl.website||"" }); }
      }
      setLoading(false);
    }
    load();
  },[router]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;
    if(!file.type.startsWith("image/")){ setError("Please upload an image file."); return; }
    if(file.size>5*1024*1024){ setError("Image must be under 5MB."); return; }
    setUploading(true); setError("");
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${talentId}/avatar.${ext}`;
    const { error:uploadErr } = await supabase.storage.from("talent-avatars").upload(path, file, { upsert:true });
    if(uploadErr){ setError("Upload failed: "+uploadErr.message); setUploading(false); return; }
    const { data:{publicUrl} } = supabase.storage.from("talent-avatars").getPublicUrl(path);
    setForm(f=>({...f,profile_image:publicUrl}));
    setUploading(false);
  };

  const handleRemovePhoto = async () => {
    setForm(f=>({...f,profile_image:""}));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError(""); setSaved(false);
    const supabase = createClient();
    const { error:profileErr } = await supabase.from("talent_profiles").update({
      full_name:form.full_name, username:form.username,
      age:form.age?parseInt(String(form.age)):null,
      location:form.location, bio:form.bio,
      primary_service:form.primary_service, experience:form.experience,
      availability:form.availability, profile_image:form.profile_image,
    }).eq("id",talentId);
    if(profileErr){ setError(profileErr.message); setSaving(false); return; }
    if(socialId){
      await supabase.from("social_links").update(socials).eq("id",socialId);
    } else {
      await supabase.from("social_links").insert({talent_id:talentId,...socials});
    }
    setSaving(false); setSaved(true);
    setTimeout(()=>setSaved(false),3000);
  };

  if(loading) return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"/></div>;

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/talent-hub/dashboard" className="flex h-9 w-9 items-center justify-center rounded-full border border-border-color hover:border-brand-primary hover:text-brand-primary transition-colors"><ArrowLeft size={18}/></Link>
          <h1 className="font-display text-2xl font-bold">Edit Profile</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Photo */}
          <div className="rounded-3xl border border-border-color bg-surface p-6">
            <h2 className="font-display text-base font-bold mb-4">Profile Photo</h2>
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 shrink-0 rounded-2xl overflow-hidden border-2 border-border-color bg-background">
                {form.profile_image?<img src={form.profile_image} alt="Preview" className="h-full w-full object-cover"/>
                :<div className="flex h-full w-full items-center justify-center text-muted text-2xl font-bold">{form.full_name[0]||"?"}</div>}
              </div>
              <div className="flex flex-col gap-2">
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload}/>
                <button type="button" onClick={()=>fileRef.current?.click()} disabled={uploading}
                  className="flex items-center gap-2 rounded-full gradient-bg px-4 py-2 text-sm font-semibold text-white disabled:opacity-70">
                  <Upload size={14}/>{uploading?"Uploading...":"Upload Photo"}
                </button>
                {form.profile_image&&<button type="button" onClick={handleRemovePhoto} className="flex items-center gap-2 rounded-full border border-border-color px-4 py-2 text-sm text-muted hover:border-red-400 hover:text-red-400"><Trash2 size={14}/>Remove</button>}
              </div>
            </div>
            <p className="mt-3 text-xs text-muted">PNG, JPG up to 5MB. Square images work best.</p>
          </div>

          {/* Personal */}
          <div className="rounded-3xl border border-border-color bg-surface p-6">
            <h2 className="font-display text-base font-bold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Full Name *</label>
                <input required value={form.full_name} onChange={e=>setForm(f=>({...f,full_name:e.target.value}))} type="text" placeholder="Your full name"
                  className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Username *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">@</span>
                  <input required value={form.username} onChange={e=>setForm(f=>({...f,username:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,"")}))} type="text"
                    className="w-full rounded-xl border border-border-color bg-background py-2.5 pl-8 pr-4 text-sm outline-none focus:border-brand-primary"/>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Age</label>
                <input value={form.age} onChange={e=>setForm(f=>({...f,age:e.target.value}))} type="number" min="16" max="99" placeholder="Your age"
                  className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Location</label>
                <input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} type="text" placeholder="e.g. Colombo, Sri Lanka"
                  className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium">Bio</label>
                <textarea value={form.bio} onChange={e=>setForm(f=>({...f,bio:e.target.value}))} rows={4} placeholder="Write a short professional bio..."
                  className="w-full resize-none rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
                <p className="mt-1 text-xs text-muted">{form.bio.length}/300 characters</p>
              </div>
            </div>
          </div>

          {/* Professional */}
          <div className="rounded-3xl border border-border-color bg-surface p-6">
            <h2 className="font-display text-base font-bold mb-4">Professional Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Primary Service</label>
                <select value={form.primary_service} onChange={e=>setForm(f=>({...f,primary_service:e.target.value}))}
                  className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary">
                  <option value="">Select your main service</option>
                  {SERVICE_CATEGORIES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Experience</label>
                <select value={form.experience} onChange={e=>setForm(f=>({...f,experience:e.target.value}))}
                  className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary">
                  <option value="">Select experience level</option>
                  <option>Less than 1 year</option>
                  <option>1–2 years</option>
                  <option>3–5 years</option>
                  <option>5–10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Availability</label>
                <select value={form.availability} onChange={e=>setForm(f=>({...f,availability:e.target.value}))}
                  className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary">
                  <option value="available">Available</option>
                  <option value="open">Open to Offers</option>
                  <option value="busy">Currently Busy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-3xl border border-border-color bg-surface p-6">
            <h2 className="font-display text-base font-bold mb-4">Social Links</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { key:"instagram", placeholder:"instagram.com/yourhandle", label:"Instagram" },
                { key:"facebook", placeholder:"facebook.com/yourpage", label:"Facebook" },
                { key:"tiktok", placeholder:"tiktok.com/@yourhandle", label:"TikTok" },
                { key:"linkedin", placeholder:"linkedin.com/in/yourname", label:"LinkedIn" },
                { key:"website", placeholder:"yourwebsite.com", label:"Personal Website" },
              ].map(s=>(
                <div key={s.key}>
                  <label className="mb-1.5 block text-sm font-medium">{s.label}</label>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/>
                    <input value={(socials as Record<string,string>)[s.key]} onChange={e=>setSocials(sl=>({...sl,[s.key]:e.target.value}))}
                      type="url" placeholder={`https://${s.placeholder}`}
                      className="w-full rounded-xl border border-border-color bg-background py-2.5 pl-8 pr-4 text-sm outline-none focus:border-brand-primary"/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error&&<p className="text-sm text-red-500">{error}</p>}
          {saved&&<p className="flex items-center gap-2 text-sm font-semibold text-emerald-500"><CheckCircle2 size={16}/>Profile saved successfully!</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70">
              <Save size={16}/>{saving?"Saving...":"Save Profile"}
            </button>
            <Link href="/talent-hub/dashboard" className="flex items-center gap-2 rounded-full border border-border-color px-6 py-3.5 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
