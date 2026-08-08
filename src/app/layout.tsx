import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../features/auth/AuthContext";
import { FavoritesProvider } from "../features/favourites/FavoritesContext";
import Header from "../components/common/Header";

export const metadata: Metadata = {
  title: "CineTrack — Discover Movies & Catalog Favourites",
  description: "AI-assisted movie search and catalog application for the FlyRank AI Capstone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-950 text-slate-100">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎬</text></svg>" />
      </head>
      <body className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 antialiased selection:bg-indigo-500/30">
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            <main className="flex-grow w-full">{children}</main>
            <footer className="w-full py-8 text-center text-[10px] font-mono text-slate-600 border-t border-slate-950 bg-slate-950/40">
              CineTrack © 2026 • Built as a FlyRank AI Capstone
            </footer>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
