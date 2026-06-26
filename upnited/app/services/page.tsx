"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

// සේවා 6ම නූලටම මෙතන තියෙනවා මචං
const servicesData = [
  {
    id: "01",
    title: "Social Media Management",
    desc: "We plan, create, and manage your social media presence to drive engagement and brand loyalty.",
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
    title: "Branding & Graphic Design",
    desc: "Crafting memorable brand identities, logos, and visual assets that set your business apart from the competition.",
    image: "/services/branding-3d.png",
    features: [
      "Logo & Brand Identity",
      "Marketing Collateral",
      "Social Media Templates",
      "Brand Style Guides",
    ],
  },
  {
    id: "03",
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
  {
    id: "04",
    title: "Meta & Google Ads",
    desc: "High-performing paid ad campaigns that target the right audience to deliver maximum return on investment (ROI).",
    image: "/services/ads-3d.png",
    features: [
      "Campaign Setup & Strategy",
      "Audience Targeting",
      "A/B Testing & Optimization",
      "ROI Tracking & Dashboards",
    ],
  },
  {
    id: "05",
    title: "Video Production",
    desc: "High-quality, scroll-stopping video content designed for modern social media platforms and branding.",
    image: "/services/video-3d.png",
    features: [
      "Scriptwriting & Storyboarding",
      "Professional Shooting",
      "Video Editing & Motion Graphics",
      "Social Media Reels / Shorts",
    ],
  },
  {
    id: "06",
    title: "Drone Photography & Videography",
    desc: "Stunning, cinematic aerial views and footage to elevate your commercial projects and brand storytelling.",
    image: "/services/drone-3d.png",
    features: [
      "4K Cinematic Aerial Footage",
      "Commercial Property Shoots",
      "Event Drone Coverage",
      "Color Grading & Post-Production",
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

        {/* Services List with 3D Images Line */}
        <div className="flex flex-col gap-12 w-full">
          {servicesData.map((service, index) => {
            return (
              <motion.div
                key={service.id}
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
                <div className="lg:col-span-4 flex justify-center items-center
