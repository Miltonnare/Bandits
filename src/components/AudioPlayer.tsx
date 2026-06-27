"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music, List, Disc, ChevronUp, ChevronDown } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  duration: string;
  genre: string;
  synthType: "drone" | "pad" | "pulse";
  tempo: number;
}

export default function AudioPlayer({ isSoundEnabled }: { isSoundEnabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const tracks: Track[] = [
    { title: "marafiki", artist: "254Bandits", duration: "03:09", genre: "NIKO ALONE / EMO TRAP", synthType: "drone", tempo: 75 },
    { title: "niko alone", artist: "254Bandits", duration: "02:37", genre: "NIKO ALONE / NOIR RAP", synthType: "pad", tempo: 80 },
    { title: "rock na rasta", artist: "254Bandits", duration: "03:05", genre: "FINN SAVAGE / MELODIC", synthType: "pulse", tempo: 70 },
  ];

  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Web Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  // Synthesizer voices
  const subOscRef = useRef<OscillatorNode | null>(null);
  const chordOscsRef = useRef<OscillatorNode[]>([]);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize sound from intro trigger
  useEffect(() => {
    if (isSoundEnabled) {
      setIsPlaying(true);
    }
  }, [isSoundEnabled]);

  // Handle master play / pause / volume changes
  useEffect(() => {
    if (isPlaying) {
      initAudio();
      startSynth();
    } else {
      stopSynth();
    }
  }, [isPlaying, activeTrackIndex]);

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const targetVol = isMuted ? 0 : volume;
      masterGainRef.current.gain.linearRampToValueAtTime(targetVol, audioCtxRef.current.currentTime + 0.1);
    }
  }, [volume, isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSynth();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Web Audio Synths initialization
  const initAudio = () => {
    if (audioCtxRef.current) return;
    
    // Create Audio Context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Create Analyser & Master Gain
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyserRef.current = analyser;

    const masterGain = ctx.createGain();
    masterGain.gain.value = isMuted ? 0 : volume;
    masterGainRef.current = masterGain;

    // Connect Node path: Synths -> masterGain -> analyser -> destination
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);
  };

  const startSynth = () => {
    if (!audioCtxRef.current) return;
    
    // Resume context if suspended (browser security)
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    // Stop current nodes
    stopSynth();

    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (!masterGain) return;

    const track = tracks[activeTrackIndex];

    // 1. Core Ambient Sub-Drone (Root note: A1 = 55Hz, or C2 = 65.4Hz)
    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.value = track.synthType === "drone" ? 55.0 : track.synthType === "pad" ? 65.4 : 48.9; // A1, C2, or G1
    
    const subGain = ctx.createGain();
    subGain.gain.value = 0.45; // balanced gain
    
    sub.connect(subGain);
    subGain.connect(masterGain);
    sub.start();
    subOscRef.current = sub;

    // 2. Chords pad generation
    const chordFrequencies = {
      drone: [110.0, 165.0, 220.0, 261.6], // A minor base notes (A2, E3, A3, C4)
      pad: [130.8, 196.0, 261.6, 329.6],   // C Major base notes (C3, G3, C4, E4)
      pulse: [97.9, 146.8, 196.0, 246.9],   // G Major base notes (G2, D3, G3, B3)
    };

    const freqs = chordFrequencies[track.synthType] || chordFrequencies.drone;
    const oscList: OscillatorNode[] = [];

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      
      // Detune slightly for lush chorus texture
      osc.frequency.value = f + (Math.random() - 0.5) * 1.5;
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400 + idx * 100; // soft cutoff

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.12;

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      
      oscList.push(osc);
    });

    chordOscsRef.current = oscList;

    // 3. Heartbeat pulsing rhythm thumper
    let beatCount = 0;
    const tempoInterval = (60 / track.tempo) * 1000;
    
    const triggerHeartbeat = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === "suspended") return;
      
      const time = ctx.currentTime;
      
      // Kick oscillator
      const kick = ctx.createOscillator();
      kick.frequency.setValueAtTime(100, time);
      kick.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);
      
      const kickGain = ctx.createGain();
      kickGain.gain.setValueAtTime(0.3, time);
      kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
      
      kick.connect(kickGain);
      kickGain.connect(masterGain);
      kick.start();
      kick.stop(time + 0.35);

      // Heartbeat double beat rhythm
      beatCount++;
      if (beatCount % 2 === 1) {
        setTimeout(triggerHeartbeat, 250); // double beat speed
      }
    };

    synthIntervalRef.current = setInterval(triggerHeartbeat, tempoInterval);
  };

  const stopSynth = () => {
    if (subOscRef.current) {
      try { subOscRef.current.stop(); } catch (e) {}
      subOscRef.current = null;
    }
    chordOscsRef.current.forEach((osc) => {
      try { osc.stop(); } catch (e) {}
    });
    chordOscsRef.current = [];
    
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      let dataArray = new Uint8Array(32);
      
      if (isPlaying && analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else {
        // Render fake resting wave if paused
        for (let i = 0; i < 32; i++) {
          dataArray[i] = 10 + Math.sin(Date.now() * 0.002 + i * 0.3) * 5;
        }
      }

      ctx.fillStyle = "rgba(212, 175, 55, 0.4)";
      const barWidth = (w / 16) - 2;
      
      // Render symmetrical audio spectrum
      for (let i = 0; i < 16; i++) {
        // Read analyzer data and normalize it
        const val = dataArray[i];
        const barHeight = (val / 255) * h * 0.95 + 2;
        
        const x = i * (barWidth + 2);
        const y = h - barHeight;

        // Draw gold rounded bars
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 1);
        
        // Color transition logic (accent red on peak values)
        if (val > 150) {
          ctx.fillStyle = "#C1121F";
        } else {
          ctx.fillStyle = `rgba(212, 175, 55, ${0.4 + (val / 255) * 0.6})`;
        }
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 left-6 z-[200] max-w-sm select-none">
      <div className={`frosted-glass flex flex-col shadow-2xl transition-all duration-500 ease-in-out overflow-hidden border border-border-dark ${
        isExpanded ? "w-80 p-5 space-y-4" : "w-14 h-14 items-center justify-center p-0 rounded-full cursor-pointer"
      }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {/* Collapsed State Icon */}
        {!isExpanded && (
          <div className="relative group">
            <Disc className={`w-6 h-6 text-gold-primary ${isPlaying ? "animate-spin-slow" : "opacity-80"}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-red rounded-full animate-ping" />
            )}
          </div>
        )}

        {/* Expanded UI */}
        {isExpanded && (
          <>
            {/* Header info */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4 text-gold-primary animate-pulse" />
                <span className="text-[9px] font-mono tracking-widest text-gold-primary uppercase">
                  ATMOSPHERIC SOUNDTRACK
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                  setShowPlaylist(false);
                }}
                className="text-muted-text hover:text-white-editorial transition-colors p-1"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Track Info Grid */}
            <div className="flex items-center space-x-3.5 relative">
              <div className="w-12 h-12 bg-surface-dark border border-border-dark/60 flex items-center justify-center text-gold-primary relative flex-shrink-0">
                <Disc className={`w-6 h-6 ${isPlaying ? "animate-spin-slow" : ""}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif italic text-md text-white-editorial font-medium truncate leading-tight">
                  {tracks[activeTrackIndex].title}
                </h4>
                <p className="text-[10px] font-mono text-muted-text uppercase tracking-wider truncate mt-1">
                  {tracks[activeTrackIndex].genre}
                </p>
              </div>
            </div>

            {/* Playback Controls & Waveform Visualizer */}
            <div className="flex items-center justify-between space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
                className="w-10 h-10 border border-gold-primary bg-gold-primary text-background-dark hover:bg-transparent hover:text-gold-primary transition-all duration-300 flex items-center justify-center"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              {/* Visualizer Canvas */}
              <canvas ref={canvasRef} className="h-8 flex-1 w-full bg-secondary-dark/30 border-b border-border-dark/20" />

              {/* Playlist drawer toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlaylist(!showPlaylist);
                }}
                className={`p-2 border transition-all ${
                  showPlaylist ? "border-gold-primary text-gold-primary" : "border-border-dark text-muted-text hover:text-white-editorial"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sub Controls: Volume & Mute */}
            <div className="flex items-center space-x-3 pt-2 border-t border-border-dark/30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="text-muted-text hover:text-white-editorial transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-accent-red" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-full h-1 bg-border-dark rounded-lg appearance-none cursor-pointer accent-gold-primary"
              />
            </div>

            {/* Playlist dropdown list */}
            {showPlaylist && (
              <div className="border border-border-dark bg-secondary-dark p-2 text-xs font-mono space-y-1.5 transition-all max-h-[140px] overflow-y-auto">
                <span className="text-[9px] text-muted-text tracking-widest block uppercase px-2 mb-1">
                  CHOOSE FREQUENCY
                </span>
                {tracks.map((track, index) => (
                  <button
                    key={track.title}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTrackIndex(index);
                      setIsPlaying(true);
                    }}
                    className={`w-full flex items-center justify-between p-2 text-left transition-all ${
                      activeTrackIndex === index
                        ? "bg-gold-primary/10 text-gold-primary border-l-2 border-gold-primary"
                        : "text-muted-text hover:text-white-editorial hover:bg-surface-dark"
                    }`}
                  >
                    <span className="truncate pr-2">{track.title}</span>
                    <span className="opacity-60">{track.duration}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
