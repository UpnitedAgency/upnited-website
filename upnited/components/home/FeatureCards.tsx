"use client";

import { motion } from "framer-motion";
import { Zap, Shield, TrendingUp, Sparkles } from "lucide-react";

export function FeatureCards() {
  return (
    <section className="bg-[#f4f7f4] py-20 text-slate-900 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Area */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-[#ccff00] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black">
            Features
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Achieve <span className="text-[#a3cc00]">Maximum Growth</span> with UpNited
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          {/* Card 1: Large Card (Spans 2 columns on desktop) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative col-span-1 md:col-span-2 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ccff00]/20 text-black">
              <TrendingUp size={24} />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold">Data-Driven Strategy</h3>
            <p className="mt-2 max-w-md text-sm text-slate-600 leading-relaxed">
              We analyze your market and competitors to build high-converting marketing frameworks that scale your business effortlessly.
            </p>
            {/* Soft decorative glow background */}
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#ccff00]/10 blur-2xl" />
          </motion.div>

          {/* Card 2: Small Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-slate-200 bg-[#ccff00] p-8 shadow-sm transition-all text-black"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-[#ccff00]">
              <Zap size={24} />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold">Lightning Fast</h3>
            <p className="mt-2 text-sm text-black/80 leading-relaxed">
              Fast communication, quick campaign setups, and rapid delivery on all creative assets.
            </p>
          </motion.div>

          {/* Card 3: Small Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-3xl border border-slate-200 bg-black p-8 shadow-sm transition-all text-white"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ccff00] text-black">
              <Sparkles size={24} />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold">Premium Content</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              High-quality video productions, commercial-grade drone shots, and stunning graphics.
            </p>
          </motion.div>

          {/* Card 4: Large Card (Spans 2 columns on desktop) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative col-span-1 md:col-span-2 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ccff00]/20 text-black">
              <Shield size={24} />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold">Guaranteed Business Growth</h3>
            <p className="mt-2 max-w-md text-sm text-slate-600 leading-relaxed">
              We don't just post content; we optimize your full funnel to capture leads and turn them into paying customers.
            </p>
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#ccff00]/10 blur-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
