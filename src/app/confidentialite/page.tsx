import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Politique de confidentialité de HDI Compagnie pour les demandes d'étude d'éligibilité pompe à chaleur.",
  alternates: {
    canonical: "/confidentialite",
  },
  openGraph: {
    title: "Confidentialité | HDI Compagnie",
    description:
      "Informations sur les données collectées via le formulaire d'étude d'éligibilité.",
    url: "/confidentialite",
  },
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300"
          >
            HDI Compagnie
          </Link>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Cette page explique comment les informations transmises via le
            formulaire sont utilisées dans le cadre d&apos;une demande d&apos;étude
            d&apos;éligibilité.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="space-y-10">
          <article>
            <h2 className="text-2xl font-semibold tracking-tight">
              Données collectées
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Le formulaire peut collecter votre nom, votre téléphone, votre
              adresse email, votre ville, votre type de logement, votre chauffage
              actuel et votre statut d&apos;occupation.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight">
              Finalité du traitement
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Ces informations sont utilisées pour vous recontacter, comprendre
              votre situation et réaliser une première étude d&apos;éligibilité aux
              aides disponibles pour un projet de pompe à chaleur.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight">
              Stockage des données
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Les demandes envoyées via le formulaire sont stockées dans une base
              Supabase sécurisée. Les clés privées utilisées pour enregistrer les
              demandes restent côté serveur et ne sont pas exposées dans le
              navigateur.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight">
              Suppression sur demande
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Vous pouvez demander la suppression de vos informations à tout
              moment en contactant HDI Compagnie. Votre demande sera traitée dans
              les meilleurs délais.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Pour toute question liée à vos données personnelles ou pour demander
              leur suppression, contactez HDI Compagnie via votre interlocuteur
              habituel ou le canal de contact utilisé lors de votre demande.
            </p>
          </article>
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Retour à l&apos;accueil
        </Link>
      </section>
    </main>
  );
}
