import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse UpNited Agency's portfolio of branding, social media, video production, and web development projects.",
};

const projects = [
  { title: "Good Heart Cafe", category: "Social Media & Content", tags: ["Instagram", "Facebook", "Content Strategy"], color: "from-amber-500 to-orange-600" },
  { title: "Kard Nation", category: "Branding & Web Platform", tags: ["Branding", "Web Design", "Next.js"], color: "from-indigo-500 to-violet-600" },
  { title: "Coastal Stays", category: "Drone & Video Production", tags: ["Drone", "Video", "Hospitality"], color: "from-cyan-500 to-blue-600" },
  { title: "FreshMart Lanka", category: "Meta & Google Ads", tags: ["Performance Ads", "E-commerce"], color: "from-emerald-500 to-teal-600" },
  { title: "Lanka Style Boutique", category: "Branding & Graphic Design", tags: ["Logo", "Packaging", "Brand Guide"], color: "from-rose-500 to-pink-600" },
  { title: "Hilltop Resort", category: "On-location Shoots", tags: ["Photography", "Video", "Tourism"], color: "from-lime-500 to-green-600" },
  { title: "Tech Solutions PVT", category: "Website Development", tags: ["Website", "SEO", "Lead Gen"], color: "from-slate-500 to-zinc-600" },
  { title: "Spice Route Catering", category: "Content Creation", tags: ["Reels", "Food Photography"], color: "from-yellow-500 to-orange-500" },
  { title: "Urban Fit Gym", category: "Business Growth Consulting", tags: ["Strategy", "Branding", "Ads"], color: "from-red-500 to-rose-600" },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title={
          <>
            A Portfolio Built on <span className="gradient-text">Results</span>
          </>
        }
        description="Explore a selection of brands we've helped grow through strategic marketing and creative production."
      />

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="card-hover group overflow-hidden rounded-3xl border border-border-color bg-surface"
              >
                <div className={`relative h-44 bg-gradient-to-br ${project.color}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ExternalLink size={26} className="text-white/40 transition-transform group-hover:scale-110" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold">{project.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-background px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </>
  );
}
