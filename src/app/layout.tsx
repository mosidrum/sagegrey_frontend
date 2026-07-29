import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "@/styles/globals.scss";
import { FavoritesProvider } from "@/features/favorites/FavoritesContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppShell } from "@/components/layout/AppShell/AppShell";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "SWAPI Explorer - Star Wars Characters",
  description: "Explore Star Wars characters from the Star Wars API (SWAPI)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={exo2.variable}>
      <body>
        <ThemeProvider>
          <FavoritesProvider>
            <AppShell>{children}</AppShell>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
