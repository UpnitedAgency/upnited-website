"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, Sparkles } from "lucide-react";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("Social Media");

  return (
    <section className="relative min-h-screen bg-[#f4f7f4] pt-28 pb-16 text-slate-900 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-between">
      
      {/* Background soft glow updates */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left Side: Content & Interactive Search Bar */}
        <div className="lg:col-span-7 text-center lg:text-left z-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1.5 text-xs font-semibold shadow-sm mb-6"
          >
            <Sparkles size={14} className="text-[#a3cc00]" />
            Modernizing Next-Gen Marketing Experience
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1]"
          >
            Modernizing the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-[#a3cc00]">
              Brand Experience
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0"
          >
            Take control of your digital presence with tools and strategies designed to simplify, streamline, and personalize your business growth.
          </motion.p>

          {/* Interactive Search Bar inspired by Quiety */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-2xl mx-auto lg:mx-0 p-2 rounded-2xl sm:rounded-full bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex items-center gap-2 w-full px-3 py-2 sm:py-0">
              <Search className="text-slate-400 shrink-0" size={18} />
              <input 
                type="text" 
                placeholder="etc: Manage Social Media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none text-slate-800"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-2">
              <select 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full sm:w-40 bg-transparent text-sm font-semibold outline-none text-slate-700 py-2 sm:py-0 px-2"
              >
                <option value="Social Media">Social Media</option>
                <option value="Web Dev">Web Dev</option>
                <option value="Branding">Branding</option>
                <option value="Video Production">Video Prod.</option>
              </select>

              <a 
                href="#booking"
                className="w-full sm:w-auto bg-black hover:bg-slate-900 text-white p-3 rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-1 font-semibold text-sm shrink-0 shadow-md shadow-black/10"
              >
                Get Started
                <ArrowUpRight size={16} className="text-[#ccff00]" />
              </a>
            </div>
          </motion.div>

          {/* Popular Tag Suggestions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2 items-center text-xs text-slate-500"
          >
            <span className="font-medium">Popular Needs:</span>
            {["Meta Ads", "Content Creation", "Website Design", "SEO"].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="hover:text-[#a3cc00] underline transition-colors"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Visual Graphic & Micro-interactions */}
        <div className="lg:col-span-5 relative flex justify-center items-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative w-full max-w-md"
          >
            {/* Main Interactive Floating Card Asset */}
            <div className="relative z-10 w-full aspect-square rounded-[2.5rem] bg-gradient-to-tr from-[#ccff00]/30 to-emerald-400/20 p-8 flex items-center justify-center border border-white/60 shadow-2xl backdrop-blur-sm overflow-hidden group">
              <img 
                src="https://illustrations.popsy.co/lime/creative-work.svg" 
                alt="UpNited Creative Agency" 
                className="w-4/5 h-4/5 object-contain transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Floating Stat Widget */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-8 right-4 bg-white/90 p-3 rounded-2xl border border-slate-100 shadow-lg backdrop-blur-md flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">Growth: +185%</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Brand Bar / Trust Banner */}
      <div className="w-full border-t border-slate-200/60 bg-white/40 backdrop-blur-md py-6 mt-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center lg:justify-between items-center gap-6 text-sm text-slate-400 font-medium">
          <span className="text-slate-500 font-semibold tracking-wider uppercase text-xs">Trusted Partner Companies:</span>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 text-lg sm:text-xl font-bold tracking-tight text-slate-400">
            <span className="hover:text-slate-800 transition-colors cursor-default">VISA</span>
            <span className="hover:text-slate-800 transition-colors cursor-default">PLAID</span>
            <span className="hover:text-slate-800 transition-colors cursor-default">Forbes</span>
            <span className="hover:text-slate-800 transition-colors cursor-default">Deloitte.</span>
          </div>
        </div>
      </div>

    </section>
  );
}
