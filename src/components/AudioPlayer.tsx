"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Music, List, Disc, ChevronDown, SkipBack, SkipForward } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  duration: string;
  genre: string;
  youtubeId: string;
}

export default function AudioPlayer({ isSoundEnabled }: { isSoundEnabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const tracks: Track[] = [
    { title: "echoes of me", artist: "Rasta Bandit", duration: "03:14", genre: "ECHOES OF ME / RAW RAP", youtubeId: "vkwYOYbDvpc" },
    { title: "liberty", artist: "Rockstar Bandit", duration: "02:57", genre: "LIBERTY / RAW RAP", youtubeId: "HXO9HLZEq6k" },
    { title: "niko alone", artist: "254Bandits", duration: "02:37", genre: "NIKO ALONE / NOIR RAP", youtubeId: "37PI-GU_rUA" },
    { title: "rock na rasta", artist: "254Bandits", duration: "03:05", genre: "FINN SAVAGE / MELODIC", youtubeId: "WtLzPrVLimE" },
  ];

  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const playerRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Initialize sound from intro trigger
  useEffect(() => {
    if (isSoundEnabled) {
      setIsPlaying(true);
    }
  }, [isSoundEnabled]);

  // Load YouTube Player API script dynamically
  useEffect(() => {
    if ((window as any).YT) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Initialize player when YT API is ready
  useEffect(() => {
    let checkInterval: NodeJS.Timeout;

    const initYTPlayer = () => {
      const win = window as any;
      if (win.YT && win.YT.Player) {
        clearInterval(checkInterval);
        
        playerRef.current = new win.YT.Player("hidden-youtube-player", {
          videoId: tracks[activeTrackIndex].youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            loop: 1,
            playlist: tracks[activeTrackIndex].youtubeId
          },
          events: {
            onReady: (event: any) => {
              setIsPlayerReady(true);
              event.target.setVolume(volume * 100);
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
              // If sound was enabled during load, start playing
              if (isPlaying) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              // Loop naturally when video ends
              if (event.data === win.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            }
          }
        });
      }
    };

    checkInterval = setInterval(initYTPlayer, 150);
    return () => clearInterval(checkInterval);
  }, []);

  // Listen to toggle sound events from Hero or other triggers
  useEffect(() => {
    const handleToggle = () => {
      setIsPlaying((prev) => !prev);
    };
    const handleSetPlayState = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== undefined) {
        setIsPlaying(customEvent.detail.isPlaying);
      }
    };
    window.addEventListener("toggleBanditAudio", handleToggle);
    window.addEventListener("setBanditAudioPlayState", handleSetPlayState);
    return () => {
      window.removeEventListener("toggleBanditAudio", handleToggle);
      window.removeEventListener("setBanditAudioPlayState", handleSetPlayState);
    };
  }, []);

  // Broadcast state changes globally
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("banditAudioState", { detail: { isPlaying } }));
  }, [isPlaying]);

  // Handle Play/Pause changes
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, isPlayerReady]);

  // Handle Track Changes
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      playerRef.current.loadVideoById({
        videoId: tracks[activeTrackIndex].youtubeId,
        suggestedQuality: "small"
      });
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [activeTrackIndex, isPlayerReady]);

  // Handle Volume & Mute Changes
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      playerRef.current.setVolume(volume * 100);
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [volume, isMuted, isPlayerReady]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  // Canvas visualizer loop (Simulated Active beats spectrum)
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
      
      if (isPlaying) {
        // Generate beautiful active simulated waveform with noise/variability
        for (let i = 0; i < 32; i++) {
          dataArray[i] = 40 + Math.sin(Date.now() * 0.005 + i * 0.45) * 35 + Math.sin(Date.now() * 0.015 + i * 0.15) * 20 + Math.random() * 10;
        }
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
        const val = dataArray[i];
        const barHeight = (val / 255) * h * 0.95 + 2;
        
        const x = i * (barWidth + 2);
        const y = h - barHeight;

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 1);
        
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
    <div className="fixed bottom-6 left-6 z-200 max-w-sm select-none">
      {/* Hidden YouTube IFrame Target */}
      <div id="hidden-youtube-player" className="absolute w-0 h-0 opacity-0 pointer-events-none" />

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
                  OFFICIAL AUDIO STREAM
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
              <div className="w-12 h-12 bg-surface-dark border border-border-dark/60 flex items-center justify-center text-gold-primary relative shrink-0">
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
              <div className="flex items-center space-x-1.5 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
                    setIsPlaying(true);
                  }}
                  className="w-7 h-7 border border-border-dark text-muted-text hover:text-gold-primary hover:border-gold-primary transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  <SkipBack className="w-3 h-3 fill-current" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="w-8 h-8 border border-gold-primary bg-gold-primary text-background-dark hover:bg-transparent hover:text-gold-primary transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTrackIndex((prev) => (prev + 1) % tracks.length);
                    setIsPlaying(true);
                  }}
                  className="w-7 h-7 border border-border-dark text-muted-text hover:text-gold-primary hover:border-gold-primary transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  <SkipForward className="w-3 h-3 fill-current" />
                </button>
              </div>

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
              <div className="border border-border-dark bg-secondary-dark p-2 text-xs font-mono space-y-1.5 transition-all max-h-35 overflow-y-auto">
                <span className="text-[9px] text-muted-text tracking-widest block uppercase px-2 mb-1">
                  CHOOSE TRACK
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
