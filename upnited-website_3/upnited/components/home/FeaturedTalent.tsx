"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getFeaturedTalent } from "@/lib/talent";
import { TalentCard } from "@/components/shared/TalentCard";

export function FeaturedTalent() {
  const talent = getFeaturedTalent();

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Featured <span className="gradient-text">Talent</span>
            </h2>
            <p className="mt-4 text-muted">
              Meet some of the standout creators and professionals on UpNited Talent Hub.
            </p>
          </div>
          <Link
            href="/talent-hub"
            className="group flex items-center gap-2 rounded-full border border-border-color bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary"
          >
            Browse Talent Hub
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {talent.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <TalentCard talent={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
