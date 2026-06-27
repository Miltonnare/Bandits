"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Calendar, ExternalLink, Download, 
  MapPin, Clock, ArrowRight, Radio, Film, Image as ImageIcon,
  Compass, Award, Globe, Heart, Send, Check
} from "lucide-react";

// Import custom interactive components
import IntroScreen from "@/components/IntroScreen";
import BanditHero from "@/components/BanditHero";
import BanditsCard from "@/components/BanditsCard";
import Timeline from "@/components/Timeline";
import Discography from "@/components/Discography";
import MerchShowcase from "@/components/MerchShowcase";
import BookingForm from "@/components/BookingForm";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleEnterHeadquarters = (enableSound: boolean) => {
    setSoundEnabled(enableSound);
    setShowIntro(false);
  };

  // Video showcase datasets
  const videoClips = [
    {
      id: "v1",
      title: "marafiki (Official Audio)",
      category: "NIKO ALONE",
      duration: "03:09",
      thumb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='100%25' height='100%25' fill='%230F0F10'/%3E%3Ccircle cx='160' cy='90' r='30' fill='%23C1121F' opacity='0.2'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-style='italic' fill='%23D4AF37' font-size='12'%3Emarafiki (Audio)%3C/text%3E%3C/svg%3E",
      url: "https://www.youtube.com/embed/WgSNVisMiJg",
    },
    {
      id: "v2",
      title: "niko alone (Official Audio)",
      category: "NIKO ALONE",
      duration: "02:37",
      thumb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='100%25' height='100%25' fill='%230F0F10'/%3E%3Cpath d='M120,60 L220,90 L120,120 Z' fill='%23D4AF37' opacity='0.15'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' fill='%23F9F9F9' font-size='12'%3Eniko alone (Audio)%3C/text%3E%3C/svg%3E",
      url: "https://www.youtube.com/embed/37PI-GU_rUA",
    },
    {
      id: "v3",
      title: "rock na rasta (Official Audio)",
      category: "FINN SAVAGE",
      duration: "03:05",
      thumb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='100%25' height='100%25' fill='%230F0F10'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' fill='%23C1121F' font-size='12'%3Erock na rasta%3C/text%3E%3C/svg%3E",
      url: "https://www.youtube.com/embed/WtLzPrVLimE",
    },
  ];

  // Gallery grid datasets
  const galleryPhotos = [
    { id: "g1", category: "STUDIO", title: "Nights in Eastlands Studio", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='100%25' height='100%25' fill='%23181818'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-style='italic' fill='%23D4AF37' font-size='12'%3ESTUDIO NOIR%3C/text%3E%3C/svg%3E" },
    { id: "g2", category: "LIFESTREET", title: "Cyber-Dread Aesthetics", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect width='100%25' height='100%25' fill='%23181818'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' fill='%23F9F9F9' font-size='12'%3ESTREET NOIR%3C/text%3E%3C/svg%3E" },
    { id: "g3", category: "CONCERT", title: "Nairobi Emo Fest Headliner", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Crect width='100%25' height='100%25' fill='%23181818'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' fill='%23C1121F' font-size='12'%3ELIVE NOISE%3C/text%3E%3C/svg%3E" },
    { id: "g4", category: "BACKSTAGE", title: "Pre-Show Rituals", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='100%25' height='100%25' fill='%23181818'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' fill='%23A5A5A5' font-size='12'%3EBACKSTAGE MEDITATION%3C/text%3E%3C/svg%3E" },
  ];

  // Upcoming tours datasets
  const tours = [
    { id: "t1", date: "AUG 14", venue: "The Alchemist Bar", city: "Nairobi, KE", time: "20:00 EAT", status: "SELLING FAST" },
    { id: "t2", date: "SEP 05", venue: "KOKO London", city: "London, UK", time: "19:30 GMT", status: "TICKETS" },
    { id: "t3", date: "SEP 22", venue: "The Roxy Theatre", city: "Los Angeles, US", time: "20:00 PST", status: "TICKETS" },
    { id: "t4", date: "OCT 12", venue: "LIQUID Tokyo", city: "Tokyo, JP", time: "19:00 JST", status: "SOLD OUT" },
  ];

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroScreen onEnter={handleEnterHeadquarters} />}
      </AnimatePresence>

      {!showIntro && (
        <div className="relative min-h-screen bg-background-dark text-white-editorial overflow-hidden">
          
          {/* Ambient soundtrack controls */}
          <AudioPlayer isSoundEnabled={soundEnabled} />

          {/* SECTION 1: HERO */}
          <section id="hero">
            <BanditHero />
          </section>

          {/* SECTION 2: ABOUT / MANIFESTO */}
          <section id="about" className="py-24 border-t border-border-dark/20 relative select-none">
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent-red/5 rounded-full blur-[100px]" />
            
            <div className="max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                  THE MANIFESTO // WHO WE ARE
                </span>
                <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white-editorial font-medium leading-tight">
                  We translate <br />
                  what the world <br />
                  keeps silent.
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
                <p className="font-serif italic text-xl md:text-2xl text-gold-primary/95 leading-relaxed">
                  "254Bandits is a Kenyan emo rap duo redefining emotional storytelling in East Africa. Our music is a sanctuary for vulnerability."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-text leading-relaxed font-light">
                  <p>
                    We were told that strength means silence. In Nairobi's bustling noise, we found that true power lies in vulnerability. Rockstar Bandit constructs the dark, atmospheric audio blueprints, while Rasta Bandit weaves introspective lyrical narratives that give shape to hidden scars.
                  </p>
                  <p>
                    Together, we combine modern Western emo-rap melodies with native Swahili poetic rhythm. We are not just creating tracks; we are building Africa's largest emotional rap movement, showing a generation how to speak their truth.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: TIMELINE (HORIZONTAL PINNED CHRONICLE) */}
          <section id="timeline">
            <Timeline />
          </section>

          {/* SECTION 4: MEET THE BANDITS */}
          <section id="bandits" className="py-24 border-y border-border-dark/20 relative">
            <div className="max-w-[90%] mx-auto mb-16 space-y-3">
              <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                Band Members
              </span>
              <h2 className="font-serif italic text-4xl md:text-5xl text-white-editorial font-medium">
                The Architects of Sound.
              </h2>
            </div>
            <div className="max-w-[90%] mx-auto">
              <BanditsCard />
            </div>
          </section>

          {/* SECTION 5: DISCOGRAPHY */}
          <section id="discography" className="py-24 bg-secondary-dark/30 relative">
            <div className="max-w-[90%] mx-auto mb-16 space-y-3">
              <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                THE DISCOGRAPHY
              </span>
              <h2 className="font-serif italic text-4xl md:text-5xl text-white-editorial font-medium">
                Resonating Frequencies.
              </h2>
            </div>
            <div className="max-w-[90%] mx-auto">
              <Discography />
            </div>
          </section>

          {/* SECTION 6: VIDEOS SHOWCASE */}
          <section id="videos" className="py-24 border-y border-border-dark/20 relative select-none">
            <div className="max-w-[90%] mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                  IMMERSIVE VIDEOS
                </span>
                <h2 className="font-serif italic text-4xl md:text-5xl text-white-editorial font-medium">
                  Cinematic Realities.
                </h2>
              </div>
              <span className="text-xs font-mono text-muted-text/80 tracking-widest">
                * CLICK TO LAUNCH HIGH-RES THEATRIC PLAYER
              </span>
            </div>

            <div className="max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {videoClips.map((clip) => (
                <div
                  key={clip.id}
                  onClick={() => setSelectedVideo(clip.url)}
                  className="frosted-card group overflow-hidden cursor-pointer"
                >
                  <div className="relative aspect-video bg-black">
                    <img
                      src={clip.thumb}
                      alt={clip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Hover state icon */}
                    <div className="absolute inset-0 bg-background-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-gold-primary flex items-center justify-center text-gold-primary bg-gold-primary/10">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-muted-text uppercase">
                      <span className="text-gold-primary">{clip.category}</span>
                      <span>{clip.duration}</span>
                    </div>
                    <h4 className="font-serif italic text-lg text-white-editorial group-hover:text-gold-primary transition-colors leading-snug">
                      {clip.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7: PHOTO GALLERY */}
          <section id="gallery" className="py-24 relative select-none">
            <div className="max-w-[90%] mx-auto mb-16 space-y-3">
              <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                PHOTO STREAM
              </span>
              <h2 className="font-serif italic text-4xl md:text-5xl text-white-editorial font-medium">
                Visual Artifacts.
              </h2>
            </div>

            <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedImage(photo.img)}
                  className="frosted-card group overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] bg-surface-dark overflow-hidden">
                    <img
                      src={photo.img}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-background-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-mono text-gold-primary tracking-widest">
                        EXPAND PHOTO
                      </span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-border-dark/30">
                    <span className="text-[9px] font-mono text-gold-primary block uppercase">
                      {photo.category}
                    </span>
                    <h4 className="font-serif italic text-sm text-white-editorial truncate mt-1">
                      {photo.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: GLOBAL IMPACT (3D GLOBE) */}
          <section id="global-impact" className="py-24 border-y border-border-dark/20 bg-secondary-dark/10 relative">
            <div className="max-w-[90%] mx-auto">
              <InteractiveGlobe />
            </div>
          </section>

          {/* SECTION 9: MERCHANDISE */}
          <section id="merchandise" className="py-24 relative select-none">
            <div className="max-w-[90%] mx-auto mb-16 space-y-3">
              <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                Luxury eCommerce
              </span>
              <h2 className="font-serif italic text-4xl md:text-5xl text-white-editorial font-medium">
                Bandit Gear (Edition I).
              </h2>
            </div>
            <div className="max-w-[90%] mx-auto">
              <MerchShowcase />
            </div>
          </section>

          {/* SECTION 10: EVENTS & TICKETS */}
          <section id="events" className="py-24 border-t border-border-dark/20 bg-secondary-dark/30 relative select-none">
            <div className="max-w-[90%] mx-auto mb-16 space-y-3">
              <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                LIVE PERFORMANCES
              </span>
              <h2 className="font-serif italic text-4xl md:text-5xl text-white-editorial font-medium">
                Resonance Locations.
              </h2>
            </div>

            <div className="max-w-[90%] mx-auto space-y-4">
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  className="frosted-glass p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-gold-primary/40 transition-all duration-300"
                >
                  {/* Date Block */}
                  <div className="flex items-center space-x-6 w-full md:w-auto">
                    <span className="font-display font-bold text-2xl text-gold-primary w-24">
                      {tour.date}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-serif italic text-xl text-white-editorial group-hover:text-gold-primary transition-colors font-medium">
                        {tour.venue}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-text font-light">
                        <MapPin className="w-3.5 h-3.5 text-accent-red" />
                        <span>{tour.city}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{tour.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Tickets */}
                  <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
                    <span className={`text-[10px] font-mono tracking-widest px-2 py-0.5 border ${
                      tour.status === "SOLD OUT" 
                        ? "border-accent-red/20 text-accent-red bg-accent-red/5"
                        : "border-gold-primary/20 text-gold-primary bg-gold-primary/5"
                    }`}>
                      {tour.status}
                    </span>
                    {tour.status !== "SOLD OUT" && (
                      <button className="magnetic-btn px-6 py-2.5 bg-gold-primary text-background-dark font-display font-medium text-xs tracking-widest hover:bg-transparent hover:text-gold-primary border border-gold-primary transition-all duration-300 flex items-center space-x-1.5">
                        <span>GET TICKETS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 11: NEWSROOM & ELECTRONIC PRESS KIT (EPK) */}
          <section id="press-kit" className="py-24 border-y border-border-dark/20 relative select-none">
            <div className="max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Newsroom Editorial Column */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                    EDITORIAL JOURNAL
                  </span>
                  <h3 className="font-serif italic text-3xl md:text-4xl text-white-editorial font-medium">
                    The Pressroom.
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Article 1 */}
                  <article className="border-b border-border-dark/40 pb-6 space-y-2 group cursor-pointer">
                    <span className="text-[10px] font-mono text-muted-text">PRESS RELEASE / DEC 2025</span>
                    <h4 className="font-serif italic text-xl text-white-editorial group-hover:text-gold-primary transition-colors leading-snug">
                      "254Bandits redefine vulnerability in East African Hip Hop with breakout track Silence Has a Sound."
                    </h4>
                    <p className="text-xs text-muted-text font-light leading-relaxed">
                      Music critics worldwide highlight the duo's cinematic low-pass instrumentation and raw poetic delivery, marking them as Kenya's voice of a new generation.
                    </p>
                  </article>
                  {/* Article 2 */}
                  <article className="pb-2 space-y-2 group cursor-pointer">
                    <span className="text-[10px] font-mono text-muted-text">INTERVIEW / APR 2026</span>
                    <h4 className="font-serif italic text-xl text-white-editorial group-hover:text-gold-primary transition-colors leading-snug">
                      "Behind the Noir Masks: A sit-down dialogue with Rockstar and Rasta Bandit on creative isolation."
                    </h4>
                    <p className="text-xs text-muted-text font-light leading-relaxed">
                      Exploring the recording process inside bedroom wardrobes, engineering sub-basses, and refusing commercial Afrobeats constructs.
                    </p>
                  </article>
                </div>
              </div>

              {/* Electronic Press Kit (EPK) */}
              <div className="lg:col-span-5 border-l border-border-dark/30 lg:pl-12 space-y-8">
                <div className="space-y-3">
                  <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                    MEDIA KIT PACK
                  </span>
                  <h3 className="font-serif italic text-3xl text-white-editorial font-medium">
                    Electronic Press Kit.
                  </h3>
                </div>

                <p className="text-xs text-muted-text leading-relaxed font-light">
                  Download approved technical spec rider materials, bio logs, logos, and high-resolution visual portraits for press releases and festival lineups.
                </p>

                <div className="space-y-4">
                  {/* Download item 1 */}
                  <div className="flex justify-between items-center border border-border-dark p-4 bg-secondary-dark/40 hover:border-gold-primary/40 transition-colors">
                    <div className="space-y-1">
                      <span className="text-xs font-display font-medium text-white-editorial block">
                        Technical Spec Rider
                      </span>
                      <span className="text-[9px] font-mono text-muted-text">
                        PDF FILE / 2.4 MB
                      </span>
                    </div>
                    <button className="p-2 border border-border-dark text-muted-text hover:border-gold-primary hover:text-gold-primary transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Download item 2 */}
                  <div className="flex justify-between items-center border border-border-dark p-4 bg-secondary-dark/40 hover:border-gold-primary/40 transition-colors">
                    <div className="space-y-1">
                      <span className="text-xs font-display font-medium text-white-editorial block">
                        Press Assets & Logos
                      </span>
                      <span className="text-[9px] font-mono text-muted-text">
                        ZIP FILE / 14.8 MB
                      </span>
                    </div>
                    <button className="p-2 border border-border-dark text-muted-text hover:border-gold-primary hover:text-gold-primary transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 12: BRAND COLLABORATIONS */}
          <section id="collaborations" className="py-16 select-none bg-secondary-dark/10">
            <div className="max-w-[90%] mx-auto flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-35 hover:opacity-60 transition-opacity duration-300">
              <span className="font-serif italic text-lg text-white-editorial font-semibold tracking-widest">SPOTIFY</span>
              <span className="font-serif italic text-lg text-white-editorial font-semibold tracking-widest">APPLE MUSIC</span>
              <span className="font-serif italic text-lg text-white-editorial font-semibold tracking-widest">NIKE</span>
              <span className="font-serif italic text-lg text-white-editorial font-semibold tracking-widest">SONY MUSIC</span>
              <span className="font-serif italic text-lg text-white-editorial font-semibold tracking-widest">UNIVERSAL MUSIC</span>
            </div>
          </section>

          {/* SECTION 13: BOOKINGS */}
          <section id="booking" className="py-24 relative select-none">
            {/* Background Glow */}
            <div className="absolute top-1/3 right-10 w-96 h-96 bg-accent-red/5 rounded-full blur-[140px] pointer-events-none" />
            
            <div className="max-w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                    SECURE REPRESENTATION
                  </span>
                  <h2 className="font-serif italic text-4xl md:text-5xl text-white-editorial font-medium leading-tight">
                    Book the <br />
                    Bandits.
                  </h2>
                </div>
                <p className="text-sm text-muted-text leading-relaxed font-light">
                  For festival billing, interviews, brand collaborations, performance inquiries, and custom audio engineering requests, secure connection coordinates using the booking form.
                </p>
                <div className="space-y-1 font-mono text-[10px] text-muted-text tracking-widest uppercase">
                  <div>GENERAL INQUIRIES: booking@254bandits.com</div>
                  <div>MANAGEMENT: agency@254bandits.com</div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <BookingForm />
              </div>
            </div>
          </section>

          {/* SECTION 14: CINEMATIC FOOTER */}
          <footer className="bg-secondary-dark border-t border-border-dark/40 py-20 relative select-none">
            <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {/* Branding column */}
              <div className="space-y-4">
                <h3 className="font-serif italic text-3xl font-bold tracking-widest text-white-editorial leading-none">
                  254BANDITS
                </h3>
                <p className="text-xs text-muted-text max-w-xs font-light leading-relaxed">
                  Silence has a sound. re-engineering vulnerability in East Africa through premium neo-noir storytelling.
                </p>
              </div>

              {/* Navigation list */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-gold-primary tracking-widest uppercase">
                  QUICK NAVIGATION
                </h4>
                <div className="flex flex-col space-y-2 text-xs font-mono text-muted-text">
                  <a href="#hero" className="hover:text-white-editorial transition-colors">BACK TO TOP</a>
                  <a href="#about" className="hover:text-white-editorial transition-colors">THE MANIFESTO</a>
                  <a href="#timeline" className="hover:text-white-editorial transition-colors">THE TIMELINE</a>
                  <a href="#bandits" className="hover:text-white-editorial transition-colors">THE MEMBERS</a>
                  <a href="#discography" className="hover:text-white-editorial transition-colors">RELEASES</a>
                  <a href="#merchandise" className="hover:text-white-editorial transition-colors">MERCH SHOP</a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-gold-primary tracking-widest uppercase">
                  CHANNELS
                </h4>
                <div className="flex flex-col space-y-2 text-xs font-mono text-muted-text">
                  <a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-white-editorial transition-colors">SPOTIFY</a>
                  <a href="https://apple.com" target="_blank" rel="noreferrer" className="hover:text-white-editorial transition-colors">APPLE MUSIC</a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white-editorial transition-colors">INSTAGRAM</a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white-editorial transition-colors">YOUTUBE</a>
                  <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-white-editorial transition-colors">DISCORD (COMMUNITY)</a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-gold-primary tracking-widest uppercase">
                  THE SILENT ENCRYPT
                </h4>
                <p className="text-xs text-muted-text leading-relaxed font-light">
                  Subscribe to receive encrypted newsletters, early merch releases, and private track links.
                </p>
                <div className="flex border border-border-dark overflow-hidden">
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    className="w-full bg-background-dark text-xs p-3 text-white-editorial outline-none placeholder:text-muted-text/30 font-sans"
                  />
                  <button className="bg-gold-primary text-background-dark px-4 font-mono text-[10px] tracking-widest hover:bg-transparent hover:text-gold-primary transition-all duration-300 border-l border-gold-primary flex items-center justify-center">
                    JOIN
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="max-w-[90%] mx-auto mt-16 pt-8 border-t border-border-dark/30 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted-text/60">
              <span>© 2026 254BANDITS / DESIGN & ARCHITECTURE BY ANTIGRAVITY</span>
              <div className="flex space-x-6">
                <a href="#privacy" className="hover:text-white-editorial transition-colors">PRIVACY POLICY</a>
                <a href="#terms" className="hover:text-white-editorial transition-colors">TERMS OF SERVICE</a>
              </div>
            </div>
          </footer>

          {/* Video Lightbox Player Overlay */}
          <AnimatePresence>
            {selectedVideo && (
              <div className="fixed inset-0 z-[300] bg-background-dark/95 backdrop-blur-md flex items-center justify-center p-4 select-none">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-10 px-4 py-2 border border-border-dark hover:border-white-editorial text-[10px] font-mono tracking-widest text-muted-text hover:text-white-editorial transition-all"
                >
                  CLOSE PLAYER
                </button>
                <div className="w-full max-w-4xl aspect-video border border-border-dark/60 bg-black">
                  <iframe
                    src={selectedVideo}
                    title="Immersive Bandit Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Image Lightbox Overlay */}
          <AnimatePresence>
            {selectedImage && (
              <div className="fixed inset-0 z-[300] bg-background-dark/95 backdrop-blur-md flex items-center justify-center p-4 select-none" onClick={() => setSelectedImage(null)}>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 px-4 py-2 border border-border-dark text-[10px] font-mono tracking-widest text-muted-text hover:text-white-editorial transition-all"
                >
                  CLOSE LIGHTBOX
                </button>
                <div className="max-w-4xl max-h-[85vh] overflow-hidden border border-border-dark/40 bg-black">
                  <img
                    src={selectedImage}
                    alt="Expanded Visual Artifact"
                    className="w-auto h-auto max-h-[85vh] object-contain"
                  />
                </div>
              </div>
            )}
          </AnimatePresence>

        </div>
      )}
    </>
  );
}
