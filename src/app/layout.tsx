import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "254Bandits | Official Digital Experience | Silence Has a Sound",
  description: "Official headquarters of 254Bandits, Kenya's groundbreaking emo rap duo. Experience the fusion of luxury neo-noir storytelling, Afrofuturism, and raw vulnerability.",
  keywords: [
    "254Bandits",
    "Kenyan Emo Rap",
    "Kenyan Hip Hop",
    "African Rap",
    "Kenyan Music Duo",
    "Rockstar Bandit",
    "Rasta Bandit",
    "African Emotional Music",
    "Kenyan Artists",
    "Music From Kenya",
  ],
  authors: [{ name: "254Bandits" }],
  openGraph: {
    title: "254Bandits | Official Digital Experience",
    description: "Silence Has a Sound. Kenya's voice of emotional rap redefining storytelling through raw vulnerability and luxury neo-noir art.",
    url: "https://www.254bandits.com",
    siteName: "254Bandits",
    images: [
      {
        url: "/assets/hero-bg.jpg",
        width: 1200,
        height: 1200,
        alt: "254Bandits Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "254Bandits | Silence Has a Sound",
    description: "Kenya's voice of emotional rap redefining storytelling through raw vulnerability and luxury neo-noir art.",
    images: ["/assets/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background-dark text-white-editorial font-sans selection:bg-gold-primary selection:text-background-dark">
        {/* Film grain overlay for editorial cinema texture */}
        <div className="film-grain" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
