"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, CheckCircle2, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const router = useRouter();
  const [talentId, setTalentId] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(()=>{
    async function load(){
      const supabase = createClient();
      const { data:{user} } = await supabase.auth.getUser();
      if(!user){ router.push("/talent-hub/login"); return; }
      const { data:tp } = await supabase.from("talent_profiles").select("id,is_public,username").eq("user_id",user.id).single();
      if(!tp){ router.push("/talent-hub/dashboard"); return; }
      setTalentId(tp.id);
      setIsPublic(tp.is_public);
      setUsername(tp.username);
      setLoading(false);
    }
    load();
  },[router]);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("talent_profiles").update({ is_public: isPublic }).eq("id", talentId);
    setSaving(false); setSaved(true);
    setTimeout(()=>setSaved(false), 3000);
  };

  if(loading) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"/>
    </div>
  );

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/talent-hub/dashboard" className="flex h-9 w-9 items-center justify-center rounded-full border border-border-color hover:border-brand-primary hover:text-brand-primary transition-colors">
            <ArrowLeft size={18}/>
          </Link>
          <h1 className="font-display text-2xl font-bold">Settings</h1>
        </div>

        {/* Visibility */}
        <div className="rounded-3xl border border-border-color bg-surface p-6 mb-6">
          <h2 className="font-display text-base font-bold mb-1">Profile Visibility</h2>
          <p className="text-sm text-muted mb-5">Control whether your profile appears in the public Talent Hub directory.</p>

          <div className="flex flex-col gap-3">
            {[
              { value: true, label: "Published", desc: "Your profile is visible to everyone in the Talent Hub.", icon: Eye, color: "border-emerald-500 bg-emerald-500/5" },
              { value: false, label: "Draft", desc: "Your profile is hidden. Only you can see it.", icon: EyeOff, color: "border-border-color bg-background" },
            ].map(opt=>(
              <button key={String(opt.value)} type="button" onClick={()=>setIsPublic(opt.value)}
                className={`flex items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all ${isPublic===opt.value ? opt.color : "border-border-color bg-background"}`}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isPublic===opt.value?"gradient-bg text-white":"bg-surface text-muted"}`}>
                  <opt.icon size={18}/>
                </div>
                <div>
                  <p className="font-display text-sm font-bold">{opt.label}</p>
                  <p className="text-xs text-muted mt-0.5">{opt.desc}</p>
                </div>
                {isPublic===opt.value&&<CheckCircle2 size={18} className="ml-auto shrink-0 text-brand-primary mt-1"/>}
              </button>
            ))}
          </div>

          {isPublic&&(
            <div className="mt-4 rounded-xl bg-brand-primary/5 border border-brand-primary/20 px-4 py-3">
              <p className="text-xs text-muted">Your public profile URL:</p>
              <a href={`/talent-hub/talent/${username}`} target="_blank"
                className="text-sm font-semibold text-brand-primary hover:underline">
                upnited.com/talent-hub/talent/{username}
              </a>
            </div>
          )}

          {!isPublic&&(
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-500/5 border border-amber-500/20 px-4 py-3">
              <AlertTriangle size={15} className="shrink-0 text-amber-500 mt-0.5"/>
              <p className="text-xs text-muted">Complete your profile before publishing to make a great impression.</p>
            </div>
          )}
        </div>

        {saved&&(
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-500 mb-4">
            <CheckCircle2 size={16}/>Settings saved successfully!
          </p>
        )}

        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70">
          {saving?"Saving...":"Save Settings"}
        </button>
      </div>
    </section>
  );
}
