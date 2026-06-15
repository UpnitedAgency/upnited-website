"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Upload } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { talentCategories } from "@/lib/talent";

export default function TalentSubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Connect to Supabase - insert into `talent_submissions` table (status: pending, awaiting admin approval)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <>
      <PageHeader
        eyebrow="Join Talent Hub"
        title={
          <>
            Get <span className="gradient-text">Discovered</span> — For Free
          </>
        }
        description="Submit your profile and our team will review it for inclusion in the UpNited Talent Hub directory."
      />

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-border-color bg-surface p-12 text-center"
            >
              <CheckCircle2 size={48} className="text-brand-secondary" />
              <h3 className="mt-4 font-display text-xl font-bold">Profile Submitted!</h3>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Thanks for joining UpNited Talent Hub. Our team will review your profile and publish it within
                2-3 business days.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Full Name / Business Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Category</label>
                  <select
                    required
                    className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
                  >
                    <option value="">Select a category</option>
                    {talentCategories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Phone / WhatsApp</label>
                  <input
                    required
                    type="tel"
                    placeholder="+94 7X XXX XXXX"
                    className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Location</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Colombo"
                    className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Instagram / TikTok Handle</label>
                  <input
                    type="text"
                    placeholder="@yourusername"
                    className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">Short Bio</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell businesses what you do best..."
                    className="w-full resize-none rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">Portfolio / Sample Work (link)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">Profile Photo</label>
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-border-color bg-background px-4 py-8 text-center">
                    <div>
                      <Upload size={24} className="mx-auto text-muted" />
                      <p className="mt-2 text-sm text-muted">Click to upload or drag and drop</p>
                      <p className="mt-1 text-xs text-muted">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted">
                Submissions are reviewed by our admin team before being published. You&apos;ll be notified by email once approved.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70 sm:w-auto"
              >
                {loading ? "Submitting..." : "Submit Profile"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
