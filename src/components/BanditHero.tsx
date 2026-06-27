"use client";

import React, { useEffect, useRef } from "react";
import { Play, Calendar, User, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function BanditHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; r: number; speedY: number; opacity: number; amp: number; freq: number; t: number }[] = [];
    const numParticles = 40;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height, // Start from bottom or mid-screen
        r: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.6 + 0.2),
        opacity: Math.random() * 0.4 + 0.1,
        amp: Math.random() * 25 + 5,
        freq: Math.random() * 0.005 + 0.002,
        t: Math.random() * 100,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.t += 0.5;
        // Wave movement horizontally
        const xOffset = Math.sin(p.t * p.freq) * (p.amp * 0.1);
        
        ctx.beginPath();
        ctx.arc(p.x + xOffset, p.y, p.r, 0, Math.PI * 2);
        
        // Draw gold ember glow
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
        ctx.fill();

        // Recycle particle to bottom if it floats off top
        if (p.y < -10) {
          p.y = height + Math.random() * 50;
          p.x = Math.random() * width;
        }
      });

      requestAnimationFrame(drawParticles);
    };

    drawParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-background-dark select-none">
      {/* Brand image backdrop with premium overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 opacity-[0.22] pointer-events-none mix-blend-luminosity filter saturate-[0.1] contrast-[1.1] blur-[1px]"
        style={{ backgroundImage: `url('/assets/hero-bg.jpg')` }}
      />
      
      {/* Ambient gradient sweeps */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[35vw] bg-accent-red/5 rounded-full blur-[140px] pointer-events-none animated-mesh-1" />
      <div className="absolute bottom-10 right-10 w-[40vw] h-[25vw] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none animated-mesh-2" />

      {/* Floating Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Header / Brand Logo */}
      <header className="relative w-full max-w-[90%] mx-auto py-8 z-20 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-serif italic text-2xl font-bold tracking-widest text-white-editorial">
            254B
          </span>
          <span className="text-[8px] font-mono text-gold-primary tracking-widest uppercase mt-0.5">
            SILENCE HAS A SOUND
          </span>
        </div>
        
        {/* Navigation list */}
        <nav className="hidden md:flex items-center space-x-8 text-[10px] font-mono tracking-[0.25em] text-muted-text">
          <button onClick={() => scrollToSection("about")} className="hover:text-gold-primary transition-colors cursor-pointer">ABOUT</button>
          <button onClick={() => scrollToSection("timeline")} className="hover:text-gold-primary transition-colors cursor-pointer">CHRONICLES</button>
          <button onClick={() => scrollToSection("bandits")} className="hover:text-gold-primary transition-colors cursor-pointer">MEMBERS</button>
          <button onClick={() => scrollToSection("discography")} className="hover:text-gold-primary transition-colors cursor-pointer">DISCOGRAPHY</button>
          <button onClick={() => scrollToSection("merchandise")} className="hover:text-gold-primary transition-colors cursor-pointer">SHOP</button>
          <button onClick={() => scrollToSection("booking")} className="hover:text-gold-primary transition-colors cursor-pointer">BOOKINGS</button>
        </nav>
      </header>

      {/* Hero Headline content */}
      <main className="relative w-full max-w-[90%] mx-auto flex-1 flex flex-col justify-center items-start z-20 pt-16">
        <div className="space-y-6 max-w-4xl">
          {/* Accent flag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 border border-gold-primary/30 bg-gold-primary/5 px-3 py-1 font-mono text-[10px] tracking-widest text-gold-primary"
          >
            <span className="w-1.5 h-1.5 bg-accent-red rounded-full animate-ping" />
            <span>KENYA TO THE WORLD // OFFICIAL DIGITAL HEADQUARTERS</span>
          </motion.div>

          {/* Title */}
          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-6xl md:text-8xl lg:text-[7.5rem] font-medium tracking-tight text-white-editorial leading-[0.9] text-glow select-none"
            >
              Silence Has <br />
              <span className="text-gold-primary text-gold-glow">a Sound.</span>
            </motion.h2>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-sm md:text-lg text-muted-text font-light tracking-wide max-w-xl leading-relaxed"
          >
            We are <span className="text-white-editorial font-medium">254Bandits</span>. redefining emotional storytelling in East Africa. Blending vulnerability, neo-noir atmospheres, and Afrofuturistic hip-hop.
          </motion.p>

          {/* Call to Actions (CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection("discography")}
              className="magnetic-btn px-8 py-4 bg-gold-primary hover:bg-transparent hover:text-gold-primary text-background-dark border border-gold-primary font-display font-medium text-xs tracking-widest transition-all duration-300 flex items-center space-x-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>LISTEN NOW</span>
            </button>
            <button
              onClick={() => scrollToSection("bandits")}
              className="magnetic-btn px-8 py-4 border border-border-dark hover:border-gold-primary text-white-editorial hover:text-gold-primary bg-secondary-dark/40 font-display font-medium text-xs tracking-widest transition-all duration-300 flex items-center space-x-2"
            >
              <User className="w-3.5 h-3.5" />
              <span>MEET BANDITS</span>
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="magnetic-btn px-8 py-4 border border-gold-primary/40 hover:border-gold-primary text-gold-primary bg-gold-primary/5 font-display font-medium text-xs tracking-widest transition-all duration-300 flex items-center space-x-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>BOOK US</span>
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer trigger */}
      <footer className="relative w-full max-w-[90%] mx-auto py-8 z-20 flex justify-between items-center text-[10px] font-mono text-muted-text tracking-widest border-t border-border-dark/20">
        <span>© 2026 254BANDITS / ALL RIGHTS RESERVED</span>
        <button
          onClick={() => scrollToSection("about")}
          className="hover:text-gold-primary transition-colors flex items-center space-x-2 animate-bounce cursor-pointer"
        >
          <span>SCROLL DOWN</span>
          <ArrowDown className="w-3 h-3" />
        </button>
      </footer>
    </div>
  );
}
