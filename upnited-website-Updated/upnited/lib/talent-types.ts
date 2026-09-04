export interface TalentProfile {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  age?: number;
  location?: string;
  bio?: string;
  primary_service?: string;
  experience?: string;
  availability?: "available" | "busy" | "open";
  profile_image?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  // joined from related tables
  talent_services?: TalentService[];
  social_links?: SocialLinks;
  portfolio_projects?: PortfolioProject[];
}

export interface TalentService {
  id: string;
  talent_id: string;
  service_name: string;
  order_index: number;
}

export interface PortfolioProject {
  id: string;
  talent_id: string;
  title: string;
  description?: string;
  category?: string;
  client_name?: string;
  project_url?: string;
  cover_image?: string;
  project_date?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  portfolio_images?: PortfolioImage[];
}

export interface PortfolioImage {
  id: string;
  project_id: string;
  image_url: string;
  order_index: number;
}

export interface SocialLinks {
  id: string;
  talent_id: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  linkedin?: string;
  website?: string;
}

export interface HireRequest {
  id: string;
  talent_id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

export const AVAILABILITY_LABELS: Record<string, string> = {
  available: "Available",
  busy: "Currently Busy",
  open: "Open to Offers",
};

export const AVAILABILITY_COLORS: Record<string, string> = {
  available: "text-emerald-500",
  busy: "text-red-400",
  open: "text-amber-400",
};

export const SERVICE_CATEGORIES = [
  "Digital Marketing","Social Media Management","Meta Ads","Google Ads",
  "TikTok Ads","Branding","Graphic Design","Photography","Videography",
  "Video Editing","Drone Photography","Web Development","Content Creation",
  "Copywriting","SEO","Influencer Marketing","Event Coverage","Voice Acting",
  "DJ / Music","Presenting / MC","Hairdressing","Cooking / Catering",
  "Carpentry","Other",
];
