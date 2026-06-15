import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TalentCard } from "@/components/shared/TalentCard";
import { talentCategories, getFeaturedTalent } from "@/lib/talent";

export const metadata: Metadata = {
  title: "Talent Hub",
  description: "Discover and connect with Sri Lanka's top influencers, photographers, designers, and skilled professionals — free to browse.",
};

export default function TalentHubPage() {
  const featured = getFeaturedTalent();

  return (
    <>
      <PageHeader
        eyebrow="UpNited Talent Hub"
        title={
          <>
            Discover Sri Lanka&apos;s <span className="gradient-text">Best Talent</span>
          </>
        }
        description="A free directory connecting businesses with influencers, creatives, and skilled professionals across the island."
      />

      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/talent-hub/submit"
              className="group flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-105 sm:w-auto"
            >
              <UserPlus size={18} />
              Submit Your Profile — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold">Browse by Category</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {talentCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/talent-hub/${cat.slug}`}
                className="card-hover group flex flex-col items-center gap-3 rounded-2xl border border-border-color bg-surface p-6 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <cat.icon size={22} />
                </div>
                <p className="font-display text-sm font-bold">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold">Featured Talent</h2>
            <Link href="/talent-hub/influencers" className="group flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
              View More
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((t) => (
              <TalentCard key={t.id} talent={t} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
