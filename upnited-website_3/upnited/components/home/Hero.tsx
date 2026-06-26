"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Briefcase } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-primary/20 blur-3xl animate-glow" />
        <div className="absolute top-40 right-0 h-[24rem] w-[24rem] rounded-full bg-brand-secondary/20 blur-3xl animate-glow" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-color bg-surface px-4 py-1.5 text-sm font-medium text-foreground/70"
          >
            <Sparkles size={14} className="text-brand-primary" />
            Creative growth partner for ambitious brands
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl"
          >
            Marketing That{" "}
            <span className="gradient-text">Moves Brands</span>{" "}
            <span className="accent-text">Forward</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg"
          >
            We help businesses grow through branding, digital marketing,
            content creation, and innovative online experiences — built for
            Sri Lanka and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-primary/30 transition-transform hover:scale-105 sm:w-auto"
            >
              Start Your Project
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border-color bg-surface px-8 py-3.5 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary sm:w-auto"
            >
              <Users size={18} />
              View Our Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-4 sm:gap-8"
          >
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "500+", label: "Talent Profiles" },
              { value: "9", label: "Core Services" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-extrabold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-3xl border border-border-color bg-surface p-1 shadow-2xl">
          <div className="rounded-[1.3rem] bg-gradient-to-br from-brand-primary/10 via-surface to-brand-secondary/10 p-8 sm:p-14">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { icon: Briefcase, title: "Digital Marketing", desc: "Strategy-driven growth for your brand" },
                { icon: Users, title: "Workspace", desc: "Secure portal for our remote team" },
                { icon: Sparkles, title: "Talent Hub", desc: "Discover Sri Lanka's creative talent" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="animate-float rounded-2xl border border-border-color bg-surface-2 p-5 text-left"
                  style={{ animationDelay: `${i * 0.7}s` }}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl gradient-bg text-white">
                    <item.icon size={20} />
                  </div>
                  <p className="font-display text-sm font-bold">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
