"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { CheckCircle2, Circle, LogOut, Plus, ShieldCheck, UserPlus, Key, Mail, Lock, AlertCircle } from "lucide-react";

export default function EmployeePage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authMessage, setAuthMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // Tasks Management
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Current Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      // මෙතනදී යූසර් ලොග් වෙලා හිටියත්, එයාගේ Email එක Verify වෙලාද කියලා බලනවා
      if (session?.user && session.user.email_confirmed_at) {
        setUser(session.user);
        fetchTasks(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Auth Change Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && session.user.email_confirmed_at) {
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

  // Auth Action Handler
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);

    if (isSignUp) {
      // Sign Up Process
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        setAuthMessage({ type: "error", text: error.message });
      } else if (data?.user && !data.user.email_confirmed_at) {
        setAuthMessage({ 
          type: "success", 
          text: "Registration successful! Please check your email inbox and click the verification link to activate your account." 
        });
        setEmail("");
        setPassword("");
        setIsSignUp(false); // කෙලින්ම Sign In එකට හරවනවා
      }
    } else {
      // Sign In Process
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setAuthMessage({ type: "error", text: error.message });
        return;
      }

      // වැදගත්ම හරිය: යූසර් පාස්වර්ඩ් හරි වුණත්, ඊමේල් එක verify කරලා නැත්නම් ලොග් වෙන්න දෙන්නෑ!
      if (data?.user && !data.user.email_confirmed_at) {
        setAuthMessage({ 
          type: "error", 
          text: "Your email is not verified yet. Please check your inbox and confirm your email first." 
        });
        await supabase.auth.signOut(); // සෙෂන් එක ක්ලියර් කරනවා
        setUser(null);
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
    return <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center text-slate-900 font-bold">Verifying Session...</div>;
  }

  return (
    <section className="bg-[#f4f7f4] min-h-screen py-24 px-4 text-slate-900 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[5px] w-full bg-gradient-to-r from-[#a3cc00] to-black" />

        {!user ? (
          <div>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-slate-900 text-white font-black text-2xl flex items-center justify-center rounded-2xl mx-auto shadow-md">
                U
              </div>
              <h2 className="text-2xl font-extrabold text-slate-950 mt-4 tracking-tight">
                {isSignUp ? "Create Secured Account" : "UpNited Workspace"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">Verified personnel access portal only</p>
            </div>

            {/* Notification Messages (Success / Error Alert) */}
            {authMessage && (
              <div className={`p-4 rounded-xl mb-6 text-xs font-semibold flex items-start gap-2.5 leading-relaxed ${
                authMessage.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
              }`}>
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{authMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="email"
                    placeholder="employee@upnited.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#a3cc00]"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#a3cc00]"
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
                {isSignUp ? "Register & Verify" : "Sign In →]"}
              </button>
            </form>

            <div className="text-center mt-6 border-t border-slate-100 pt-4">
              <button
                onClick={() => { setIsSignUp(!isSignUp); setAuthMessage(null); }}
                className="text-xs font-bold text-[#a3cc00] hover:underline"
              >
                {isSignUp ? "Already registered? Sign In" : "New Employee? Register Here"}
              </button>
            </div>
          </div>
        ) : (
          /* Dashboard Layout */
          <div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Workspace Connected</span>
                <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{user.email}</p>
              </div>
              <button
                onClick={() => supabase.auth.signOut()}
                className="p-2.5 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
              >
                <LogOut size={16} />
              </button>
            </div>

            <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2 mb-4">
              <ShieldCheck className="text-[#a3cc00]" size={20} />
              Daily Operational Tasks
            </h3>

            <form onSubmit={addTask} className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Assign or write a daily task..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#a3cc00]"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button type="submit" className="bg-black text-white p-3 rounded-xl hover:bg-slate-900 transition-all">
                <Plus size={18} />
              </button>
            </form>

            <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-1">
              {tasks.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-6">All clear! No tasks active right now. 🙌</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id, task.completed)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 cursor-pointer transition-all ${
                      task.completed ? "bg-slate-50 opacity-60 line-through text-slate-400" : "bg-white hover:border-[#a3cc00]/50"
                    }`}
                  >
                    {task.completed ? <CheckCircle2 size={18} className="text-[#a3cc00]" /> : <Circle size={18} className="text-slate-300" />}
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
