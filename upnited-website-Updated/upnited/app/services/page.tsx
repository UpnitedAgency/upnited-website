import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Share2, Palette, Code2, Megaphone, Video, Plane, PenTool, Camera, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
export const metadata: Metadata = { title:"Services", description:"Full-service digital marketing in Sri Lanka." };
const services = [
  { slug:"social-media", icon:Share2, title:"Social Media Management", desc:"We plan, create, and manage your social media presence across Instagram, Facebook, TikTok, and LinkedIn — turning followers into loyal customers.", features:["Content calendars & scheduling","Community management","Analytics & monthly reporting","Platform-specific strategy"] },
  { slug:"branding", icon:Palette, title:"Branding & Graphic Design", desc:"From logos to full brand guidelines, we craft visual identities that capture your business's personality.", features:["Logo & brand identity design","Brand guidelines & style guides","Social media templates","Print & packaging design"] },
  { slug:"web-dev", icon:Code2, title:"Website Design & Development", desc:"We design and build responsive, high-performance websites optimized for speed, SEO, and conversions.", features:["Custom website design","E-commerce solutions","SEO-ready architecture","Ongoing maintenance & support"] },
  { slug:"ads", icon:Megaphone, title:"Meta & Google Ads", desc:"Our performance marketing team plans, launches, and optimizes campaigns to generate qualified leads and sales.", features:["Campaign strategy & setup","Audience targeting & retargeting","A/B testing & optimization","Transparent performance reporting"] },
  { slug:"video", icon:Video, title:"Video Production", desc:"From concept to final edit — reels, ads, and brand films designed to engage audiences and boost reach.", features:["Concept & scriptwriting","Filming & production","Professional editing","Reels & short-form content"] },
  { slug:"drone", icon:Plane, title:"Drone Photography & Videography", desc:"Licensed drone pilots capturing stunning aerial photography and videography for any project.", features:["Aerial photography & video","Real estate & property tours","Event coverage","4K cinematic footage"] },
  { slug:"content", icon:PenTool, title:"Content Creation", desc:"Our in-house creators produce photo and video content tailored to your brand voice.", features:["Photo & video shoots","Copywriting & captions","UGC-style content","Influencer collaborations"] },
  { slug:"shoots", icon:Camera, title:"On-location Shoots", desc:"Full production teams travel to your business location for authentic content in your real environment.", features:["Full crew & equipment","Flexible scheduling","Island-wide coverage","Same-day previews available"] },
  { slug:"consulting", icon:TrendingUp, title:"Business Growth Consulting", desc:"We work alongside business owners to identify growth opportunities and build marketing strategies that scale.", features:["Market & competitor analysis","Growth strategy roadmaps","Marketing audits","Ongoing strategic support"] },
];
export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="What We Do" title={<>Services That Drive <span className="gradient-text">Real Growth</span></>} description="From strategy to execution — measurable results across every channel."/>
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {services.map((s,i)=>(
            <div key={s.slug} id={s.slug} className="card-hover grid grid-cols-1 gap-8 rounded-3xl border border-border-color bg-surface p-6 sm:p-10 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl gradient-bg text-white"><s.icon size={24}/></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Service {String(i+1).padStart(2,"0")}</span>
                <h2 className="mt-2 font-display text-2xl font-bold">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
                <Link href="/contact" className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary">Get a Quote <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/></Link>
              </div>
              <div className="lg:col-span-2">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">What&apos;s included</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {s.features.map(f=><div key={f} className="flex items-start gap-2.5 rounded-xl bg-background p-4 text-sm"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-secondary"/>{f}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
