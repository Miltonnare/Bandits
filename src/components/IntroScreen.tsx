"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play } from "lucide-react";

interface IntroScreenProps {
  onEnter: (enableSound: boolean) => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 1. Simulate loading progress
  useEffect(() => {
    const duration = 2400; // 2.4s loading
    const interval = 30;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-background-dark p-8 md:p-12 overflow-hidden select-none"
      >
        {/* Soft Ambient Gold/Red Glows in Background */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-accent-red opacity-10 blur-[120px] animated-mesh-1" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-gold-primary opacity-5 blur-[100px] animated-mesh-2" />

        {/* Top Header info */}
        <div className="w-full flex justify-between items-center text-[10px] tracking-[0.25em] font-mono text-muted-text uppercase">
          <span>PROJECT / 254B</span>
          <span>EST. 2026 / KENYA</span>
        </div>

        {/* Center Logo & Heartbeat Visualizer */}
        <div className="flex flex-col items-center justify-center space-y-12">
          {/* Logo with Sweep Effect */}
          <div className="relative group">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-serif italic text-5xl md:text-8xl font-medium tracking-[0.2em] text-white-editorial text-center relative select-none leading-none"
            >
              254BANDITS
            </motion.h1>
            {/* Gold sweep gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent -translate-x-full group-hover:animate-[sweep_1.5s_ease-in-out_infinite] pointer-events-none mix-blend-color-dodge" />
          </div>

          {/* Heartbeat Waveform SVG */}
          <div className="h-16 flex items-center justify-center">
            <svg
              className="w-48 h-12 text-accent-red"
              viewBox="0 0 200 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Animated heartbeat path */}
              <motion.path
                d="M 10,25 L 50,25 L 60,10 L 70,40 L 80,25 L 120,25 L 125,5 L 132,45 L 140,25 L 190,25"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: [0.2, 1, 0.2] }}
                transition={{
                  pathLength: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.1, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </svg>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-serif italic text-lg md:text-xl text-gold-primary tracking-widest text-center"
          >
            "Silence Has a Sound."
          </motion.p>
        </div>

        {/* Bottom Loading Progress OR Interactive Enter Button */}
        <div className="w-full max-w-sm flex flex-col items-center space-y-6">
          {!isLoaded ? (
            <div className="w-full flex flex-col items-center space-y-3">
              <span className="font-mono text-xs tracking-widest text-muted-text">
                RESONATING SILENCE... {Math.round(progress)}%
              </span>
              <div className="w-full h-[1px] bg-border-dark relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gold-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center space-y-4"
            >
              {/* Sound toggle controls */}
              <div className="flex justify-center space-x-6">
                <button
                  onClick={() => setSoundEnabled(true)}
                  className={`flex items-center space-x-2 text-xs tracking-widest font-mono p-2 border transition-all ${
                    soundEnabled
                      ? "border-gold-primary text-gold-primary bg-gold-primary/5"
                      : "border-border-dark text-muted-text hover:border-muted-text"
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>SOUND ON</span>
                </button>
                <button
                  onClick={() => setSoundEnabled(false)}
                  className={`flex items-center space-x-2 text-xs tracking-widest font-mono p-2 border transition-all ${
                    !soundEnabled
                      ? "border-accent-red text-accent-red bg-accent-red/5"
                      : "border-border-dark text-muted-text hover:border-muted-text"
                  }`}
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>MUTE</span>
                </button>
              </div>

              {/* Enter Button */}
              <button
                onClick={() => onEnter(soundEnabled)}
                className="magnetic-btn group w-full py-4 border border-gold-primary bg-gold-primary hover:bg-transparent hover:text-gold-primary transition-all duration-300 font-display font-medium tracking-[0.25em] text-xs text-background-dark flex items-center justify-center space-x-3 rounded-none overflow-hidden relative shadow-lg shadow-gold-primary/10"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>ENTER HEADQUARTERS</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
