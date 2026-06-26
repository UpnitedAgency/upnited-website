"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Share2, 
  Palette, 
  Code, 
  Megaphone, 
  Video, 
  Plane, 
  ArrowUpRight 
} from "lucide-react";

const services = [
  { icon: Share2, title: "Social Media Management", desc: "Strategy, content, and growth across every platform." },
  { icon: Palette, title: "Branding & Graphic Design", desc: "Identities that make brands unforgettable." },
  { icon: Code, title: "Website Design & Development", desc: "Fast, modern websites built to convert." },
  { icon: Megaphone, title: "Meta & Google Ads", desc: "Paid campaigns that drive real ROI." },
  { icon: Video, title: "Video Production", desc: "Scroll-stopping video content." },
  { icon: Plane, title: "Drone Photography & Videography", desc: "Cinematic aerial shots for any project." },
];

export function ServicesOverview() {
  return (
    <section className="bg-[#f4f7f4] py-24 text-slate-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full">
      
      {/* Decorative Blur - Overflow බය නැති කරා */}
      <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl w-full overflow-hidden">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <span className="rounded-full bg-[#ccff00] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black">
              Our Services
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
              Everything Your Brand <br className="hidden sm:inline" />
              Needs to <span className="text-[#a3cc00]">Grow</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-xl">
              From strategy to execution, our full suite of services covers every part of your digital presence.
            </p>
          </div>

          <div className="flex justify-center md:justify-end shrink-0">
            <Link
              href="/services"
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white hover:border-[#a3cc00] px-6 py-3 text-sm font-bold shadow-sm transition-all active:scale-95"
            >
              View All Services
              <ArrowUpRight size={16} className="text-[#a3cc00]" />
            </Link>
          </div>
        </div>

        {/* Bento Grid - Mobile responsive touch fixed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }} // මොබයිල් එකේ Touch කරද්දී වැඩ කරන ඉෆෙක්ට් එක
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all hover:border-[#a3cc00]/50"
              >
                <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#ccff00] transition-all duration-300 group-hover:w-full" />

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-[#ccff00] group-hover:text-black">
                  <IconComponent size={22} />
                </div>

                <h3 className="font-display text-lg font-bold text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {service.desc}
                </p>

                <div className="absolute bottom-6 right-6 opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight size={18} className="text-[#a3cc00]" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
