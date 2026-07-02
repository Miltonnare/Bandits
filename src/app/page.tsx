"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Calendar, ExternalLink, Download, 
  MapPin, Clock, ArrowRight, Radio, Film, Image as ImageIcon,
  Compass, Award, Globe, Heart, Send, Check, Phone
} from "lucide-react";

// Import custom interactive components
import IntroScreen from "@/components/IntroScreen";
import BanditHero from "@/components/BanditHero";
import BanditsCard from "@/components/BanditsCard";
import Timeline from "@/components/Timeline";
import Discography from "@/components/Discography";
import BookingForm from "@/components/BookingForm";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import AudioPlayer from "@/components/AudioPlayer";
import WhyBandits from "@/components/WhyBandits";

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
    {
      id: "v4",
      title: "catch a body (Official Audio)",
      category: "FINN SAVAGE",
      duration: "02:15",
      thumb: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='100%25' height='100%25' fill='%230F0F10'/%3E%3Ccircle cx='160' cy='90' r='25' fill='%23D4AF37' opacity='0.15'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' fill='%23C1121F' font-size='11'%3Ecatch a body%3C/text%3E%3C/svg%3E",
      url: "https://www.youtube.com/embed/gc8pEDZ7GeU",
    },
  ];

  // Gallery grid datasets
  const galleryPhotos = [
    { id: "g1", category: "STUDIO", title: "Nights in Eastlands Studio", img: "/assets/rockstar-action.webp" },
    { id: "g2", category: "LIFESTREET", title: "Cyber-Dread Aesthetics", img: "/assets/rasta-action.webp" },
    { id: "g3", category: "CONCERT", title: "Nairobi Emo Fest Headliner", img: "/assets/rockstar-bomber.webp" },
    { id: "g4", category: "BACKSTAGE", title: "Pre-Show Rituals", img: "/assets/pre-show-ritual.webp" },
  ];

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroScreen onEnter={handleEnterHeadquarters} />}
      </AnimatePresence>

      {!showIntro && (
        <div className="relative min-h-screen bg-background-dark text-white-editorial overflow-hidden">
          
          {/* Global brand logo background image watermark */}
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08] pointer-events-none mix-blend-luminosity filter saturate-[0.1] contrast-[1.15] z-0"
            style={{ backgroundImage: `url('/assets/hero-bg.webp')` }}
          />

          {/* Floating Contact CTA */}
          <div className="fixed bottom-24 right-6 z-250 flex items-center space-x-3 select-none">
            <a 
              href="tel:+254741423757" 
              className="frosted-glass flex items-center justify-center w-12 h-12 text-gold-primary hover:bg-gold-primary hover:text-background-dark border border-gold-primary/30 transition-all duration-300 shadow-xl cursor-pointer"
              title="Call Management"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
          
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
                  <div className="relative aspect-3/4 bg-surface-dark overflow-hidden">
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
          {/* SECTION 12: WHY 254BANDITS */}
          <section id="why-bandits" className="py-24 bg-secondary-dark/10 relative">
            <div className="max-w-[90%] mx-auto mb-16 space-y-3">
              <span className="text-gold-primary text-xs font-mono tracking-widest uppercase">
                CORE PROPOSITIONS
              </span>
              <h2 className="font-serif italic text-4xl md:text-5xl text-white-editorial font-medium">
                Why 254Bandits.
              </h2>
            </div>
            <div className="max-w-[90%] mx-auto">
              <WhyBandits />
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
                  <div>
                    GENERAL INQUIRIES:{" "}
                    <a
                      href="mailto:rockstarbandit20@gmail.com"
                      className="hover:text-gold-primary transition-colors text-white-editorial cursor-pointer"
                    >
                      rockstarbandit20@gmail.com
                    </a>
                  </div>
                  <div className="text-gold-primary font-semibold">PHONE: +254 741423757</div>
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
                <div className="text-[10px] font-mono text-gold-primary tracking-wider uppercase pt-2 space-y-1">
                  <div>PHONE: +254 741423757</div>
                  <div>
                    EMAIL:{" "}
                    <a
                      href="mailto:rockstarbandit20@gmail.com"
                      className="hover:text-white-editorial transition-colors text-gold-primary cursor-pointer"
                    >
                      rockstarbandit20@gmail.com
                    </a>
                  </div>
                </div>
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
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono text-gold-primary tracking-widest uppercase">
                  CHANNELS
                </h4>
                <div className="flex flex-col space-y-2 text-xs font-mono text-muted-text">
                  <a href="https://open.spotify.com/artist/0qfSt9N3drC7y1QG0YNeY6" target="_blank" rel="noreferrer" className="hover:text-white-editorial transition-colors">SPOTIFY</a>
                  <a href="https://music.apple.com/us/artist/bandits/1821566959" target="_blank" rel="noreferrer" className="hover:text-white-editorial transition-colors">APPLE MUSIC</a>
                  <a href="https://www.instagram.com/254bandits/" target="_blank" rel="noreferrer" className="hover:text-white-editorial transition-colors">INSTAGRAM</a>
                  <a href="https://youtube.com/@254bandits?si=vJZCTAgV5nSwfi4Y" target="_blank" rel="noreferrer" className="hover:text-white-editorial transition-colors">YOUTUBE</a>
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
              <span>© 2026 254BANDITS / DESIGN & ARCHITECTURE BY MILTONNARE</span>
              <div className="flex space-x-6">
                <a href="#privacy" className="hover:text-white-editorial transition-colors">PRIVACY POLICY</a>
                <a href="#terms" className="hover:text-white-editorial transition-colors">TERMS OF SERVICE</a>
              </div>
            </div>
          </footer>

          {/* Video Lightbox Player Overlay */}
          <AnimatePresence>
            {selectedVideo && (
              <div className="fixed inset-0 z-300 bg-background-dark/95 backdrop-blur-md flex items-center justify-center p-4 select-none">
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
              <div className="fixed inset-0 z-300 bg-background-dark/95 backdrop-blur-md flex items-center justify-center p-4 select-none" onClick={() => setSelectedImage(null)}>
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
