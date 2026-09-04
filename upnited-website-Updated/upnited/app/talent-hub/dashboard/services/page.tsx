"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { TalentService, SERVICE_CATEGORIES } from "@/lib/talent-types";

export default function ServicesPage() {
  const router = useRouter();
  const [talentId, setTalentId] = useState("");
  const [services, setServices] = useState<TalentService[]>([]);
  const [newService, setNewService] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(()=>{
    async function load(){
      const supabase = createClient();
      const { data:{user} } = await supabase.auth.getUser();
      if(!user){ router.push("/talent-hub/login"); return; }
      const { data:tp } = await supabase.from("talent_profiles").select("id").eq("user_id",user.id).single();
      if(!tp){ router.push("/talent-hub/dashboard"); return; }
      setTalentId(tp.id);
      const { data:sv } = await supabase.from("talent_services").select("*").eq("talent_id",tp.id).order("order_index");
      setServices(sv||[]);
      setLoading(false);
    }
    load();
  },[router]);

  const addService = async () => {
    if(!newService.trim()) return;
    if(services.find(s=>s.service_name===newService)){ setNewService(""); return; }
    setAdding(true);
    const supabase = createClient();
    const { data } = await supabase.from("talent_services").insert({
      talent_id:talentId, service_name:newService, order_index:services.length
    }).select().single();
    if(data) setServices(sv=>[...sv,data]);
    setNewService(""); setAdding(false); showSaved();
  };

  const removeService = async (id: string) => {
    const supabase = createClient();
    await supabase.from("talent_services").delete().eq("id",id);
    setServices(sv=>sv.filter(s=>s.id!==id)); showSaved();
  };

  const showSaved = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };

  if(loading) return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"/></div>;

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/talent-hub/dashboard" className="flex h-9 w-9 items-center justify-center rounded-full border border-border-color hover:border-brand-primary hover:text-brand-primary transition-colors"><ArrowLeft size={18}/></Link>
          <h1 className="font-display text-2xl font-bold">My Services</h1>
        </div>

        <div className="rounded-3xl border border-border-color bg-surface p-6 mb-6">
          <h2 className="font-display text-base font-bold mb-4">Add a Service</h2>
          <div className="flex gap-3">
            <select value={newService} onChange={e=>setNewService(e.target.value)}
              className="flex-1 rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary">
              <option value="">Choose a service to add...</option>
              {SERVICE_CATEGORIES.filter(s=>!services.find(sv=>sv.service_name===s)).map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={addService} disabled={!newService||adding}
              className="flex items-center gap-2 rounded-full gradient-bg px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70 transition-transform hover:scale-105">
              <Plus size={16}/>{adding?"Adding...":"Add"}
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-border-color bg-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base font-bold">Your Services ({services.length})</h2>
            {saved&&<span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-500"><CheckCircle2 size={14}/>Saved</span>}
          </div>
          {services.length===0?(
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border-color p-10 text-center">
              <p className="text-sm text-muted">No services yet. Add your first service above.</p>
            </div>
          ):(
            <div className="space-y-2">
              {services.map((s,i)=>(
                <div key={s.id} className="flex items-center justify-between rounded-xl border border-border-color bg-background px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted w-5">{String(i+1).padStart(2,"0")}</span>
                    <span className="text-sm font-medium">{s.service_name}</span>
                  </div>
                  <button onClick={()=>removeService(s.id)} className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-red-500/10 hover:text-red-500">
                    <Trash2 size={15}/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
