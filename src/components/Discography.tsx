"use client";

import React, { useState } from "react";
import { Disc, Play, ExternalLink, MessageCircle, FileText, ChevronRight } from "lucide-react";

interface TrackRelease {
  id: string;
  title: string;
  type: "SINGLE" | "EP" | "ALBUM";
  date: string;
  cover: string;
  spotify: string;
  apple: string;
  audiomack: string;
  youtube: string;
  boomplay: string;
  lyrics: string[];
  meaning: string;
  credits: string;
}

export default function Discography() {
  const releases: TrackRelease[] = [
    {
      id: "r1",
      title: "NIKO ALONE",
      type: "ALBUM",
      date: "JUN 2026",
      cover: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='100%25' height='100%25' fill='%231F1F1F'/%3E%3Ccircle cx='100' cy='100' r='60' fill='%23C1121F' opacity='0.25'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' fill='%23D4AF37' font-size='11'%3ENIKO ALONE%3C/text%3E%3C/svg%3E",
      spotify: "https://open.spotify.com",
      apple: "https://music.apple.com",
      audiomack: "https://audiomack.com",
      youtube: "https://youtube.com/channel/UC3wF-GxTK9jXaVy9iRVWsXw",
      boomplay: "https://boomplay.com",
      lyrics: [
        "[ ALBUM TRACKLIST ]",
        "1. marafiki - 3:09",
        "2. niko alone - 2:37",
        "3. majini - 2:42",
        "4. pesa karma - 3:01",
        "5. macho red - 2:26",
        "6. mbaya - 3:07",
        "7. bila second chances - 3:35",
        "8. smile - 2:40",
        "",
        "[ Lead Single - marafiki ]",
        "Searching for real friends in the shadows...",
        "Bila second chances we run this road."
      ],
      meaning: "NIKO ALONE explores themes of isolation, fake friendship (marafiki), financial consequences (pesa karma), and emotional struggles (macho red, smile) from the heart of Nairobi.",
      credits: "All tracks written and performed by 254Bandits. Beats and engineering by Rockstar Bandit. Introspective lyrics by Rasta Bandit. Distributed via DistroKid.",
    },
    {
      id: "r2",
      title: "FINN SAVAGE",
      type: "ALBUM",
      date: "JAN 2026",
      cover: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='100%25' height='100%25' fill='%231F1F1F'/%3E%3Cpath d='M30,170 L100,30 L170,170 Z' fill='%23D4AF37' opacity='0.2'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' fill='%23F9F9F9' font-size='11'%3EFINN SAVAGE%3C/text%3E%3C/svg%3E",
      spotify: "https://open.spotify.com",
      apple: "https://music.apple.com",
      audiomack: "https://audiomack.com",
      youtube: "https://youtube.com/channel/UC3wF-GxTK9jXaVy9iRVWsXw",
      boomplay: "https://boomplay.com",
      lyrics: [
        "[ ALBUM TRACKLIST ]",
        "1. heart pain - 3:18",
        "2. pauline (feat. el bandit) - 3:09",
        "3. sidai fame - 3:10",
        "4. don't feel right - 3:30",
        "5. infinity - 2:46",
        "6. am sorry - 2:29",
        "7. sina patience - 2:44",
        "8. turn me on (feat. randy kanambo) - 3:15",
        "9. power mind - 2:55",
        "10. walk out - 3:04",
        "11. rocky bwoy - 3:13",
        "12. won't be - 2:51",
        "13. alone - 3:34",
        "14. hard to find - 3:18",
        "15. rock na rasta - 3:05",
        "",
        "[ Key Collab - rock na rasta ]",
        "Rockstar na Rasta, the union of beat and voice...",
        "We didn't choose the sound, the sound made the choice."
      ],
      meaning: "The massive 15-track album detailing the duality of Rockstar and Rasta's lives, resolving around heart pain, sidai fame, and the iconic collab track 'rock na rasta'.",
      credits: "All beats produced, engineered, and mastered by Rockstar Bandit. Vocals by Rasta Bandit. Featuring El Bandit and Randy Kanambo. ℗ 9772151 Records DK.",
    },
    {
      id: "r3",
      title: "ECHOES OF ME",
      type: "SINGLE",
      date: "APR 2026",
      cover: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='100%25' height='100%25' fill='%231F1F1F'/%3E%3Ccircle cx='100' cy='100' r='50' fill='%23B8860B' opacity='0.2'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' fill='%23F9F9F9' font-size='10'%3EECHOES%3C/text%3E%3C/svg%3E",
      spotify: "https://open.spotify.com",
      apple: "https://music.apple.com",
      audiomack: "https://audiomack.com",
      youtube: "https://youtube.com/channel/UC3wF-GxTK9jXaVy9iRVWsXw",
      boomplay: "https://boomplay.com",
      lyrics: [
        "[ Rasta Bandit - Solo Single ]",
        "These are the echoes of what I used to be,",
        "Looking in the mirror, searching for the key.",
        "Nairobi nights get colder when you are on your own,",
        "But the echoes of my voice built this throne."
      ],
      meaning: "Rasta Bandit's deeply introspective solo single dealing with personal reflections and the echo of one's voice in a silent room.",
      credits: "Vocal and lyric writing by Rasta Bandit. Audio mastering by Rockstar Bandit. ℗ 9772151 Records DK.",
    },
    {
      id: "r4",
      title: "complications freestyle",
      type: "SINGLE",
      date: "MAR 2026",
      cover: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='100%25' height='100%25' fill='%231F1F1F'/%3E%3Crect x='60' y='60' width='80' height='80' fill='%23C1121F' opacity='0.15'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' fill='%23D4AF37' font-size='10'%3ECOMP%3C/text%3E%3C/svg%3E",
      spotify: "https://open.spotify.com",
      apple: "https://music.apple.com",
      audiomack: "https://audiomack.com",
      youtube: "https://youtube.com/channel/UC3wF-GxTK9jXaVy9iRVWsXw",
      boomplay: "https://boomplay.com",
      lyrics: [
        "[ 254Bandits - Freestyle Release ]",
        "Complications in my mind, got no time to unwind,",
        "Trying to find the peace of mind that I left behind.",
        "We are running out of seconds, running out of breath,",
        "But we stand strong facing the cold wind of death."
      ],
      meaning: "A 4-minute raw freestyle addressing the complications of rising fame, creative blockages, and urban pressure.",
      credits: "Recorded live at Eastlands. Engineered by Rockstar Bandit. Performance by Rasta Bandit. ℗ 9772151 Records DK.",
    }
  ];

  const [activeRelease, setActiveRelease] = useState<TrackRelease | null>(null);
  const [activeTab, setActiveTab] = useState<"lyrics" | "details">("lyrics");

  return (
    <div className="relative select-none">
      {/* Releases list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {releases.map((release) => (
          <div
            key={release.id}
            className="frosted-card p-6 flex flex-col md:flex-row items-center md:items-stretch gap-6 group cursor-pointer"
            onClick={() => {
              setActiveRelease(release);
              setActiveTab("lyrics");
            }}
          >
            {/* Immersive Rotating Vinyl Image */}
            <div className="relative w-36 h-36 shrink-0 overflow-hidden bg-secondary-dark/40 flex items-center justify-center border border-border-dark/40">
              <img
                src={release.cover}
                alt={release.title}
                className="w-full h-full object-cover group-hover:rotate-12 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-background-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Disc className="w-8 h-8 text-gold-primary animate-spin-slow" />
              </div>
            </div>

            {/* Information */}
            <div className="flex-1 flex flex-col justify-between py-1 text-center md:text-left">
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span className="text-[9px] font-mono text-gold-primary tracking-widest border border-gold-primary/20 px-2 py-0.5 w-max mx-auto md:mx-0">
                    {release.type}
                  </span>
                  <span className="text-[10px] font-mono text-muted-text">
                    RELEASED: {release.date}
                  </span>
                </div>
                <h3 className="font-serif italic text-2xl text-white-editorial group-hover:text-gold-primary transition-colors">
                  {release.title}
                </h3>
              </div>

              {/* Streaming buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2.5 mt-4 pt-4 border-t border-border-dark/30">
                <a
                  href={release.spotify}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-text hover:text-white-editorial transition-colors flex items-center space-x-1 font-mono text-[9px] tracking-widest"
                >
                  <span>SPOTIFY</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href={release.youtube}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-text hover:text-white-editorial transition-colors flex items-center space-x-1 font-mono text-[9px] tracking-widest"
                >
                  <span>YOUTUBE</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href={release.apple}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-text hover:text-white-editorial transition-colors flex items-center space-x-1 font-mono text-[9px] tracking-widest"
                >
                  <span>APPLE</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href={release.audiomack}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-text hover:text-white-editorial transition-colors flex items-center space-x-1 font-mono text-[9px] tracking-widest"
                >
                  <span>AUDIOMACK</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href={release.boomplay}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-muted-text hover:text-white-editorial transition-colors flex items-center space-x-1 font-mono text-[9px] tracking-widest"
                >
                  <span>BOOMPLAY</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lyrics & details slider Modal */}
      {activeRelease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/95 backdrop-blur-md">
          <div className="bg-secondary-dark border border-border-dark w-full max-w-3xl flex flex-col h-[85vh] relative">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-border-dark flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-mono text-gold-primary tracking-widest uppercase">
                  {activeRelease.type} INTERACTIVE CARD
                </span>
                <h3 className="font-serif italic text-2xl text-white-editorial mt-1">
                  {activeRelease.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveRelease(null)}
                className="px-3 py-1.5 border border-border-dark text-[10px] font-mono text-muted-text hover:border-white-editorial hover:text-white-editorial transition-all"
              >
                CLOSE
              </button>
            </div>

            {/* Toggle tabs */}
            <div className="flex border-b border-border-dark shrink-0">
              <button
                onClick={() => setActiveTab("lyrics")}
                className={`flex-1 py-4 font-mono text-[10px] tracking-widest transition-all flex items-center justify-center space-x-2 ${
                  activeTab === "lyrics"
                    ? "border-b border-gold-primary text-gold-primary bg-gold-primary/5"
                    : "text-muted-text hover:text-white-editorial hover:bg-surface-dark/40"
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>TRACKLIST & LYRICS</span>
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`flex-1 py-4 font-mono text-[10px] tracking-widest transition-all flex items-center justify-center space-x-2 ${
                  activeTab === "details"
                    ? "border-b border-gold-primary text-gold-primary bg-gold-primary/5"
                    : "text-muted-text hover:text-white-editorial hover:bg-surface-dark/40"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>SONG MEANING & CREDITS</span>
              </button>
            </div>

            {/* Scrollable details content */}
            <div className="flex-1 overflow-y-auto p-8 font-sans">
              {activeTab === "lyrics" ? (
                <div className="space-y-4 max-w-md mx-auto text-center font-serif text-md md:text-lg text-white-editorial/90 leading-relaxed py-6">
                  {activeRelease.lyrics.map((line, idx) => {
                    if (line === "") return <div key={idx} className="h-6" />;
                    if (line.startsWith("[")) {
                      return (
                        <div
                          key={idx}
                          className="font-mono text-[9px] tracking-widest text-gold-primary uppercase pt-4"
                        >
                          {line}
                        </div>
                      );
                    }
                    return (
                      <p
                        key={idx}
                        className="hover:text-gold-primary hover:text-gold-glow transition-all duration-300 cursor-pointer"
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-8 max-w-xl mx-auto py-6">
                  {/* Meaning Card */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-gold-primary tracking-widest uppercase">
                      Song Meaning
                    </h4>
                    <p className="text-sm text-muted-text leading-relaxed border-l-2 border-accent-red/60 pl-4 py-1 italic">
                      "{activeRelease.meaning}"
                    </p>
                  </div>

                  {/* Credits Card */}
                  <div className="space-y-3 pt-6 border-t border-border-dark/30">
                    <h4 className="text-xs font-mono text-gold-primary tracking-widest uppercase">
                      Credits & Technical Specs
                    </h4>
                    <p className="text-sm text-white-editorial font-medium">
                      {activeRelease.credits}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
