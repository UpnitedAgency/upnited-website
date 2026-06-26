"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { CheckCircle2, Circle, LogOut, Plus, ShieldCheck, UserPlus, Key, Mail, Lock, AlertCircle, User, Phone, Calendar, Briefcase } from "lucide-react";

export default function WorkspacePage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [position, setPosition] = useState("Designer");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authMessage, setAuthMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) fetchTasks(session.user.id);
      setLoading(false);
    });
  }, []);

  const fetchTasks = async (userId: string) => {
    const { data } = await supabase.from("tasks").select("*").eq("user_id", userId);
    if (data) setTasks(data);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);

    if (isSignUp) {
      if (password !== confirmPassword) {
        setAuthMessage({ type: "error", text: "Passwords do not match!" });
        return;
      }
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: fullName, mobile: mobileNumber, birthday, position } }
      });
      if (error) setAuthMessage({ type: "error", text: error.message });
      else setAuthMessage({ type: "success", text: "Check your email to verify!" });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthMessage({ type: "error", text: error.message });
      else window.location.reload();
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <section className="min-h-screen py-20 flex justify-center items-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border">
        {!user ? (
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center mb-4">{isSignUp ? "Register" : "Sign In"}</h2>
            {authMessage && <p className="text-xs text-red-500">{authMessage.text}</p>}
            
            {isSignUp && (
              <>
                <input className="w-full border p-3 rounded-xl" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} required />
                <input className="w-full border p-3 rounded-xl" placeholder="Mobile" onChange={(e) => setMobileNumber(e.target.value)} required />
                <input type="date" className="w-full border p-3 rounded-xl" onChange={(e) => setBirthday(e.target.value)} required />
                <select className="w-full border p-3 rounded-xl" onChange={(e) => setPosition(e.target.value)}>
                  {["Designer", "Video Editor", "Sales Executive", "Admin", "HR", "Stuff"].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </>
            )}
            <input type="email" className="w-full border p-3 rounded-xl" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" className="w-full border p-3 rounded-xl" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            {isSignUp && <input type="password" className="w-full border p-3 rounded-xl" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />}
            
            <button className="w-full bg-black text-white p-3 rounded-xl font-bold">{isSignUp ? "Register" : "Sign In"}</button>
            <button type="button" className="text-xs underline" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Already have account? Sign In" : "New Employee? Register here"}
            </button>
          </form>
        ) : (
          <div>
            <h2 className="font-bold text-lg">Welcome!</h2>
            <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-red-500 text-sm">Sign Out</button>
            {/* Dashboard content */}
          </div>
        )}
      </div>
    </section>
  );
}
