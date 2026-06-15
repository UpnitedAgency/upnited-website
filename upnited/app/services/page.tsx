import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTA } from "@/components/home/CTA";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore UpNited's full range of digital marketing services — social media, branding, web development, ads, video production, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title={
          <>
            Services That Drive <span className="gradient-text">Real Growth</span>
          </>
        }
        description="From strategy to execution, our team delivers measurable results across every channel that matters to your business."
      />

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {services.map((service, i) => (
              <div
                key={service.slug}
                id={service.slug}
                className="card-hover grid grid-cols-1 gap-8 rounded-3xl border border-border-color bg-surface p-6 sm:p-10 lg:grid-cols-3"
              >
                <div className="lg:col-span-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl gradient-bg text-white">
                    <service.icon size={24} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Service {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
                  <Link
                    href="/contact"
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary"
                  >
                    Get a Quote
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="lg:col-span-2">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                    What&apos;s included
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 rounded-xl bg-background p-4 text-sm">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-secondary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
