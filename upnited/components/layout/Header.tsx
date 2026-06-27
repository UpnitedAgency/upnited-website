"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f4f7f4]/80 backdrop-blur-md border-b border-slate-200/50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-display text-2xl font-black tracking-tight text-slate-950">
              UpNited<span className="text-[#a3cc00]">.</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/workspace/login" 
              className="text-sm font-semibold text-slate-600 hover:text-slate-950 px-4 py-2"
            >
              Client Portal
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-black hover:bg-slate-900 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight size={14} className="text-[#ccff00]" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 shadow-lg absolute w-full left-0 animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-bold text-slate-800 hover:bg-[#f4f7f4] hover:text-slate-950 transition-all"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="/workspace/login"
              onClick={() => setIsOpen(false)}
              className="block text-center rounded-xl px-4 py-3 text-base font-bold text-slate-600 hover:bg-slate-50"
            >
              Client Portal
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-center rounded-xl bg-black text-white px-4 py-3.5 text-sm font-bold shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
