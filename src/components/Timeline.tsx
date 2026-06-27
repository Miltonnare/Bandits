"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ShieldAlert, Disc, Globe2, Activity, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  tag: string;
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const timelineEvents: TimelineItem[] = [
    {
      year: "2021",
      title: "Nairobi Origins",
      icon: <Activity className="w-5 h-5" />,
      description: "Rockstar and Rasta meet in Eastlands, Nairobi. Drawn together by a shared feeling of isolation, they resolve to give a voice to the emotions young Kenyans rarely express.",
      tag: "THE SPARK",
    },
    {
      year: "2022",
      title: "Silence Has a Sound",
      icon: <Zap className="w-5 h-5" />,
      description: "Defining their manifesto. They formulate a signature hybrid style: blending raw, melodic emo trap guitar loops with traditional Swahili storytelling.",
      tag: "THE FORMULA",
    },
    {
      year: "2023",
      title: "Underground Hustle",
      icon: <ShieldAlert className="w-5 h-5" />,
      description: "Financing bedroom studio setups. Facing heavy pushback from mainstream radio for refusing to conform to high-tempo Afrobeats. The band's brotherhood hardens.",
      tag: "THE RESISTANCE",
    },
    {
      year: "2024",
      title: "First closet tapes",
      icon: <Disc className="w-5 h-5" />,
      description: "Recording raw tracks in makeshift wardrobe sound booths. The release of underground singles sparks a wildfire movement among urban youth searching for vulnerability.",
      tag: "THE BREAKOUT",
    },
    {
      year: "2025",
      title: "Resonating Community",
      icon: <Globe2 className="w-5 h-5" />,
      description: "Building the Bandit fanbase. The community swells into a cultural phenomenon. Rockstar optimizes high-fidelity production while Rasta delivers introspective lyricism.",
      tag: "THE HEALING",
    },
    {
      year: "2026 & Beyond",
      title: "Global Soundwave",
      icon: <Activity className="w-5 h-5" />,
      description: "Taking Kenyan Emo Rap to the world stage. Securing international booking inquiries, planning worldwide collabs, and empowering African youth through creative agency.",
      tag: "THE FUTURE",
    },
  ];

  useEffect(() => {
    // GSAP Horizontal Scroll pinned section
    const pin = gsap.fromTo(
      containerRef.current,
      { translateX: 0 },
      {
        translateX: () => -(containerRef.current?.scrollWidth || 0) + window.innerWidth * 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${containerRef.current?.scrollWidth || 1000}`,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      pin.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative overflow-hidden select-none bg-background-dark py-20">
      {/* Pinned background labels */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 pointer-events-none opacity-[0.02] font-serif text-[18vw] font-bold text-white-editorial tracking-tighter select-none">
        CHRONICLES
      </div>

      <div className="max-w-[90%] mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
            Documentary Timeline
          </span>
          <h2 className="font-serif italic text-4xl md:text-5xl text-white-editorial font-medium">
            How Silence Found a Voice.
          </h2>
        </div>
        <div className="text-xs font-mono text-muted-text/80 tracking-widest border border-border-dark px-3 py-1 bg-surface-dark/40">
          * SCROLL DOWN TO TRANSLATE CHRONOLOGY
        </div>
      </div>

      {/* Horizontal Container */}
      <div className="relative flex items-center h-112.5">
        <div
          ref={containerRef}
          className="flex space-x-12 px-[5%] will-change-transform"
        >
          {timelineEvents.map((event, index) => (
            <div
              key={event.title}
              className="w-70 md:w-87.5 bg-secondary-dark/60 border border-border-dark p-8 flex flex-col justify-between h-90 relative shrink-0"
            >
              {/* Year marker */}
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-4xl text-gold-primary text-gold-glow">
                  {event.year}
                </span>
                <span className="text-[9px] font-mono border border-border-dark px-2 py-0.5 text-muted-text">
                  {event.tag}
                </span>
              </div>

              {/* Central connection line dots decoration */}
              <div className="absolute left-0 top-[40%] right-0 h-px bg-border-dark/40 pointer-events-none">
                <div className="absolute -left-1.25 -top-1 w-2.5 h-2.5 rounded-full border border-gold-primary bg-background-dark" />
              </div>

              {/* Title & Description */}
              <div className="space-y-4 pt-12">
                <div className="flex items-center space-x-3">
                  <div className="p-2 border border-gold-primary/30 text-gold-primary bg-gold-primary/5">
                    {event.icon}
                  </div>
                  <h3 className="font-serif italic text-lg text-white-editorial font-medium leading-tight">
                    {event.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-text leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Footer step label */}
              <div className="border-t border-border-dark/30 pt-3 flex justify-between items-center text-[10px] font-mono text-muted-text/60">
                <span>STAGE {index + 1} OF {timelineEvents.length}</span>
                <span>• REVEALED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
