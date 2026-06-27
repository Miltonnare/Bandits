"use client";

import React, { useRef, useState } from "react";
import { Music, Eye, Award, ExternalLink, Zap, Star } from "lucide-react";

interface Bandit {
  name: string;
  avatar: string;
  role: string;
  quote: string;
  song: string;
  inspiration: string;
  bio: string;
  skills: string[];
  process: string;
}

export default function BanditsCard() {
  const bandits: Bandit[] = [
    {
      name: "ROCKSTAR BANDIT",
      avatar: "/assets/rockstar-profile.webp",
      role: "Producer / Creative Director / Strategist",
      quote: `"Silence is the canvas. Sound is the paint."`,
      song: "Silence Has a Sound",
      inspiration: "Kanye West, Travis Scott, Hans Zimmer",
      bio: "Rockstar Bandit is a musician, producer, songwriter, marketer, and creative visionary. As the driving creative force behind 254Bandits, he shapes the group's musical direction, production quality, branding, and long-term vision while crafting emotionally resonant music.",
      skills: ["Audio Engineering", "Creative Direction", "Songwriting", "Brand Strategy", "Visual Production"],
      process: "Begins with cinematic strings, filters them down to a dark sub-level, then sequences complex percussion arrays around emotional high points.",
    },
    {
      name: "RASTA BANDIT",
      avatar: "/assets/rasta-profile.webp",
      role: "Lyricist / Vocalist / Emotional Voice",
      quote: `"We speak for the ones who have forgotten how to scream."`,
      song: "Rockstar Chronicles",
      inspiration: "Kid Cudi, Juice WRLD, Damian Marley",
      bio: "Rasta Bandit is a lyricist, performer, storyteller, and emotional voice of the duo. His introspective writing and calm delivery transform life's hidden emotions into deeply relatable music.",
      skills: ["Introspective Writing", "Melodic Delivery", "Poetry", "Live Performance", "Vocal Coaching"],
      process: "Writes lyrics in total isolation. Records vocals in single, unedited takes to capture raw vocal cracks and genuine emotional states.",
    },
  ];

  // 3D Card Tilt Effect Hooks
  const TiltCard = ({ bandit }: { bandit: Bandit }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      // Adjust rotation ratios (max 10 degrees)
      const rY = (mouseX / (width / 2)) * 10;
      const rX = -(mouseY / (height / 2)) * 10;

      setRotateX(rX);
      setRotateY(rY);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setIsHovered(false);
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? "none" : "transform 0.5s ease-out",
        }}
        className="w-full bg-secondary-dark/60 border border-border-dark relative overflow-hidden group shadow-2xl p-6 md:p-8 flex flex-col justify-between min-h-137.5 cursor-pointer"
      >
        {/* Glowing border effects */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        <div className="absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-accent-red/30 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-100" />

        {/* Backdrop visual elements */}
        <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <DiscIcon name={bandit.name} />
        </div>

        {/* Member Profile Card */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gold-primary tracking-[0.2em]">
              MEMBER CARD // 254B
            </span>
            <span className="text-[9px] font-mono text-muted-text border border-border-dark px-2 py-0.5 uppercase">
              {bandit.name.split(" ")[0]}
            </span>
          </div>

          {/* Editorial Portrait */}
          <div className="w-full h-80 bg-secondary-dark/80 border border-border-dark/60 overflow-hidden relative group-hover:border-gold-primary/30 transition-colors">
            <img
              src={bandit.avatar}
              alt={bandit.name}
              className="w-full h-full object-contain grayscale contrast-[1.1] brightness-[0.8] group-hover:grayscale-0 group-hover:scale-103 group-hover:brightness-100 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-secondary-dark/60 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Member Name */}
          <div>
            <h3 className="font-serif italic text-3xl md:text-4xl text-white-editorial group-hover:text-gold-primary transition-colors">
              {bandit.name}
            </h3>
            <p className="text-xs font-mono text-muted-text mt-1.5 tracking-wider">
              {bandit.role}
            </p>
          </div>

          {/* Quote Card */}
          <div className="border-l border-gold-primary/40 pl-4 py-1 italic text-sm text-gold-primary/80 group-hover:text-gold-primary transition-colors leading-relaxed">
            {bandit.quote}
          </div>

          {/* Bio text */}
          <p className="text-sm text-muted-text leading-relaxed">
            {bandit.bio}
          </p>

          {/* Skills badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {bandit.skills.map((skill) => (
              <span
                key={skill}
                className="text-[9px] font-mono bg-surface-dark border border-border-dark px-2 py-1 text-white-editorial/80 group-hover:border-gold-primary/30 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Member Inner details on Hover */}
        <div className="pt-6 mt-6 border-t border-border-dark/30 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[9px] font-mono text-muted-text block uppercase">
                Creative Process
              </span>
              <span className="text-white-editorial font-serif italic line-clamp-2 mt-1">
                {bandit.process}
              </span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-muted-text block uppercase">
                Primary Inspirations
              </span>
              <span className="text-white-editorial font-sans font-medium line-clamp-2 mt-1">
                {bandit.inspiration}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[9px] font-mono text-gold-primary flex items-center space-x-1.5">
              <Music className="w-3.5 h-3.5" />
              <span>SIG. SONG: {bandit.song}</span>
            </span>
            <span className="text-[9px] font-mono text-muted-text group-hover:text-white-editorial transition-colors flex items-center space-x-1">
              <span>EXPLORE INTERVIEW</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Helper custom icon
  const DiscIcon = ({ name }: { name: string }) => {
    return (
      <svg
        className={`w-36 h-36 ${name.includes("ROCKSTAR") ? "text-gold-primary" : "text-accent-red"}`}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <circle cx="50" cy="50" r="40" strokeDasharray="2,4" />
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="20" strokeDasharray="6,3" />
        <circle cx="50" cy="50" r="10" />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {bandits.map((bandit) => (
        <TiltCard key={bandit.name} bandit={bandit} />
      ))}
    </div>
  );
}
