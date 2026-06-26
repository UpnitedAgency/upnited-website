"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { CheckCircle2, Circle, LogOut, Plus, ShieldCheck, UserPlus, Key, Mail, Lock, AlertCircle } from "lucide-react";

export default function WorkspacePage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Sign In සහ Sign Up මාරු කරන්න
  const [authMessage, setAuthMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // Tasks Management
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Current Session එක චෙක් කිරීම
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchTasks(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Auth Change Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchTasks(session.user.id);
      } else {
        setUser(null);
        setTasks([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTasks = async (userId: string) => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (data) setTasks(data);
  };

  // Auth Submit Actions (Login / Register)
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);

    if (!email.trim() || !password.trim()) {
      setAuthMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    if (isSignUp) {
      // 1. අලුත් Employee කෙනෙක් Register කිරීම (Sign Up)
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        setAuthMessage({ type: "error", text: error.message });
      } else if (data?.user) {
        setAuthMessage({ 
          type: "success", 
          text: "Registration successful! If required, please confirm via email link, or use the form below to Sign In now." 
        });
        setIsSignUp(false); // එකවුන්ට් එක හැදුනට පස්සේ Sign In පේජ් එකට හරවනවා
      }
    } else {
      // 2. දැනට ඉන්න Employee කෙනෙක් ලොග් වීම (Sign In)
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setAuthMessage({ type: "error", text: error.message });
      } else if (data?.user) {
        setUser(data.user);
        fetchTasks(data.user.id);
      }
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !user) return;

    const { data } = await supabase
      .from("tasks")
      .insert([{ title: newTask, user_id: user.id }])
      .select();

    if (data) {
      setTasks([...tasks, data[0]]);
      setNewTask("");
    }
  };

  const toggleTask = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !currentStatus })
      .eq("id", id);

    if (!error) {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center text-slate-900 font-bold">
        Connecting to UpNited Workspace...
      </div>
    );
  }

  return (
    <section className="bg-[#f4f7f4] min-h-screen py-24 px-4 text-slate-900 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-10 shadow-xl relative overflow-hidden">
        
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 h-[5px] w-full bg-[#1e4e5e]" />

        {!user ? (
          <div>
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-[#1e4e5e] text-white font-black text-2xl flex items-center justify-center rounded-2xl mx-auto shadow-md">
                U
              </div>
              <h2 className="text-2xl font-extrabold text-[#1e4e5e] mt-4 tracking-tight">
                {isSignUp ? "Register Employee Profile" : "UpNited Workspace"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isSignUp ? "Create your official credential details" : "Sign in with your employee credentials"}
              </p>
            </div>

            {/* Error / Success Notifications */}
            {authMessage && (
              <div className={`p-4 rounded-xl mb-6 text-xs font-semibold flex items-start gap-2.5 leading-relaxed ${
                authMessage.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
              }`}>
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{authMessage.text}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="email"
                    placeholder="employee@upnited.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#1e4e5e]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#1e4e5e]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1e4e5e] hover:bg-[#153743] text-white rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 mt-2 transition-all active:scale-95 shadow-md"
              >
                {isSignUp ? <UserPlus size={16} /> : <Key size={16} />}
                {isSignUp ? "Create Profile & Register" : "Sign In"}
              </button>
            </form>

            {/* Toggle Button Between Sign In & Sign Up */}
            <div className="text-center mt-6 border-t border-slate-100 pt-4">
              <button
                onClick={() => { setIsSignUp(!isSignUp); setAuthMessage(null); }}
                className="text-xs font-bold text-[#1e4e5e] hover:underline"
              >
                {isSignUp ? "Already have an account? Sign In" : "New Employee? Register Profile here"}
              </button>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard Layout */
          <div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Workspace Active</span>
                <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{user.email}</p>
              </div>
              <button
                onClick={() => supabase.auth.signOut()}
                className="p-2.5 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>

            <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2 mb-4">
              <ShieldCheck className="text-emerald-600" size={20} />
              Daily Operational Tasks
            </h3>

            <form onSubmit={addTask} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Assign or write a daily task..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1e4e5e]"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black text-white p-3 rounded-xl hover:bg-slate-900 transition-all active:scale-95"
              >
                <Plus size={18} />
              </button>
            </form>

            <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
              {tasks.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-6">All operational tasks are clear for now! 🙌</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id, task.completed)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 cursor-pointer transition-all ${
                      task.completed ? "bg-slate-50 opacity-60 line-through text-slate-400" : "bg-white hover:border-[#1e4e5e]/50"
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    ) : (
                      <Circle size={18} className="text-slate-300 shrink-0" />
                    )}
                    <span className="text-xs font-medium">{task.title}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
