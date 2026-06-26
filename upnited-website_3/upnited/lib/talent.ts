import {
  Mic2,
  Disc3,
  Presentation,
  Camera,
  Video,
  Palette,
  AudioLines,
  Hammer,
  Scissors,
  ChefHat,
  Briefcase,
  Wrench,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface TalentCategory {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export const talentCategories: TalentCategory[] = [
  { slug: "influencers", name: "Influencers", icon: Sparkles, description: "Social media personalities and content creators with engaged audiences." },
  { slug: "djs", name: "DJs", icon: Disc3, description: "Professional DJs for events, parties, and weddings." },
  { slug: "presenters", name: "Presenters", icon: Presentation, description: "Hosts and emcees for events, shows, and corporate functions." },
  { slug: "photographers", name: "Photographers", icon: Camera, description: "Professional photographers for events, portraits, and products." },
  { slug: "videographers", name: "Videographers", icon: Video, description: "Video professionals for films, events, and commercial work." },
  { slug: "graphic-designers", name: "Graphic Designers", icon: Palette, description: "Designers for branding, print, and digital media." },
  { slug: "voice-artists", name: "Voice Artists", icon: AudioLines, description: "Voiceover talent for ads, narration, and dubbing." },
  { slug: "carpenters", name: "Carpenters", icon: Hammer, description: "Skilled carpenters for furniture and construction work." },
  { slug: "hairdressers", name: "Hairdressers", icon: Scissors, description: "Hair stylists for events, salons, and personal care." },
  { slug: "cooks", name: "Cooks", icon: ChefHat, description: "Chefs and cooks for events, catering, and private dining." },
  { slug: "freelancers", name: "Freelancers", icon: Briefcase, description: "Independent professionals across various industries." },
  { slug: "skilled-workers", name: "Skilled Workers", icon: Wrench, description: "Tradespeople and technicians for any job." },
  { slug: "content-creators", name: "Content Creators", icon: Mic2, description: "Creators producing content across platforms and formats." },
];

export interface TalentProfile {
  id: string;
  name: string;
  category: string;
  location: string;
  bio: string;
  followers: number;
  rating: number;
  featured: boolean;
  socials: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    facebook?: string;
  };
  avatarColor: string;
}

export const talentProfiles: TalentProfile[] = [
  {
    id: "1",
    name: "Nadeesha Perera",
    category: "influencers",
    location: "Colombo",
    bio: "Lifestyle & fashion content creator collaborating with top Sri Lankan brands.",
    followers: 84000,
    rating: 4.9,
    featured: true,
    socials: { instagram: "https://instagram.com", tiktok: "https://tiktok.com" },
    avatarColor: "from-fuchsia-500 to-purple-600",
  },
  {
    id: "2",
    name: "DJ Ravindu",
    category: "djs",
    location: "Kandy",
    bio: "Wedding & club DJ with 8+ years experience across Sri Lanka.",
    followers: 32000,
    rating: 4.8,
    featured: true,
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    avatarColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "3",
    name: "Tharindu Fernando",
    category: "photographers",
    location: "Galle",
    bio: "Wedding and portrait photographer specializing in candid storytelling.",
    followers: 21000,
    rating: 5.0,
    featured: true,
    socials: { instagram: "https://instagram.com" },
    avatarColor: "from-orange-500 to-amber-600",
  },
  {
    id: "4",
    name: "Sachini Madushani",
    category: "presenters",
    location: "Colombo",
    bio: "TV presenter and corporate event host, fluent in Sinhala and English.",
    followers: 56000,
    rating: 4.9,
    featured: false,
    socials: { instagram: "https://instagram.com", youtube: "https://youtube.com" },
    avatarColor: "from-rose-500 to-pink-600",
  },
  {
    id: "5",
    name: "Studio Lens Films",
    category: "videographers",
    location: "Negombo",
    bio: "Cinematic wedding films and commercial video production team.",
    followers: 18000,
    rating: 4.7,
    featured: false,
    socials: { instagram: "https://instagram.com", youtube: "https://youtube.com" },
    avatarColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "6",
    name: "Pixel Craft Designs",
    category: "graphic-designers",
    location: "Kurunegala",
    bio: "Branding and packaging design studio for startups and small businesses.",
    followers: 9500,
    rating: 4.8,
    featured: false,
    socials: { instagram: "https://instagram.com" },
    avatarColor: "from-indigo-500 to-violet-600",
  },
];

export function getTalentByCategory(categorySlug: string) {
  return talentProfiles.filter((t) => t.category === categorySlug);
}

export function getFeaturedTalent() {
  return talentProfiles.filter((t) => t.featured);
}

export function getCategoryBySlug(slug: string) {
  return talentCategories.find((c) => c.slug === slug);
}

export function formatFollowers(count: number) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}
