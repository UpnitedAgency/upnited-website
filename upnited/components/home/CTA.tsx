"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export function CTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl gradient-bg px-6 py-16 text-center sm:px-12 sm:py-24"
      >
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)",
            }}
          />
        </div>
        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ready to Grow Your Brand?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            Let&apos;s talk about your goals. Book a free consultation and discover how UpNited can help your business reach new heights.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-primary shadow-xl transition-transform hover:scale-105 sm:w-auto"
            >
              Get Free Consultation
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact#booking"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:w-auto"
            >
              <Calendar size={18} />
              Book an Appointment
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
