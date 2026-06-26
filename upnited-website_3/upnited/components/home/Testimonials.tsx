"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Dilshan Wickramasinghe",
    role: "Owner, Good Heart Cafe",
    quote:
      "UpNited transformed our social media completely. Our brunch launch campaign brought in more new customers than we ever expected in just 30 days.",
    rating: 5,
  },
  {
    name: "Anjali Rathnayake",
    role: "Founder, Coastal Stays",
    quote:
      "The drone footage and video content they produced for our hotel looks incredibly professional. Bookings increased noticeably after the campaign went live.",
    rating: 5,
  },
  {
    name: "Suresh Kumara",
    role: "Director, FreshMart Lanka",
    quote:
      "Their ad management team is sharp, data-driven, and always transparent with reporting. Best ROI we've seen from any agency we've worked with.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Trusted by <span className="gradient-text">Growing Businesses</span>
          </h2>
          <p className="mt-4 text-muted">
            Don&apos;t just take our word for it — here&apos;s what our clients have to say.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-hover flex flex-col rounded-3xl border border-border-color bg-surface p-6"
            >
              <Quote size={28} className="text-brand-primary/30" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} className="fill-brand-accent text-brand-accent" />
                ))}
              </div>
              <div className="mt-3 border-t border-border-color pt-3">
                <p className="font-display text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
