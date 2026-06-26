"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Megaphone, Users, Sparkles, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Full-service marketing agency offering social media management, branding, web design, ads, and content creation.",
    href: "/services",
    cta: "Explore Services",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    icon: Users,
    title: "UpNited Workspace",
    description:
      "Secure employee portal with attendance tracking, task management, daily reports, and performance dashboards.",
    href: "/workspace",
    cta: "Employee Portal",
    accent: "from-cyan-500 to-teal-500",
  },
  {
    icon: Sparkles,
    title: "Talent Hub",
    description:
      "Free directory connecting businesses with Sri Lanka's best influencers, creatives, and skilled professionals.",
    href: "/talent-hub",
    cta: "Discover Talent",
    accent: "from-orange-500 to-amber-500",
  },
];

export function FeatureCards() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            One Platform, <span className="gradient-text">Three Solutions</span>
          </h2>
          <p className="mt-4 text-muted">
            Whatever you need — marketing, a team workspace, or top talent — UpNited brings it all together.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={feature.href}
                className="card-hover group flex h-full flex-col rounded-3xl border border-border-color bg-surface p-8"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg`}
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{feature.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
                  {feature.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
