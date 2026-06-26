"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Good Heart Cafe",
    category: "Social Media & Content",
    description: "30-day launch campaign and ongoing content strategy for a charity-driven cafe in Moratuwa.",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Kard Nation",
    category: "Branding & Web Platform",
    description: "Full brand identity and platform design for Sri Lanka's digital collectible card community.",
    color: "from-indigo-500 to-violet-600",
  },
  {
    title: "Coastal Stays",
    category: "Drone & Video Production",
    description: "Cinematic aerial footage and promotional videos for a boutique hotel chain.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "FreshMart Lanka",
    category: "Meta & Google Ads",
    description: "Performance ad campaigns driving a 3.2x ROAS for an e-commerce grocery brand.",
    color: "from-emerald-500 to-teal-600",
  },
];

export function Portfolio() {
  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Work We&apos;re <span className="gradient-text">Proud Of</span>
            </h2>
            <p className="mt-4 text-muted">
              A look at recent projects across branding, marketing, and content production.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="group flex items-center gap-2 rounded-full border border-border-color bg-background px-6 py-3 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary"
          >
            View Full Portfolio
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-hover group overflow-hidden rounded-3xl border border-border-color bg-background"
            >
              <div className={`relative h-48 bg-gradient-to-br ${project.color}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ExternalLink size={28} className="text-white/40 transition-transform group-hover:scale-110" />
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
