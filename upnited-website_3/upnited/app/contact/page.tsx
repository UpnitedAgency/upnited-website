import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/shared/ContactForm";
import { BookingSection } from "@/components/shared/BookingSection";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with UpNited Agency for digital marketing services, project quotes, or appointment bookings.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title={
          <>
            Let&apos;s Start a <span className="gradient-text">Conversation</span>
          </>
        }
        description="Whether you have a question or you're ready to start a project, we're here to help."
      />

      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border-color bg-surface p-6 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <Mail size={20} />
              </div>
              <p className="font-display text-sm font-bold">Email Us</p>
              <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-sm text-muted hover:text-brand-primary">
                {siteConfig.email}
              </a>
            </div>
            <div className="rounded-2xl border border-border-color bg-surface p-6 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <Phone size={20} />
              </div>
              <p className="font-display text-sm font-bold">Call Us</p>
              <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-sm text-muted hover:text-brand-primary">
                {siteConfig.phone}
              </a>
            </div>
            <div className="rounded-2xl border border-border-color bg-surface p-6 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <MapPin size={20} />
              </div>
              <p className="font-display text-sm font-bold">Visit Us</p>
              <p className="mt-1 text-sm text-muted">{siteConfig.location}</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
          >
            <MessageCircle size={18} />
            Chat with us directly on WhatsApp
          </a>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-xl font-bold">Send a Message</h2>
              <ContactForm />
            </div>
            <div>
              <h2 className="mb-4 font-display text-xl font-bold">Book a Consultation</h2>
              <BookingSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
