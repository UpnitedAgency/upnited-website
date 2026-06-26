"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";

const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];
const meetingTypes = ["Discovery Call", "Strategy Session", "Project Kickoff", "General Inquiry"];

export function BookingSection() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form එකේ දත්ත හරියටම track වෙන්න හැදුවා
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    date: "",
    meetingType: "Discovery Call",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      setErrorMessage("Please select a time slot.");
      return;
    }
    
    setLoading(true);
    setErrorMessage(null);

    // ඔයාගේ පරණ Key එකමයි පාවිච්චි කරලා තියෙන්නේ
    const sendData = {
      access_key: "c8105b3b-3479-4a0d-9ca4-3e0b692d00b6",
      subject: "New Consultation Booking Request",
      name: bookingData.name,
      email: bookingData.email,
      preferred_date: bookingData.date,
      meeting_type: bookingData.meetingType,
      selected_time_slot: selectedTime,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sendData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setBookingData({ name: "", email: "", date: "", meetingType: "Discovery Call" });
      } else {
        console.error("Web3Forms Error:", data);
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setErrorMessage("Network error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-border-color bg-surface p-12 text-center"
      >
        <CheckCircle2 size={48} className="text-emerald-500" />
        <h3 className="mt-4 font-display text-xl font-bold">Appointment Requested!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          We&apos;ll confirm your {selectedTime} slot via email or WhatsApp shortly.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setSelectedTime(null); }}
          className="mt-5 text-xs text-brand-primary underline"
        >
          Book another slot
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="booking" className="rounded-3xl border border-border-color bg-surface p-6 sm:p-8">
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary">
        <Calendar size={18} />
        Book an Appointment
      </div>
      <p className="mt-2 text-sm text-muted">Pick a time that works for you and we&apos;ll confirm shortly.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="apt-name" className="mb-1.5 block text-sm font-medium">Full Name</label>
          <input
            id="apt-name"
            name="name"
            required
            type="text"
            value={bookingData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="apt-email" className="mb-1.5 block text-sm font-medium">Email Address</label>
          <input
            id="apt-email"
            name="email"
            required
            type="email"
            value={bookingData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="apt-date" className="mb-1.5 block text-sm font-medium">Preferred Date</label>
          <input
            id="apt-date"
            name="date"
            required
            type="date"
            value={bookingData.date}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="apt-type" className="mb-1.5 block text-sm font-medium">Meeting Type</label>
          <select
            id="apt-type"
            name="meetingType"
            value={bookingData.meetingType}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-primary"
          >
            {meetingTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
          <Clock size={15} />
          Available Time Slots
        </label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedTime(slot)}
              className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
                selectedTime === slot
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-border-color bg-background hover:border-brand-primary"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {errorMessage && (
        <p className="mt-4 text-sm font-medium text-red-500">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={loading || !selectedTime}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full gradient-bg px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-transform hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Booking..." : "Confirm Appointment"}
      </button>
    </form>
  );
}
