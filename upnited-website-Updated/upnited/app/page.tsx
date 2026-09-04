"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Briefcase, Share2, Palette, Code2, Megaphone, Video, Plane, PenTool, Camera, TrendingUp, Star, Quote } from "lucide-react";

const services = [
  { icon: Share2, title: "Social Media Management", desc: "Strategic content and audience growth across all platforms." },
  { icon: Palette, title: "Branding & Graphic Design", desc: "Identities that make brands unforgettable." },
  { icon: Code2, title: "Website Development", desc: "Fast, modern websites built to convert." },
  { icon: Megaphone, title: "Meta & Google Ads", desc: "Paid campaigns that drive real ROI." },
  { icon: Video, title: "Video Production", desc: "Scroll-stopping video content." },
  { icon: Plane, title: "Drone Photography", desc: "Cinematic aerial shots for any project." },
  { icon: PenTool, title: "Content Creation", desc: "Creative content that tells your story." },
  { icon: Camera, title: "On-location Shoots", desc: "We bring the studio to you." },
  { icon: TrendingUp, title: "Business Growth Consulting", desc: "Strategic guidance to scale your business." },
];

const testimonials = [
  { name: "Dilshan Wickramasinghe", role: "Owner, Good Heart Cafe", quote: "UpNited transformed our social media completely. Our launch campaign brought in more new customers than we ever expected.", rating: 5 },
  { name: "Anjali Rathnayake", role: "Founder, Coastal Stays", quote: "The drone footage and video content they produced looks incredibly professional. Bookings increased noticeably after the campaign.", rating: 5 },
  { name: "Suresh Kumara", role: "Director, FreshMart Lanka", quote: "Their ad management team is sharp and data-driven. Best ROI we've seen from any agency we've worked with.", rating: 5 },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-primary/20 blur-3xl animate-glow"/>
          <div className="absolute top-40 right-0 h-[24rem] w-[24rem] rounded-full bg-brand-secondary/20 blur-3xl animate-glow"/>
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",backgroundSize:"48px 48px"}}/>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6}}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-color bg-surface px-4 py-1.5 text-sm font-medium text-foreground/70">
              <Sparkles size={14} className="text-brand-primary"/>
              Creative growth partner for ambitious brands
            </motion.div>
            <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.1}}
              className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              Marketing That{" "}<span className="gradient-text">Moves Brands</span>{" "}<span className="accent-text">Forward</span>
            </motion.h1>
            <motion.p initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2}}
              className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg">
              We help businesses grow through branding, digital marketing, content creation, and innovative online experiences — built for Sri Lanka and beyond.
            </motion.p>
            <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.3}}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="group flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-primary/30 transition-transform hover:scale-105 sm:w-auto">
                Start Your Project <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
              </Link>
              <Link href="/portfolio" className="flex w-full items-center justify-center gap-2 rounded-full border border-border-color bg-surface px-8 py-3.5 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary sm:w-auto">
                View Our Work
              </Link>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8,delay:.5}}
              className="mt-16 grid grid-cols-3 gap-4 sm:gap-8">
              {[{value:"150+",label:"Projects Delivered"},{value:"500+",label:"Talent Profiles"},{value:"9",label:"Core Services"}].map(stat=>(
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl font-extrabold sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">One Platform, <span className="gradient-text">Three Solutions</span></h2>
            <p className="mt-4 text-muted">Whatever you need — marketing, a team workspace, or top talent — UpNited brings it all together.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: Briefcase, title: "Digital Marketing", desc: "Full-service marketing for ambitious brands — social media, branding, ads, video, and more.", href: "/services", color: "from-indigo-500 to-blue-500" },
              { icon: Users, title: "UpNited Workspace", desc: "Secure employee portal with attendance, tasks, and performance tracking.", href: "/workspace", color: "from-cyan-500 to-teal-500" },
              { icon: Sparkles, title: "Talent Hub", desc: "Free directory connecting businesses with Sri Lanka's best creative talent.", href: "/talent-hub", color: "from-orange-500 to-amber-500" },
            ].map((f,i)=>(
              <motion.div key={f.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5,delay:i*.1}}>
                <Link href={f.href} className="card-hover group flex h-full flex-col rounded-3xl border border-border-color bg-background p-8">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-lg`}><f.icon size={24}/></div>
                  <h3 className="font-display text-xl font-bold">{f.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{f.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
                    Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Everything Your Brand Needs to <span className="gradient-text">Grow</span></h2>
              <p className="mt-4 text-muted">From strategy to execution — every service you need, under one roof.</p>
            </div>
            <Link href="/services" className="group flex items-center gap-2 rounded-full border border-border-color bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-brand-primary hover:text-brand-primary">
              View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/>
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s,i)=>(
              <motion.div key={s.title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.4,delay:(i%3)*.08}}>
                <div className="card-hover group flex h-full flex-col rounded-2xl border border-border-color bg-surface p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white"><s.icon size={20}/></div>
                  <h3 className="font-display text-base font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Our <span className="gradient-text">Process</span></h2>
            <p className="mt-4 text-muted">A clear, proven framework that delivers results every time.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {["Discover","Strategize","Create","Launch","Scale"].map((step,i)=>(
              <motion.div key={step} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.4,delay:i*.1}}
                className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg text-white font-display text-xl font-bold shadow-lg shadow-brand-primary/25">
                  {String(i+1).padStart(2,"0")}
                </div>
                <p className="mt-3 font-display text-sm font-bold">{step}</p>
                {i<4&&<div className="absolute hidden sm:block"/>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Trusted by <span className="gradient-text">Growing Businesses</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t,i)=>(
              <motion.div key={t.name} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.4,delay:i*.1}}
                className="card-hover flex flex-col rounded-3xl border border-border-color bg-surface p-6">
                <Quote size={28} className="text-brand-primary/30"/>
                <p className="mt-4 flex-1 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex gap-0.5">{Array.from({length:t.rating}).map((_,j)=><Star key={j} size={14} className="fill-brand-accent text-brand-accent"/>)}</div>
                <div className="mt-3 border-t border-border-color pt-3">
                  <p className="font-display text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl gradient-bg px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 30% 20%,white 0%,transparent 40%),radial-gradient(circle at 80% 80%,white 0%,transparent 40%)"}}/>
          <div className="relative">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Ready to Grow Your Brand?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">Book a free consultation and discover how UpNited can help your business reach new heights.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-primary shadow-xl transition-transform hover:scale-105 sm:w-auto">
                Get Free Consultation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
              </Link>
              <Link href="/talent-hub" className="flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:w-auto">
                <Sparkles size={18}/> Explore Talent Hub
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
