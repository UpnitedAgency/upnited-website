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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);

    // 1. Oyage Web3Forms Access Key eka
    formData.append("access_key", "c8105b3b-3479-4a0d-9ca4-3e0b692d00b6");

    // 2. Email eka inbox ekata eddi watena Subject eka (Optional)
    formData.append("subject", "New Lead from Website Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        console.error("Web3Forms Error:", data);
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setErrorMessage("Network error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
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
            name="name"
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
            name="email"
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
            name="phone"
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
            name="service"
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
            name="message"
            required
            rows={5}
            placeholder="What are you looking to achieve?"
            className="w-full resize-none rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
      </div>

      {errorMessage && (
        <p className="mt-4 text-sm font-medium text-red-500">{errorMessage}</p>
      )}

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
