"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // Next.js Image Component එක import කරා
import { ArrowRight, Sparkles, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#f4f7f4] pt-28 pb-16 text-slate-900 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-between">
      
      {/* Background Soft Glow Effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* LEFT SIDE: Content & New Dual Buttons */}
        <div className="lg:col-span-6 text-center lg:text-left z-10">
          
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

          {/* Dual Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link
              href="/contact"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-black hover:bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all shadow-lg shadow-black/10 active:scale-95"
            >
              Learn More
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/talent-hub"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-[#a3cc00] bg-white hover:bg-[#f4f7f4] px-8 py-4 text-sm font-bold text-slate-900 transition-all active:scale-95 shadow-sm"
            >
              <Users size={16} className="text-[#a3cc00]" />
              Explore Talent Hub
            </Link>
          </motion.div>

          {/* Quick Stats */}
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

        {/* RIGHT SIDE: Your Premium 3D Generated Image (Watermark Removed) */}
        <div className="lg:col-span-6 relative flex justify-center items-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
            className="relative w-full max-w-lg"
          >
            {/* Image Container with Subtle Floating Animation */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-full h-auto drop-shadow-2xl"
            >
              <Image 
                src="/hero-3d.png" 
                alt="UpNited Multi-Platform Growth Leaders" 
                width={600} 
                height={600}
                priority
                className="w-full h-auto object-contain rounded-3xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM BANNER: Trusted Companies Logos */}
      <div className="w-full border-t border-slate-200/60 bg-white/40 backdrop-blur-md py-6 mt-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
          <span className="text-slate-500 font-semibold tracking-wider uppercase text-xs text-center lg:text-left">
            Trusted Partner Companies:
          </span>
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
