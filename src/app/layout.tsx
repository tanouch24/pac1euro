import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hdi-compagnie.fr"),
  title: {
    default: "HDI Compagnie | Aides pompe à chaleur",
    template: "%s | HDI Compagnie",
  },
  description:
    "Calculez vos aides pour installer une pompe à chaleur selon votre logement, vos revenus et votre ancien chauffage.",
  keywords: [
    "aides pompe à chaleur",
    "MaPrimeRénov",
    "CEE pompe à chaleur",
    "remplacer chauffage fioul",
    "pompe à chaleur maison",
  ],
  authors: [{ name: "HDI Compagnie" }],
  creator: "HDI Compagnie",
  publisher: "HDI Compagnie",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "HDI Compagnie",
    title: "Calculez vos aides pour installer une pompe à chaleur",
    description:
      "Étude d'éligibilité pour particuliers selon revenus, logement et ancien chauffage.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Maison individuelle récente avec jardin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HDI Compagnie | Aides pompe à chaleur",
    description:
      "Vérifiez les aides disponibles pour votre pompe à chaleur en maison individuelle.",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
