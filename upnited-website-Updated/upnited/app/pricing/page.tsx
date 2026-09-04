import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
export const metadata: Metadata = { title:"Pricing", description:"Transparent pricing packages for digital marketing services in Sri Lanka." };
const plans = [
  { name:"Starter", price:"LKR 25,000", period:"/month", desc:"Perfect for small businesses establishing their social presence.", features:["2 social media platforms","12 posts per month","Basic content calendar","Monthly performance report","Community management (business hours)"], highlight:false },
  { name:"Growth", price:"LKR 55,000", period:"/month", desc:"For brands ready to scale their reach and engagement.", features:["3 social media platforms","24 posts per month","Content calendar + strategy","Bi-weekly performance reports","Meta Ads management","1 video shoot per month","Priority community management"], highlight:true },
  { name:"Premium", price:"Custom", period:"", desc:"Full-service partnership for established businesses.", features:["Unlimited platforms","Daily content + reels","Dedicated account manager","Weekly reporting & strategy calls","Meta & Google Ads management","Monthly on-location shoots","Drone photography & videography","Website maintenance included"], highlight:false },
];
const addOns = [
  ["Branding & Logo Package","From LKR 35,000"],["Website Design & Development","From LKR 75,000"],
  ["Single Video Production","From LKR 20,000"],["Drone Shoot (half-day)","From LKR 18,000"],
  ["On-location Photo Shoot","From LKR 15,000"],["Business Growth Consulting","From LKR 10,000/session"],
];
export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title={<>Plans Built for <span className="gradient-text">Every Stage</span></>} description="Transparent packages with no hidden fees. Need something custom? We will build a plan around your goals."/>
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map(p=>(
              <div key={p.name} className={`relative flex flex-col rounded-3xl border p-8 ${p.highlight?"border-brand-primary bg-surface shadow-2xl shadow-brand-primary/20 lg:-translate-y-4":"border-border-color bg-surface card-hover"}`}>
                {p.highlight&&<span className="absolute -top-3 left-8 flex items-center gap-1 rounded-full gradient-bg px-3 py-1 text-xs font-semibold text-white"><Sparkles size={12}/>Most Popular</span>}
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted">{p.desc}</p>
                <div className="mt-5 flex items-baseline gap-1"><span className="font-display text-3xl font-extrabold">{p.price}</span><span className="text-sm text-muted">{p.period}</span></div>
                <ul className="mt-6 flex-1 space-y-3">{p.features.map(f=><li key={f} className="flex items-start gap-2.5 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-brand-secondary"/>{f}</li>)}</ul>
                <Link href="/contact" className={`mt-8 flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-105 ${p.highlight?"gradient-bg text-white shadow-lg shadow-brand-primary/25":"border border-border-color hover:border-brand-primary hover:text-brand-primary"}`}>
                  {p.price==="Custom"?"Contact Sales":"Get Started"}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Add-on Services</h2>
            <p className="mt-2 text-sm text-muted">Combine with any package or purchase standalone.</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {addOns.map(([name,price])=>(
                <div key={name} className="flex items-center justify-between rounded-2xl border border-border-color bg-surface p-5">
                  <span className="text-sm font-medium">{name}</span>
                  <span className="text-sm font-semibold text-brand-primary">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
