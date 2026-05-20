import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hdi-compagnie.fr"),
  title: {
    default: "HDI Compagnie | Aides pompe a chaleur",
    template: "%s | HDI Compagnie",
  },
  description:
    "Calculez vos aides pour installer une pompe a chaleur selon votre logement, vos revenus et votre ancien chauffage.",
  keywords: [
    "aides pompe a chaleur",
    "MaPrimeRenov",
    "CEE pompe a chaleur",
    "remplacer chauffage fioul",
    "pompe a chaleur maison",
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
    title: "Calculez vos aides pour installer une pompe a chaleur",
    description:
      "Etude d'eligibilite pour particuliers selon revenus, logement et ancien chauffage.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Maison individuelle recente avec jardin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HDI Compagnie | Aides pompe a chaleur",
    description:
      "Verifiez les aides disponibles pour votre pompe a chaleur en maison individuelle.",
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
