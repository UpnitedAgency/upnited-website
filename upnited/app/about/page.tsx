import type { Metadata } from "next";
import { Target, Heart, Rocket, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about UpNited Agency's mission to connect businesses, talent, and remote teams across Sri Lanka.",
};

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every campaign is built around measurable outcomes — leads, sales, and growth, not just likes.",
  },
  {
    icon: Heart,
    title: "Community First",
    description: "We're proud to support Sri Lankan businesses and creatives, helping local talent get discovered.",
  },
  {
    icon: Rocket,
    title: "Always Innovating",
    description: "From AI-powered tools to drone production, we bring the latest techniques to every project.",
  },
  {
    icon: Users,
    title: "True Partnership",
    description: "We work as an extension of your team — transparent, responsive, and invested in your success.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About UpNited"
        title={
          <>
            Building Sri Lanka&apos;s <span className="gradient-text">Growth Platform</span>
          </>
        }
        description="UpNited started with a simple idea: businesses, talented people, and remote teams all do better when they're connected through one platform."
      />

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border-color bg-surface p-8 sm:p-12">
            <h2 className="font-display text-2xl font-bold">Our Story</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              UpNited began as a small social media marketing agency working with local businesses
              across Sri Lanka. As we grew, we noticed two things: businesses needed reliable, organized
              teams to execute their marketing, and Sri Lanka&apos;s creative talent — photographers,
              designers, presenters, and more — needed a place to be discovered.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              That&apos;s why we built UpNited as more than an agency. Our{" "}
              <strong className="text-foreground">Digital Marketing</strong> division delivers
              full-service campaigns for brands. Our{" "}
              <strong className="text-foreground">Workspace</strong> keeps our remote team organized,
              accountable, and productive. And our{" "}
              <strong className="text-foreground">Talent Hub</strong> connects businesses directly with
              the people who can bring their projects to life — for free.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Today, we&apos;re building toward a future where UpNited is the go-to platform for growth,
              talent discovery, and remote work across Sri Lanka — and beyond.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="card-hover rounded-2xl border border-border-color bg-surface p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <value.icon size={20} />
                </div>
                <h3 className="font-display text-base font-bold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
