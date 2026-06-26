"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowUpRight, Sparkles, ArrowRight, Users, Briefcase } from "lucide-react";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("Digital Marketing");

  return (
    <section className="relative min-h-screen bg-[#f4f7f4] pt-28 pb-16 text-slate-900 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-between">
      
      {/* Background Soft Glow Effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* LEFT SIDE: Content & Interactive Search Bar */}
        <div className="lg:col-span-7 text-center lg:text-left z-10">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1.5 text-xs font-semibold shadow-sm mb-6"
          >
            <Sparkles size={14} className="text-[#a3cc00]" />
            Sri Lanka&apos;s growth platform for business &amp; talent
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1]"
          >
            Connecting <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-[#a3cc00]">
              Businesses, Talent &amp; Growth
            </span>
          </motion.h1>

          {/* Paragraph Description */}
          <motion.p 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            UpNited is the all-in-one platform where ambitious brands get
            world-class marketing, remote teams stay connected, and Sri
            Lanka&apos;s most talented people get discovered.
          </motion.p>

          {/* Interactive Search Bar (Quiety Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 max-w-2xl mx-auto lg:mx-0 p-2 rounded-2xl sm:rounded-full bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex items-center gap-2 w-full px-3 py-2 sm:py-0">
              <Search className="text-slate-400 shrink-0" size={18} />
              <input 
                type="text" 
                placeholder="What are you looking to build?..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none text-slate-800"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-2">
              <select 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full sm:w-44 bg-transparent text-sm font-semibold outline-none text-slate-700 py-2 sm:py-0 px-2"
              >
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Workspace">Workspace Portal</option>
                <option value="Talent Hub">Explore Talent Hub</option>
              </select>

              <Link 
                href={selectedService === "Talent Hub" ? "/talent-hub" : "/contact"}
                className="w-full sm:w-auto bg-black hover:bg-slate-900 text-white p-3 rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-1 font-semibold text-sm shrink-0 shadow-md"
              >
                Get Started
                <ArrowUpRight size={16} className="text-[#ccff00]" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats Integrated neatly underneath */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200/60 pt-6 max-w-md mx-auto lg:mx-0"
          >
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "500+", label: "Talent Profiles" },
              { value: "9", label: "Core Services" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="font-display text-xl sm:text-3xl font-extrabold text-slate-950">{stat.value}</p>
                <p className="mt-1 text-[10px] sm:text-xs text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>

        </div>

        {/* RIGHT SIDE: Premium 3D Vibe Bento Floating Card */}
        <div className="lg:col-span-5 relative flex justify-center items-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative w-full max-w-md"
          >
            {/* Main Interactive Floating Asset Box */}
            <div className="relative z-10 w-full aspect-square rounded-[2.5rem] bg-gradient-to-tr from-[#ccff00]/30 to-emerald-400/20 p-8 flex items-center justify-center border border-white/60 shadow-2xl backdrop-blur-sm overflow-hidden group">
              
              {/* Creative vector mockup inside green backdrop */}
              <img 
                src="https://illustrations.popsy.co/lime/creative-work.svg" 
                alt="UpNited Growth" 
                className="w-4/5 h-4/5 object-contain transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Live floating animation badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-8 right-6 bg-white/90 p-3 rounded-2xl border border-slate-100 shadow-lg backdrop-blur-md flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">Talent Hub Live 🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM BANNER: Trusted Companies Logos */}
      <div className="w-full border-t border-slate-200/60 bg-white/40 backdrop-blur-md py-6 mt-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
          <span className="text-slate-500 font-semibold tracking-wider uppercase text-xs text-center lg:text-left">
            Trusted Partner Companies:
          </span>
          
          {/* Logo container. Once you have Google Drive links, just swap out the src urls below */}
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60 hover:opacity-80 transition-opacity">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 sm:h-6 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Forbes_logo.svg" alt="Forbes" className="h-5 sm:h-6 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Deloitte_Logo.svg" alt="Deloitte" className="h-4 sm:h-5 object-contain grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>

    </section>
  );
}
