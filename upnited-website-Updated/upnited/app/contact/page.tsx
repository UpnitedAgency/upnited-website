"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Calendar, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { siteConfig } from "@/lib/constants";
const services = ["Social Media Management","Branding & Graphic Design","Website Design & Development","Meta & Google Ads","Video Production","Drone Photography","Content Creation","On-location Shoots","Business Growth Consulting","Not sure yet"];
const timeSlots = ["9:00 AM","10:30 AM","12:00 PM","2:00 PM","3:30 PM","5:00 PM"];
export default function ContactPage() {
  const [formDone,setFormDone] = useState(false);
  const [bookDone,setBookDone] = useState(false);
  const [selectedTime,setSelectedTime] = useState("");
  const [formLoading,setFormLoading] = useState(false);
  const [bookLoading,setBookLoading] = useState(false);
  const handleForm = (e:React.FormEvent)=>{ e.preventDefault(); setFormLoading(true); setTimeout(()=>{ setFormLoading(false); setFormDone(true); },900); };
  const handleBook = (e:React.FormEvent)=>{ e.preventDefault(); if(!selectedTime) return; setBookLoading(true); setTimeout(()=>{ setBookLoading(false); setBookDone(true); },900); };
  return (
    <>
      <PageHeader eyebrow="Get In Touch" title={<>Let&apos;s Build Something <span className="gradient-text">Great</span></>} description="Whether you have a question or you are ready to start a project, we are here to help."/>
      <section className="section-padding pt-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
            {[{icon:Mail,label:"Email",value:siteConfig.email,href:`mailto:${siteConfig.email}`},{icon:Phone,label:"Phone",value:siteConfig.phone,href:`tel:${siteConfig.phone}`},{icon:MapPin,label:"Location",value:siteConfig.location,href:undefined}].map(c=>(
              <div key={c.label} className="rounded-2xl border border-border-color bg-surface p-5 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"><c.icon size={18}/></div>
                <p className="font-display text-sm font-bold">{c.label}</p>
                {c.href?<a href={c.href} className="mt-1 block text-sm text-muted hover:text-brand-primary">{c.value}</a>:<p className="mt-1 text-sm text-muted">{c.value}</p>}
              </div>
            ))}
          </div>
          <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
            className="mb-8 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.01]">
            <MessageCircle size={18}/>Chat with us on WhatsApp
          </a>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-xl font-bold">Send a Message</h2>
              {formDone
                ?<div className="flex flex-col items-center rounded-3xl border border-border-color bg-surface p-12 text-center"><CheckCircle2 size={40} className="text-brand-secondary"/><p className="mt-3 font-display text-lg font-bold">Message Sent!</p><p className="mt-1 text-sm text-muted">We will get back to you within 24 hours.</p></div>
                :(
                  <form onSubmit={handleForm} className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {[{label:"Full Name",type:"text",ph:"Your name"},{label:"Email",type:"email",ph:"you@example.com"},{label:"Phone",type:"tel",ph:"+94 7X XXX XXXX"}].map(f=>(
                        <div key={f.label}><label className="mb-1.5 block text-sm font-medium">{f.label}</label><input type={f.type} placeholder={f.ph} className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/></div>
                      ))}
                      <div><label className="mb-1.5 block text-sm font-medium">Service</label><select className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary">{services.map(s=><option key={s}>{s}</option>)}</select></div>
                    </div>
                    <div><label className="mb-1.5 block text-sm font-medium">Message</label><textarea required rows={5} placeholder="Tell us about your project..." className="w-full resize-none rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/></div>
                    <button type="submit" disabled={formLoading} className="flex items-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-70">
                      {formLoading?"Sending...":"Send Message"}<Send size={16}/>
                    </button>
                  </form>
                )
              }
            </div>
            <div>
              <h2 className="mb-4 font-display text-xl font-bold">Book an Appointment</h2>
              {bookDone
                ?<div className="flex flex-col items-center rounded-3xl border border-border-color bg-surface p-12 text-center"><CheckCircle2 size={40} className="text-brand-secondary"/><p className="mt-3 font-display text-lg font-bold">Appointment Requested!</p><p className="mt-1 text-sm text-muted">We will confirm your {selectedTime} slot shortly.</p></div>
                :(
                  <form onSubmit={handleBook} className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8 space-y-4" id="booking">
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary mb-1"><Calendar size={18}/>Book a Consultation</div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {[{label:"Name",type:"text",ph:"Your name"},{label:"Email",type:"email",ph:"you@example.com"}].map(f=>(
                        <div key={f.label}><label className="mb-1.5 block text-sm font-medium">{f.label}</label><input required type={f.type} placeholder={f.ph} className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/></div>
                      ))}
                      <div><label className="mb-1.5 block text-sm font-medium">Preferred Date</label><input required type="date" className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-primary"/></div>
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-1.5 text-sm font-medium"><Clock size={15}/>Time Slot</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(slot=>(
                          <button key={slot} type="button" onClick={()=>setSelectedTime(slot)}
                            className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${selectedTime===slot?"border-brand-primary gradient-bg text-white":"border-border-color bg-background hover:border-brand-primary"}`}>
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button type="submit" disabled={bookLoading||!selectedTime} className="flex items-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-60">
                      {bookLoading?"Booking...":"Confirm Appointment"}<Calendar size={16}/>
                    </button>
                  </form>
                )
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
