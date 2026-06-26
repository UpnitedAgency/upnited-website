import Link from "next/link";
import Image from "next/image";
import { MessageCircle, MapPin, Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "@/components/shared/SocialIcons";
import { siteConfig, mainNav } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border-color bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl transition-transform group-hover:scale-105">
                <Image
                  src="/logo.jpg"
                  alt="UpNited Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                {siteConfig.shortName}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
                { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
                { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
                { icon: YouTubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-color text-muted transition-colors hover:border-brand-primary hover:text-brand-primary"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-brand-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/workspace/login" className="text-sm text-muted transition-colors hover:text-brand-primary">
                  Employee Login
                </Link>
              </li>
              <li>
                <Link href="/talent-hub/submit" className="text-sm text-muted transition-colors hover:text-brand-primary">
                  Join Talent Hub
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted transition-colors hover:text-brand-primary">
                  Pricing Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted transition-colors hover:text-brand-primary">
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-primary" />
                {siteConfig.location}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-primary" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-primary">{siteConfig.email}</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-primary" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-brand-primary">{siteConfig.phone}</a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-color pt-6 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Made with care by <span className="font-semibold text-foreground/90">Pasindu Tharaka</span> @ <span className="font-semibold text-brand-primary">UpNited Marketing</span> 🇱🇰</p>
        </div>
      </div>
    </footer>
  );
}
