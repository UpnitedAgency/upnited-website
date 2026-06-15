import {
  Share2,
  Palette,
  Code2,
  Megaphone,
  Video,
  Plane,
  PenTool,
  Camera,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  shortDescription: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    icon: Share2,
    shortDescription: "Strategy, content, and growth across every platform.",
    description:
      "We plan, create, and manage your social media presence across Instagram, Facebook, TikTok, and LinkedIn — turning followers into loyal customers with consistent, on-brand content.",
    features: [
      "Content calendars & scheduling",
      "Community management",
      "Analytics & monthly reporting",
      "Platform-specific strategy",
    ],
  },
  {
    slug: "branding-graphic-design",
    title: "Branding & Graphic Design",
    icon: Palette,
    shortDescription: "Identities that make brands unforgettable.",
    description:
      "From logos to full brand guidelines, we craft visual identities that capture your business's personality and make a lasting impression on customers.",
    features: [
      "Logo & brand identity design",
      "Brand guidelines & style guides",
      "Social media templates",
      "Print & packaging design",
    ],
  },
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    icon: Code2,
    shortDescription: "Fast, modern websites built to convert.",
    description:
      "We design and build responsive, high-performance websites and web apps using modern technology — optimized for speed, SEO, and conversions.",
    features: [
      "Custom website design",
      "E-commerce solutions",
      "SEO-ready architecture",
      "Ongoing maintenance & support",
    ],
  },
  {
    slug: "meta-google-ads",
    title: "Meta & Google Ads",
    icon: Megaphone,
    shortDescription: "Paid campaigns that drive real ROI.",
    description:
      "Our performance marketing team plans, launches, and optimizes ad campaigns across Meta and Google to generate qualified leads and sales.",
    features: [
      "Campaign strategy & setup",
      "Audience targeting & retargeting",
      "A/B testing & optimization",
      "Transparent performance reporting",
    ],
  },
  {
    slug: "video-production",
    title: "Video Production",
    icon: Video,
    shortDescription: "Scroll-stopping video content.",
    description:
      "From concept to final edit, we produce high-quality video content — reels, ads, and brand films — designed to engage audiences and boost reach.",
    features: [
      "Concept & scriptwriting",
      "Filming & production",
      "Professional editing",
      "Reels & short-form content",
    ],
  },
  {
    slug: "drone-photography-videography",
    title: "Drone Photography & Videography",
    icon: Plane,
    shortDescription: "Cinematic aerial shots for any project.",
    description:
      "Licensed drone pilots capturing stunning aerial photography and videography for real estate, events, hospitality, and promotional projects.",
    features: [
      "Aerial photography & video",
      "Real estate & property tours",
      "Event coverage",
      "4K cinematic footage",
    ],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    icon: PenTool,
    shortDescription: "Creative content that tells your story.",
    description:
      "Our in-house creators produce photo and video content tailored to your brand voice — from product shoots to lifestyle storytelling.",
    features: [
      "Photo & video shoots",
      "Copywriting & captions",
      "UGC-style content",
      "Influencer collaborations",
    ],
  },
  {
    slug: "on-location-shoots",
    title: "On-location Shoots",
    icon: Camera,
    shortDescription: "We bring the studio to you.",
    description:
      "Full production teams travel to your business location for photo and video shoots — capturing authentic content in your real environment.",
    features: [
      "Full crew & equipment",
      "Flexible scheduling",
      "Island-wide coverage",
      "Same-day previews available",
    ],
  },
  {
    slug: "business-growth-consulting",
    title: "Business Growth Consulting",
    icon: TrendingUp,
    shortDescription: "Strategic guidance to scale your business.",
    description:
      "We work alongside business owners to identify growth opportunities, streamline operations, and build marketing strategies that scale sustainably.",
    features: [
      "Market & competitor analysis",
      "Growth strategy roadmaps",
      "Marketing audits",
      "Ongoing strategic support",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
