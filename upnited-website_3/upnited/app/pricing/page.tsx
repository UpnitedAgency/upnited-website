import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing packages for social media management, branding, and digital marketing services in Sri Lanka.",
};

const plans = [
  {
    name: "Starter",
    price: "LKR 25,000",
    period: "/month",
    description: "Perfect for small businesses establishing their social presence.",
    features: [
      "2 social media platforms",
      "12 posts per month",
      "Basic content calendar",
      "Monthly performance report",
      "Community management (business hours)",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "LKR 55,000",
    period: "/month",
    description: "For brands ready to scale their reach and engagement.",
    features: [
      "3 social media platforms",
      "24 posts per month",
      "Content calendar + strategy",
      "Bi-weekly performance reports",
      "Meta Ads management (ad spend separate)",
      "1 video shoot per month",
      "Priority community management",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "Custom",
    period: "",
    description: "Full-service partnership for established businesses.",
    features: [
      "Unlimited platforms",
      "Daily content + reels",
      "Dedicated account manager",
      "Weekly reporting & strategy calls",
      "Meta & Google Ads management",
      "Monthly on-location shoots",
      "Drone photography & videography",
      "Website maintenance included",
    ],
    highlight: false,
  },
];

const addOns = [
  { name: "Branding & Logo Package", price: "From LKR 35,000" },
  { name: "Website Design & Development", price: "From LKR 75,000" },
  { name: "Single Video Production", price: "From LKR 20,000" },
  { name: "Drone Shoot (half-day)", price: "From LKR 18,000" },
  { name: "On-location Photo Shoot", price: "From LKR 15,000" },
  { name: "Business Growth Consulting", price: "From LKR 10,000/session" },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Plans Built for <span className="gradient-text">Every Stage</span>
          </>
        }
        description="Transparent packages with no hidden fees. Need something custom? We'll build a plan around your goals and budget."
      />

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  plan.highlight
                    ? "border-brand-primary bg-surface shadow-2xl shadow-brand-primary/20 lg:-translate-y-4"
                    : "border-border-color bg-surface card-hover"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-8 flex items-center gap-1 rounded-full gradient-bg px-3 py-1 text-xs font-semibold text-white">
                    <Sparkles size={12} />
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-extrabold">{plan.price}</span>
                  <span className="text-sm text-muted">{plan.period}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-105 ${
                    plan.highlight
                      ? "gradient-bg text-white shadow-lg shadow-brand-primary/25"
                      : "border border-border-color hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Add-on Services</h2>
            <p className="mt-2 text-sm text-muted">Combine these with any package or purchase standalone.</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {addOns.map((addon) => (
                <div
                  key={addon.name}
                  className="flex items-center justify-between rounded-2xl border border-border-color bg-surface p-5"
                >
                  <span className="text-sm font-medium">{addon.name}</span>
                  <span className="text-sm font-semibold text-brand-primary">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
