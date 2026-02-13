import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maxime Gangneux - Portfolio 3D Immersif",
  description: "Portfolio interactif 3D avec expérience immersive. Découvrez mes projets en tant que développeur fullstack.",
  keywords: ["portfolio", "développeur", "3D", "nextjs", "react", "fullstack"],
  authors: [{ name: "Maxime Gangneux" }],
  openGraph: {
    title: "Maxime Gangneux - Portfolio 3D",
    description: "Portfolio interactif 3D avec expérience immersive",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}

