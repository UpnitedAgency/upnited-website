"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

const services = [
  "Social Media Management",
  "Branding & Graphic Design",
  "Website Design & Development",
  "Meta & Google Ads",
  "Video Production",
  "Drone Photography & Videography",
  "Content Creation",
  "On-location Shoots",
  "Business Growth Consulting",
  "Not sure yet",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Connect to Supabase - insert into `contact_submissions` table
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-border-color bg-surface p-12 text-center"
      >
        <CheckCircle2 size={48} className="text-brand-secondary" />
        <h3 className="mt-4 font-display text-xl font-bold">Message Sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thanks for reaching out. Our team will get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            required
            type="text"
            placeholder="Your name"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email Address
          </label>
          <input
            id="email"
            required
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+94 7X XXX XXXX"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium">
            Service Interested In
          </label>
          <select
            id="service"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          >
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
            Tell us about your project
          </label>
          <textarea
            id="message"
            required
            rows={5}
            placeholder="What are you looking to achieve?"
            className="w-full resize-none rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70 sm:w-auto"
      >
        {loading ? "Sending..." : "Send Message"}
        <Send size={16} />
      </button>
    </form>
  );
}
