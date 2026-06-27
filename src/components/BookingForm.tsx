"use client";

import React, { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    type: "Performance",
    message: "",
    honeypot: "", // Spam prevention honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inquiryTypes = [
    "Performance",
    "Festival",
    "Brand Partnership",
    "Interview",
    "Collaboration",
    "Music Production",
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "NAME IS REQUIRED";
    if (!formData.email.trim()) {
      newErrors.email = "EMAIL IS REQUIRED";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "INVALID EMAIL FORMAT";
    }
    if (!formData.message.trim()) newErrors.message = "MESSAGE IS REQUIRED";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      // Quietly reject spam bots
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate server response delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#D4AF37", "#C1121F", "#F9F9F9"],
    });

    // Reset Form
    setFormData({
      name: "",
      email: "",
      org: "",
      type: "Performance",
      message: "",
      honeypot: "",
    });

    // Reset success message after a few seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className="frosted-card p-8 md:p-12 relative overflow-hidden soft-red-glow select-none">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/5 rounded-full blur-3xl pointer-events-none" />

      {isSuccess ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full border-2 border-gold-primary flex items-center justify-center text-gold-primary bg-gold-primary/10 animate-pulse">
            <Check className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif italic text-3xl text-white-editorial">
              Inquiry Sent.
            </h3>
            <p className="text-xs font-mono text-gold-primary tracking-widest uppercase">
              RESONANCE RECEIVED / CONNECTING WITH MANAGEMENT
            </p>
          </div>
          <p className="text-sm text-muted-text max-w-sm">
            We review bookings within 24 hours. Silence has a sound, and we are ready to bring it to your stage.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field (hidden from users) */}
          <div className="hidden">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-text tracking-widest block uppercase">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rockstar Bandit"
                className={`w-full bg-secondary-dark/60 border ${
                  errors.name ? "border-accent-red" : "border-border-dark/80"
                } focus:border-gold-primary text-sm p-4 text-white-editorial outline-none transition-all placeholder:text-muted-text/30 font-sans`}
              />
              {errors.name && (
                <div className="flex items-center space-x-1 text-accent-red font-mono text-[9px] tracking-widest">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-text tracking-widest block uppercase">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="manager@domain.com"
                className={`w-full bg-secondary-dark/60 border ${
                  errors.email ? "border-accent-red" : "border-border-dark/80"
                } focus:border-gold-primary text-sm p-4 text-white-editorial outline-none transition-all placeholder:text-muted-text/30 font-sans`}
              />
              {errors.email && (
                <div className="flex items-center space-x-1 text-accent-red font-mono text-[9px] tracking-widest">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organization Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-text tracking-widest block uppercase">
                Organization / Company
              </label>
              <input
                type="text"
                name="org"
                value={formData.org}
                onChange={handleChange}
                placeholder="Sony Music East Africa"
                className="w-full bg-secondary-dark/60 border border-border-dark/80 focus:border-gold-primary text-sm p-4 text-white-editorial outline-none transition-all placeholder:text-muted-text/30 font-sans"
              />
            </div>

            {/* Inquiry Type Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-text tracking-widest block uppercase">
                Inquiry Type
              </label>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-secondary-dark/60 border border-border-dark/80 focus:border-gold-primary text-sm p-4 text-white-editorial outline-none transition-all font-sans appearance-none cursor-pointer"
                >
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type} className="bg-secondary-dark">
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-text text-[10px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-muted-text tracking-widest block uppercase">
              Project Details & Booking Request *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Outline event details, budget brackets, schedule, rider capabilities..."
              className={`w-full bg-secondary-dark/60 border ${
                errors.message ? "border-accent-red" : "border-border-dark/80"
              } focus:border-gold-primary text-sm p-4 text-white-editorial outline-none transition-all placeholder:text-muted-text/30 font-sans resize-none`}
            />
            {errors.message && (
              <div className="flex items-center space-x-1 text-accent-red font-mono text-[9px] tracking-widest">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.message}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="magnetic-btn w-full py-4 border border-gold-primary bg-gold-primary text-background-dark hover:bg-transparent hover:text-gold-primary font-display font-medium text-xs tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-background-dark border-t-transparent rounded-full animate-spin" />
                <span>TRANSMITTING FREQUENCIES...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 fill-current" />
                <span>SEND BOOKING REQUEST</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
