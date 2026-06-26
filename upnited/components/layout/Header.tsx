"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
    { name: "Talent Hub", href: "/talent-hub" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-[#1e4e5e] text-[#dffe00] font-black text-xl flex items-center justify-center rounded-xl shadow-sm group-hover:scale-105 transition-transform">
            U
          </div>
          <span className="text-xl font-black text-[#1e4e5e] tracking-tight">
            UpNited
          </span>
        </Link>

        {/* APPLE-STYLE LIQUID NAVIGATION */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/60 p-1.5 rounded-full relative">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300 rounded-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Liquid Hover Backing */}
              {hoveredIndex === index && (
                <motion.span
                  layoutId="header-liquid"
                  className="absolute inset-0 bg-[#dffe00] rounded-full -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* CUSTOM THEME GET STARTED BUTTON */}
        <div className="flex items-center gap-4">
          <Link href="/workspace">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(30, 78, 94, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#1e4e5e] text-white hover:bg-[#153743] px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors border border-transparent hover:border-[#dffe00]/30"
            >
              Get Started
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </motion.button>
          </Link>
        </div>

      </div>
    </header>
  );
}
