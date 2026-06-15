"use client";

import { motion } from "framer-motion";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-primary/15 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          {eyebrow && (
            <span className="mb-4 inline-flex items-center rounded-full border border-border-color bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          {description && <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>}
        </motion.div>
      </div>
    </section>
  );
}
