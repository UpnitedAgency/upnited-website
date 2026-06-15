import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Search, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TalentCard } from "@/components/shared/TalentCard";
import { talentCategories, getCategoryBySlug, getTalentByCategory } from "@/lib/talent";

export function generateStaticParams() {
  return talentCategories.map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  return params.then((p) => {
    const category = getCategoryBySlug(p.category);
    if (!category) return {};
    return {
      title: category.name,
      description: `Browse ${category.name.toLowerCase()} on UpNited Talent Hub — Sri Lanka's free talent directory.`,
    };
  });
}

export default async function TalentCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const talent = getTalentByCategory(category.slug);

  return (
    <>
      <PageHeader
        eyebrow="Talent Hub"
        title={
          <>
            <span className="gradient-text">{category.name}</span> in Sri Lanka
          </>
        }
        description={category.description}
      />

      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder={`Search ${category.name.toLowerCase()}...`}
                className="w-full rounded-full border border-border-color bg-surface py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand-primary"
              />
            </div>
            <select className="rounded-full border border-border-color bg-surface px-5 py-3 text-sm outline-none transition-colors focus:border-brand-primary">
              <option>All Locations</option>
              <option>Colombo</option>
              <option>Kandy</option>
              <option>Galle</option>
              <option>Negombo</option>
              <option>Kurunegala</option>
            </select>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {talent.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {talent.map((t) => (
                <TalentCard key={t.id} talent={t} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-border-color bg-surface p-12 text-center">
              <p className="font-display text-lg font-bold">No profiles yet in {category.name}</p>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Be the first to be featured in this category — submit your profile for free.
              </p>
              <Link
                href="/talent-hub/submit"
                className="mt-6 flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-105"
              >
                <UserPlus size={16} />
                Submit Your Profile
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
