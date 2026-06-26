"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

// සේවා ලැයිස්තුව සහ ඒ ඒ සේවාවට අදාළ 3D පින්තූර මෙතනින් සකස් කරන්න පුළුවන්
const servicesData = [
  {
    id: "01",
    title: "Social Media Management",
    desc: "We plan, create, and manage your social media presence to drive engagement and brand loyalty.",
    // public/services/ ෆෝල්ඩර් එකේ මේ නම් වලින් පින්තූර දාන්න
    image: "/services/social-3d.png", 
    features: [
      "Content calendars & scheduling",
      "Community management",
      "Analytics & monthly reporting",
      "Platform-specific strategy",
    ],
  },
  {
    id: "02",
    title: "Website Design & Development",
    desc: "Fast, responsive, and conversion-focused websites tailored specifically for your business goals.",
    image: "/services/web-3d.png",
    features: [
      "Custom UI/UX Design",
      "Next.js & React Development",
      "SEO & Performance Optimization",
      "E-commerce Integration",
    ],
  },
  // ඔයාට තියෙන ඉතුරු සර්විස් 4ත් මේ විදිහටම මෙතනට පල්ලෙහායින් එකතු කරගන්න මචං...
];

export default function ServicesPage() {
  return (
    <section className="bg-[#f4f7f4] min-h-screen py-24 px-4 sm:px-6 lg:px-8 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top Header Section */}
        <div className="text-center mb-20">
          <span className="rounded-full bg-[#ccff00] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black">
            What We Do
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950">
            Services That Drive Real <br />
            <span className="text-[#a3cc00]">Growth</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            From strategy to execution, our team delivers measurable results across every channel that matters to your business.
          </p>
        </div>

        {/* Services List with 3D Images Line */}
        <div className="flex flex-col gap-12 w-full">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              whileTap={{ scale: 0.99 }}
              className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 sm:p-12 shadow-sm hover:shadow-md hover:border-[#a3cc00]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
            >
              {/* Neon accent on top */}
              <div className="absolute top-0 left-0 h-[4px] w-16 bg-[#ccff00]" />

              {/* Left Side: 3D Image Line Box */}
              <div className="lg:col-span-4 flex justify-center items-center bg-slate-50 rounded-3xl p-6 aspect-square max-w-[260px] mx-auto lg:mx-0 shadow-inner group">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={240}
                  height={240}
                  className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                  fallback="/services/default-3d.png" // පින්තූරය නැත්නම් වැටෙන එකක්
                />
              </div>

              {/* Right Side: Content Box */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs font-bold text-[#a3cc00] tracking-wider uppercase">
                    Service {service.id}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* What's Included - Features Grid */}
                <div className="mt-8">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">What's Included</p>
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
                    className="group inline-flex items-center gap-2 rounded-full bg-black hover:bg-slate-900 text-white px-6 py-3 text-xs font-bold transition-all shadow-md active:scale-95"
                  >
                    Start a Conversation
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
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
