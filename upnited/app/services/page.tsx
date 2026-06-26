"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, MessageSquarePlus } from "lucide-react";

const servicesData = [
  {
    title: "Social Media Management",
    desc: "We plan, create, and manage your social media presence to drive engagement and brand loyalty.",
    image: "/services/social-3d.png", 
    features: [
      "Content calendars and scheduling",
      "Community management",
      "Analytics and monthly reporting",
      "Platform-specific strategy",
    ],
  },
  {
    title: "Branding and Graphic Design",
    desc: "Crafting memorable brand identities, logos, and visual assets that set your business apart from the competition.",
    image: "/services/branding-3d.png",
    features: [
      "Logo and Brand Identity",
      "Marketing Collateral",
      "Social Media Templates",
      "Brand Style Guides",
    ],
  },
  {
    title: "Website Design and Development",
    desc: "Fast, responsive, and conversion-focused websites tailored specifically for your business goals.",
    image: "/services/web-3d.png",
    features: [
      "Custom UI/UX Design",
      "Next.js and React Development",
      "SEO and Performance Optimization",
      "E-commerce Integration",
    ],
  },
  {
    title: "Meta and Google Ads",
    desc: "High-performing paid ad campaigns that target the right audience to deliver maximum return on investment (ROI).",
    image: "/services/ads-3d.png",
    features: [
      "Campaign Setup and Strategy",
      "Audience Targeting",
      "A/B Testing and Optimization",
      "ROI Tracking and Dashboards",
    ],
  },
  {
    title: "Video Production",
    desc: "High-quality, scroll-stopping video content designed for modern social media platforms and branding.",
    image: "/services/video-3d.png",
    features: [
      "Scriptwriting and Storyboarding",
      "Professional Shooting",
      "Video Editing and Motion Graphics",
      "Social Media Reels / Shorts",
    ],
  },
  {
    title: "Drone Photography and Videography",
    desc: "Stunning, cinematic aerial views and footage to elevate your commercial projects and brand storytelling.",
    image: "/services/drone-3d.png",
    features: [
      "4K Cinematic Aerial Footage",
      "Commercial Property Shoots",
      "Event Drone Coverage",
      "Color Grading and Post-Production",
    ],
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-[#f4f7f4] min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-slate-900 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top Header Section */}
        <div className="text-center mb-20">
          <span className="rounded-full bg-[#ccff00] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black">
            What We Do
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Services That Drive Real <br />
            <span className="text-[#a3cc00]">Growth</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            From strategy to execution, our team delivers measurable results across every channel that matters to your business.
          </p>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-12 w-full">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileTap={{ scale: 0.99 }}
              className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm hover:shadow-md hover:border-[#a3cc00]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
            >
              {/* Neon accent on top */}
              <div className="absolute top-0 left-0 h-[4px] w-16 bg-[#ccff00]" />

              {/* Left Side: 3D Image Line Box */}
              <div className="lg:col-span-4 flex justify-center items-center bg-slate-50 border border-slate-100 rounded-3xl p-6 aspect-square max-w-[260px] w-full mx-auto lg:mx-0 shadow-inner group">
                <img
                  src={service.image}
                  alt={service.title}
                  onError={(e) => {
                    // පින්තූරය public එකේ නැත්නම් broken image icon එකක් වෙනුවට transparent Placeholder එකක් පෙන්නනවා
                    e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23a3cc00' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'><rect width='18' height='18' x='3' y='3' rx='2' ry='2'/><circle cx='9' cy='9' r='2'/><path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/></svg>";
                  }}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Right Side: Content Box */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* What's Included */}
                <div className="mt-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">What is Included</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                        <CheckCircle2 size={16} className="text-[#a3cc00] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-black hover:bg-slate-900 text-white px-6 py-3.5 text-xs font-bold transition-all shadow-md active:scale-95"
                  >
                    <MessageSquarePlus size={15} className="text-[#ccff00]" />
                    <span>Start a Conversation</span>
                  </Link>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
