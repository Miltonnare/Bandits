"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Heart, Landmark, Sparkles, AudioLines, Globe2 } from "lucide-react";

interface KeyPoint {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export default function WhyBandits() {
  const points: KeyPoint[] = [
    {
      title: "Authentic Storytelling",
      icon: <BookOpen className="w-6 h-6 text-gold-primary" />,
      description: "Crafting narratives directly from the heart of Nairobi. Translating raw struggles and unfiltered truths into poetic soundwaves.",
    },
    {
      title: "Emotional Connection",
      icon: <Heart className="w-6 h-6 text-accent-red animate-pulse" />,
      description: "Redefining strength through vulnerability. Creating a safe auditory space for a generation to process hidden scars and silent battles.",
    },
    {
      title: "Kenyan Identity",
      icon: <Landmark className="w-6 h-6 text-gold-primary" />,
      description: "Proudly honoring East African roots by infusing traditional Swahili poetry and local rhythmic meters with global rap cadences.",
    },
    {
      title: "Creative Excellence",
      icon: <Sparkles className="w-6 h-6 text-gold-primary" />,
      description: "A meticulously engineered blueprint. Melding custom-built cinematic strings, low-pass 808s, and pristine vocal mixes.",
    },
    {
      title: "Modern Sound",
      icon: <AudioLines className="w-6 h-6 text-gold-primary" />,
      description: "Pioneering the hybrid frontier of African Emo Rap. Bending genres, filters, and tempos to shape the auditory future.",
    },
    {
      title: "Global Vision",
      icon: <Globe2 className="w-6 h-6 text-gold-primary" />,
      description: "Securing coordinates beyond borders. Bringing the distinctive resonance of Kenyan youth culture to stages worldwide.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
      {points.map((point, index) => (
        <motion.div
          key={point.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="frosted-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:-translate-y-1 duration-300"
        >
          {/* Subtle gold ambient glow in card top right */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold-primary/10 transition-colors" />
          
          <div className="space-y-4">
            <div className="p-3 border border-border-dark/60 bg-secondary-dark/50 w-max group-hover:border-gold-primary/45 transition-colors">
              {point.icon}
            </div>
            <h3 className="font-serif italic text-xl text-white-editorial group-hover:text-gold-primary transition-colors">
              {point.title}
            </h3>
            <p className="text-xs text-muted-text leading-relaxed font-light">
              {point.description}
            </p>
          </div>
          
          {/* Accent indicator */}
          <div className="w-12 h-[1px] bg-border-dark group-hover:bg-gold-primary transition-colors" />
        </motion.div>
      ))}
    </div>
  );
}
