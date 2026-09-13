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
  title: "Aditya Srivastav — Frontend AI Engineer",
  description: "Portfolio of Aditya Srivastav — B.Tech CSE student focused on practical AI product development, resilient frontend interfaces, and LLM workflows.",
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
