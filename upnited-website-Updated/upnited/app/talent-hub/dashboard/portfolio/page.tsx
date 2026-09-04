"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Upload, X, CheckCircle2, Edit2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PortfolioProject } from "@/lib/talent-types";

function ProjectForm({ talentId, project, onSave, onCancel }: {
  talentId:string; project?:PortfolioProject; onSave:(p:PortfolioProject)=>void; onCancel:()=>void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: project?.title||"", description: project?.description||"",
    category: project?.category||"", client_name: project?.client_name||"",
    project_url: project?.project_url||"", project_date: project?.project_date||"",
    cover_image: project?.cover_image||"",
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;
    if(!file.type.startsWith("image/")){ setError("Please upload an image file."); return; }
    if(file.size>10*1024*1024){ setError("Image must be under 10MB."); return; }
    setUploading(true); setError("");
    const supabase = createClient();
    const path = `${talentId}/${Date.now()}-${file.name.replace(/\s/g,"-")}`;
    const { error:upErr } = await supabase.storage.from("portfolio-images").upload(path, file);
    if(upErr){ setError("Upload failed: "+upErr.message); setUploading(false); return; }
    const { data:{publicUrl} } = supabase.storage.from("portfolio-images").getPublicUrl(path);
    setForm(f=>({...f,cover_image:publicUrl}));
    setUploading(false);
  };

  const handleSave = async () => {
    if(!form.title.trim()){ setError("Title is required."); return; }
    setSaving(true); setError("");
    const supabase = createClient();
    let data, err;
    if(project?.id){
      const res = await supabase.from("portfolio_projects").update({...form}).eq("id",project.id).select().single();
      data=res.data; err=res.error;
    } else {
      const res = await supabase.from("portfolio_projects").insert({talent_id:talentId,...form,order_index:0}).select().single();
      data=res.data; err=res.error;
    }
    setSaving(false);
    if(err){ setError(err.message); return; }
    if(data) onSave(data);
  };

  return (
    <div className="rounded-3xl border border-brand-primary/30 bg-surface p-6">
      <h3 className="font-display text-base font-bold mb-4">{project?"Edit Project":"New Project"}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Project Title *</label>
          <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} type="text" placeholder="e.g. Good Heart Cafe Rebranding"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Category</label>
          <input value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} type="text" placeholder="e.g. Branding, Social Media"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Client / Project Name</label>
          <input value={form.client_name} onChange={e=>setForm(f=>({...f,client_name:e.target.value}))} type="text" placeholder="Client name"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Project URL</label>
          <input value={form.project_url} onChange={e=>setForm(f=>({...f,project_url:e.target.value}))} type="url" placeholder="https://"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Year / Date</label>
          <input value={form.project_date} onChange={e=>setForm(f=>({...f,project_date:e.target.value}))} type="text" placeholder="e.g. 2024"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Description</label>
          <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} placeholder="Describe this project..."
            className="w-full resize-none rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Cover Image</label>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload}/>
          {form.cover_image?(
            <div className="relative inline-block">
              <img src={form.cover_image} alt="Cover" className="h-32 w-48 rounded-xl object-cover border border-border-color"/>
              <button type="button" onClick={()=>setForm(f=>({...f,cover_image:""}))} className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"><X size={12}/></button>
            </div>
          ):(
            <button type="button" onClick={()=>fileRef.current?.click()} disabled={uploading}
              className="flex items-center gap-2 rounded-xl border border-dashed border-border-color bg-background px-6 py-4 text-sm text-muted hover:border-brand-primary hover:text-brand-primary transition-colors disabled:opacity-70">
              <Upload size={16}/>{uploading?"Uploading...":"Upload Cover Image"}
            </button>
          )}
        </div>
      </div>
      {error&&<p className="mt-3 text-sm text-red-500">{error}</p>}
      <div className="mt-5 flex gap-3">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 rounded-full gradient-bg px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-70 transition-transform hover:scale-105">
          <CheckCircle2 size={15}/>{saving?"Saving...":"Save Project"}
        </button>
        <button onClick={onCancel} className="flex items-center gap-2 rounded-full border border-border-color px-6 py-2.5 text-sm font-semibold hover:border-brand-primary hover:text-brand-primary transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const router = useRouter();
  const [talentId, setTalentId] = useState("");
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<PortfolioProject|undefined>();

  useEffect(()=>{
    async function load(){
      const supabase = createClient();
      const { data:{user} } = await supabase.auth.getUser();
      if(!user){ router.push("/talent-hub/login"); return; }
      const { data:tp } = await supabase.from("talent_profiles").select("id").eq("user_id",user.id).single();
      if(!tp){ router.push("/talent-hub/dashboard"); return; }
      setTalentId(tp.id);
      const { data:pp } = await supabase.from("portfolio_projects").select("*").eq("talent_id",tp.id).order("order_index");
      setProjects(pp||[]);
      setLoading(false);
    }
    load();
  },[router]);

  const handleDelete = async (id:string) => {
    if(!confirm("Delete this project?")) return;
    const supabase = createClient();
    await supabase.from("portfolio_projects").delete().eq("id",id);
    setProjects(p=>p.filter(pp=>pp.id!==id));
  };

  const handleSaved = (p:PortfolioProject) => {
    if(editProject) setProjects(pp=>pp.map(x=>x.id===p.id?p:x));
    else setProjects(pp=>[p,...pp]);
    setShowForm(false); setEditProject(undefined);
  };

  if(loading) return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"/></div>;

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/talent-hub/dashboard" className="flex h-9 w-9 items-center justify-center rounded-full border border-border-color hover:border-brand-primary hover:text-brand-primary transition-colors"><ArrowLeft size={18}/></Link>
            <h1 className="font-display text-2xl font-bold">Portfolio ({projects.length})</h1>
          </div>
          {!showForm&&!editProject&&(
            <button onClick={()=>setShowForm(true)} className="flex items-center gap-2 rounded-full gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-105">
              <Plus size={16}/> Add Project
            </button>
          )}
        </div>

        {(showForm&&!editProject)&&<div className="mb-6"><ProjectForm talentId={talentId} onSave={handleSaved} onCancel={()=>setShowForm(false)}/></div>}

        <div className="space-y-4">
          {projects.map(p=>(
            editProject?.id===p.id?(
              <ProjectForm key={p.id} talentId={talentId} project={p} onSave={handleSaved} onCancel={()=>setEditProject(undefined)}/>
            ):(
              <div key={p.id} className="flex gap-4 rounded-2xl border border-border-color bg-surface p-4">
                {p.cover_image&&<img src={p.cover_image} alt={p.title} className="h-20 w-28 shrink-0 rounded-xl object-cover border border-border-color"/>}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm font-bold truncate">{p.title}</p>
                  {p.category&&<p className="text-xs font-semibold text-brand-primary mt-0.5">{p.category}</p>}
                  {p.description&&<p className="text-xs text-muted mt-1 line-clamp-2">{p.description}</p>}
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                    {p.client_name&&<span>{p.client_name}</span>}
                    {p.project_date&&<span>{p.project_date}</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={()=>setEditProject(p)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border-color text-muted hover:border-brand-primary hover:text-brand-primary transition-colors"><Edit2 size={14}/></button>
                  <button onClick={()=>handleDelete(p.id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-border-color text-muted hover:border-red-400 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                </div>
              </div>
            )
          ))}
          {projects.length===0&&!showForm&&(
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-border-color p-12 text-center">
              <p className="text-sm text-muted">No portfolio projects yet.</p>
              <button onClick={()=>setShowForm(true)} className="mt-4 flex items-center gap-2 rounded-full gradient-bg px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25"><Plus size={15}/>Add First Project</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
