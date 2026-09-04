"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Camera, CheckCircle2, Clock, ListChecks, FileText, TrendingUp, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const tasks = [
  { id:1, title:"Create 5 reels for Good Heart Cafe", status:"In Progress", due:"Today" },
  { id:2, title:"Design carousel post for Kard Nation", status:"Pending", due:"Tomorrow" },
  { id:3, title:"Edit drone footage - Coastal Stays", status:"Completed", due:"Yesterday" },
  { id:4, title:"Submit weekly analytics report", status:"Pending", due:"Friday" },
];

const statusColors: Record<string,string> = {
  "In Progress":"bg-brand-accent/10 text-brand-accent",
  Pending:"bg-muted/10 text-muted",
  Completed:"bg-emerald-500/10 text-emerald-500",
};

export default function WorkspaceDashboardPage() {
  const router = useRouter();
  const [checkedIn, setCheckedIn] = useState(false);
  const [selfieDone, setSelfieDone] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [report, setReport] = useState("");

  useEffect(()=>{
    async function load(){
      const supabase = createClient();
      const { data:{user} } = await supabase.auth.getUser();
      if(!user){ router.push("/workspace/login"); return; }
      const { data:profile } = await supabase.from("profiles").select("full_name,username").eq("id",user.id).single();
      setDisplayName(profile?.full_name||profile?.username||user.email?.split("@")[0]||"there");
    }
    load();
  },[router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/workspace/login");
    router.refresh();
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Welcome back{displayName?`, ${displayName}`:""} 👋</h1>
            <p className="mt-1 text-sm text-muted">Here&apos;s your overview for today.</p>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 rounded-full border border-border-color px-5 py-2.5 text-sm font-semibold transition-colors hover:border-red-400 hover:text-red-400">
            <LogOut size={16}/> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Attendance */}
          <div className="rounded-3xl border border-border-color bg-surface p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary mb-2"><Clock size={18}/> Daily Attendance</div>
            <p className="text-sm text-muted mb-5">Check in to start tracking your work day.</p>
            <div className="space-y-3">
              <button onClick={()=>setSelfieDone(true)} disabled={selfieDone}
                className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${selfieDone?"border-emerald-500 bg-emerald-500/10 text-emerald-500":"border-border-color hover:border-brand-primary"}`}>
                <Camera size={16}/>{selfieDone?"Selfie Verified ✓":"Take Morning Selfie"}
              </button>
              <button onClick={()=>setCheckedIn(c=>!c)} disabled={!selfieDone}
                className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-50 ${checkedIn?"bg-red-500":"gradient-bg"}`}>
                {checkedIn?"Check Out":"Check In"}
              </button>
              {checkedIn&&<p className="flex items-center justify-center gap-1.5 text-xs text-emerald-500"><CheckCircle2 size={14}/>Checked in at {new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</p>}
            </div>
          </div>

          {/* Performance */}
          <div className="rounded-3xl border border-border-color bg-surface p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary mb-5"><TrendingUp size={18}/> This Week</div>
            <div className="space-y-4">
              {[{label:"Tasks Completed",value:"12/15",pct:80},{label:"Attendance",value:"5/5 days",pct:100},{label:"Reports Submitted",value:"4/5",pct:80}].map(s=>(
                <div key={s.label}>
                  <div className="flex justify-between text-sm mb-1"><span>{s.label}</span><span className="font-semibold">{s.value}</span></div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-background"><div className="h-full gradient-bg rounded-full" style={{width:`${s.pct}%`}}/></div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Report */}
          <div className="rounded-3xl border border-border-color bg-surface p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary mb-2"><FileText size={18}/> Daily Work Report</div>
            <p className="text-sm text-muted mb-4">Submit your end-of-day summary.</p>
            <textarea value={report} onChange={e=>setReport(e.target.value)} rows={4} placeholder="What did you work on today?"
              className="w-full resize-none rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
              Submit Report
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div className="mt-6 rounded-3xl border border-border-color bg-surface p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary mb-4"><ListChecks size={18}/> My Tasks</div>
          <div className="space-y-3">
            {tasks.map(task=>(
              <div key={task.id} className="flex flex-col gap-2 rounded-2xl border border-border-color bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-sm font-medium">{task.title}</p><p className="text-xs text-muted">Due: {task.due}</p></div>
                <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColors[task.status]}`}>{task.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
