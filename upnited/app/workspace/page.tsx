"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { UserPlus, Key, Mail, Lock, AlertCircle, User, Phone, Calendar, Briefcase } from "lucide-react";

export default function WorkspacePage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Custom Fields
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [position, setPosition] = useState("Designer");

  const [isSignUp, setIsSignUp] = useState(false);
  const [authMessage, setAuthMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);

    if (isSignUp) {
      if (password !== confirmPassword) {
        setAuthMessage({ type: "error", text: "Passwords do not match!" });
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            mobile: mobileNumber,
            birthday: birthday,
            position: position
          }
        }
      });
      
      if (error) {
        setAuthMessage({ type: "error", text: error.message });
      } else if (data?.user) {
        setAuthMessage({ 
          type: "success", 
          text: "Registration initiated! Please check your email inbox and click the verification link to activate your profile." 
        });
        setFullName("");
        setMobileNumber("");
        setBirthday("");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthMessage({ type: "error", text: error.message });
      } else if (data?.user) {
        setUser(data.user);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center text-slate-900 font-bold">
        Loading UpNited Workspace...
      </div>
    );
  }

  return (
    <section className="bg-[#f4f7f4] min-h-screen py-24 px-4 text-slate-900 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 h-[5px] w-full bg-[#1e4e5e]" />

        {!user ? (
          <div>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#1e4e5e] text-white font-black text-2xl flex items-center justify-center rounded-2xl mx-auto shadow-md">
                U
              </div>
              <h2 className="text-2xl font-extrabold text-[#1e4e5e] mt-4 tracking-tight">
                {isSignUp ? "Register Profile" : "UpNited Workspace"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isSignUp ? "Provide your details to register as a team member" : "Sign in with your employee credentials"}
              </p>
            </div>

            {authMessage && (
              <div className={`p-4 rounded-xl mb-6 text-xs font-semibold flex items-start gap-2.5 leading-relaxed ${
                authMessage.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
              }`}>
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{authMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleAuth} className="flex flex-col gap-3.5">
              {isSignUp && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#1e4e5e]"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="tel"
                        placeholder="0771234567"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#1e4e5e]"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Birthday</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#1e4e5e]"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Company Position</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <select
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#1e4e5e] appearance-none"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                      >
                        <option value="Designer">Designer</option>
                        <option value="Video Editor">Video Editor</option>
                        <option value="Sales Executive">Sales Executive</option>
                        <option value="Admin">Admin</option>
                        <option value="HR">HR</option>
                        <option value="Stuff">Stuff</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="email"
                    placeholder="employee@upnited.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#1e4e5e]"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#1e4e5e]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#1e4e5e]"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#1e4e5e] hover:bg-[#153743] text-white rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 mt-2 transition-all active:scale-95 shadow-md"
              >
                {isSignUp ? <UserPlus size={16} /> : <Key size={16} />}
                {isSignUp ? "Request Verification & Register" : "Sign In"}
              </button>
            </form>

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
          /* Dashboard */
          <div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Workspace Active</span>
                <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{user.email}</p>
              </div>
              <button
                onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
                className="p-2.5 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
              >
                Sign Out
              </button>
            </div>
            <p className="text-sm font-semibold text-center text-emerald-600">Successfully Verified & Logged In! 🚀</p>
            <p className="text-xs text-center text-slate-500 mt-2">දැන් ඔයාගේ ඊළඟ Dashboard ප්ලෑන් එක කියන්න මචං!</p>
          </div>
        )}
      </div>
    </section>
  );
}
