import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../features/auth/AuthContext";
import { FavoritesProvider } from "../features/favourites/FavoritesContext";
import Header from "../components/common/Header";
import { Space_Grotesk, Inter, Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aditya-srivastav.netlify.app"),
  title: {
    default: "Aditya Srivastav — Frontend AI Engineer",
    template: "%s | Aditya Srivastav",
  },
  description:
    "Portfolio of Aditya Srivastav — B.Tech CSE student building production-grade AI applications with practical LLM integrations, resilient streaming UI, and WCAG 2.1 AA accessibility.",
  keywords: [
    "Aditya Srivastav",
    "Frontend AI Engineer",
    "Next.js Developer",
    "React Engineer",
    "LLM Interfaces",
    "AI Product Development",
    "Web Accessibility",
    "HIREVIUM",
    "INDRA AI",
    "StackScout",
    "ResQra",
  ],
  authors: [{ name: "Aditya Srivastav", url: "https://aditya-srivastav.netlify.app" }],
  creator: "Aditya Srivastav",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aditya-srivastav.netlify.app",
    siteName: "Aditya Srivastav Portfolio",
    title: "Aditya Srivastav — Frontend AI Engineer",
    description:
      "Explore production AI projects (HIREVIUM, INDRA AI, StackScout, ResQra), interactive case studies, and engineering benchmarks.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Aditya Srivastav — Frontend AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Srivastav — Frontend AI Engineer",
    description:
      "Frontend engineer building AI-powered products with practical LLM integrations, resilient streaming UI, and WCAG 2.1 AA accessibility.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", spaceGrotesk.variable, inter.variable, "font-sans", geist.variable)}>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className="flex flex-col min-h-screen bg-brand-bg text-brand-text font-sans antialiased selection:bg-brand-primary/30">
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            <main className="flex-grow w-full">{children}</main>
            <footer className="w-full py-8 text-center text-xs font-mono text-brand-muted border-t border-brand-border bg-brand-card/40">
              Aditya Srivastav © 2026 • Frontend AI Engineer • Building AI-powered products
            </footer>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
