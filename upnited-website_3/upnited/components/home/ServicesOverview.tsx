"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export function ServicesOverview() {
  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything Your Brand Needs to <span className="gradient-text">Grow</span>
            </h2>
            <p className="mt-4 text-muted">
              From strategy to execution, our full suite of services covers every part of your digital presence.
            </p>
          </div>
          <Link
            href="/services"
            className="group flex items-center gap-2 rounded-full border border-border-color bg-background px-6 py-3 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary"
          >
            View All Services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            >
              <Link
                href={`/services#${service.slug}`}
                className="card-hover group flex h-full flex-col rounded-2xl border border-border-color bg-background p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <service.icon size={20} />
                </div>
                <h3 className="font-display text-base font-bold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
