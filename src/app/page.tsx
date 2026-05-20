"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

const heatingTypes = [
  { value: "Fioul", label: "Fioul" },
  { value: "Gaz", label: "Gaz" },
  { value: "Électrique ancien", label: "Électrique ancien" },
  { value: "Bois", label: "Bois" },
  { value: "Autre chauffage", label: "Autre chauffage" },
];

const occupancyStatuses = [
  { value: "Propriétaire occupant", label: "Propriétaire occupant" },
  { value: "Propriétaire bailleur", label: "Propriétaire bailleur" },
  { value: "Locataire", label: "Locataire" },
];

const housingTypes = [
  { value: "Maison individuelle", label: "Maison individuelle" },
  { value: "Appartement", label: "Appartement" },
];

const trustBadges = [
  "Étude sans engagement",
  "Aides selon votre situation",
  "Aides soumises à conditions d'éligibilité",
];

const reasons = [
  {
    title: "Réduire ses dépenses d'énergie",
    text: "Une pompe à chaleur bien dimensionnée peut aider à mieux maîtriser la consommation d'une maison équipée d'un chauffage ancien.",
  },
  {
    title: "Gagner en confort au quotidien",
    text: "L'installation vise une chaleur plus stable, un pilotage plus simple et une maison plus agréable en hiver.",
  },
  {
    title: "Anticiper la rénovation de son logement",
    text: "Remplacer un équipement vieillissant permet de préparer un projet plus performant et mieux documenté.",
  },
];

const aids = [
  {
    title: "MaPrimeRénov'",
    text: "Une aide publique calculée selon les revenus du foyer, le logement et la nature des travaux.",
  },
  {
    title: "Certificats d'Économies d'Énergie",
    text: "Une prime CEE peut être mobilisable selon le projet, l'ancien chauffage et les critères techniques.",
  },
  {
    title: "TVA réduite",
    text: "Certains travaux de rénovation énergétique peuvent bénéficier d'un taux de TVA réduit si les conditions sont réunies.",
  },
  {
    title: "Eco-PTZ",
    text: "Un financement complémentaire peut être étudié pour lisser le reste à charge selon le dossier.",
  },
];

const steps = [
  {
    label: "Éligibilité",
    text: "Vous renseignez votre logement, votre chauffage actuel et votre situation d'occupation.",
  },
  {
    label: "Estimation",
    text: "Un conseiller analyse les aides potentiellement mobilisables et les informations à vérifier.",
  },
  {
    label: "Projet",
    text: "Le dimensionnement, les contraintes techniques et le parcours administratif sont clarifiés.",
  },
  {
    label: "Installation",
    text: "Le projet avance avec un suivi structuré jusqu'à la mise en service de l'équipement.",
  },
];

const profiles = [
  {
    title: "Maison chauffée au fioul",
    text: "Un foyer propriétaire peut étudier le remplacement d'une chaudière ancienne par une solution plus performante.",
  },
  {
    title: "Chauffage gaz vieillissant",
    text: "L'éligibilité dépend des revenus, du logement, des performances attendues et des critères en vigueur.",
  },
  {
    title: "Radiateurs électriques anciens",
    text: "Une étude permet de comparer les solutions possibles avant de s'engager dans des travaux.",
  },
];

const reviews = [
  {
    quote:
      "L'appel a été clair et sans pression. Nous avons compris quelles aides pouvaient correspondre à notre maison.",
    author: "Claire et Julien, propriétaires en Gironde",
  },
  {
    quote:
      "Le conseiller a pris le temps de vérifier notre chauffage existant et les critères avant de parler budget.",
    author: "Nadia, propriétaire occupante dans le Nord",
  },
  {
    quote:
      "Nous voulions réduire nos dépenses sans nous lancer à l'aveugle. L'étude nous a aidés à cadrer le projet.",
    author: "Marc, maison individuelle près de Tours",
  },
];

const faqs = [
  {
    question: "Qui peut demander des aides pour une pompe à chaleur ?",
    answer:
      "Les aides dépendent notamment du statut d'occupation, des revenus, du type de logement, de l'ancien chauffage et des critères techniques applicables au projet.",
  },
  {
    question: "Une maison chauffée au fioul est-elle concernée ?",
    answer:
      "Oui, ce type de situation peut faire partie des dossiers à étudier. Le montant et les conditions varient selon le foyer et le logement.",
  },
  {
    question: "Les locataires peuvent-ils faire une demande ?",
    answer:
      "Un locataire peut se renseigner, mais les travaux doivent généralement être validés par le propriétaire du logement.",
  },
  {
    question: "Combien de temps prend l'étude d'éligibilité ?",
    answer:
      "Le premier formulaire prend environ 2 minutes. Un conseiller peut ensuite demander des informations complémentaires pour affiner l'analyse.",
  },
  {
    question: "Le montant des aides est-il identique pour tous ?",
    answer:
      "Non. Les aides varient selon les revenus, la composition du foyer, l'adresse du logement, l'équipement remplacé et les règles en vigueur.",
  },
  {
    question: "Faut-il changer toute l'installation de chauffage ?",
    answer:
      "Pas systématiquement. La faisabilité dépend de la maison, de l'isolation, des émetteurs existants et de la solution retenue.",
  },
];

type FormState = {
  nom: string;
  telephone: string;
  email: string;
  ville: string;
  logement_type: string;
  chauffage_actuel: string;
  statut_occupation: string;
};

const initialForm: FormState = {
  nom: "",
  telephone: "",
  email: "",
  ville: "",
  logement_type: housingTypes[0].value,
  chauffage_actuel: heatingTypes[0].value,
  statut_occupation: occupancyStatuses[0].value,
};

export default function Home() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(
    () =>
      form.nom.trim().length > 1 &&
      form.telephone.trim().length >= 8 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.ville.trim().length > 1 &&
      Boolean(form.logement_type) &&
      Boolean(form.chauffage_actuel) &&
      Boolean(form.statut_occupation),
    [form],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Impossible d'envoyer votre demande.");
      }

      setStatus("success");
      setMessage(
        "Votre demande a bien été transmise. Un conseiller revient vers vous pour vérifier votre éligibilité.",
      );
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Merci de réessayer.",
      );
    }
  }

  const leadFormSection = (
    <section id="lead-form" className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Vérification des aides
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Vérifiez votre éligibilité
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Indiquez votre situation. Un conseiller vous recontacte pour analyser
            les aides disponibles et les conditions de votre projet.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-black/30 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold">Nom</span>
              <input
                required
                minLength={2}
                value={form.nom}
                onChange={(event) =>
                  setForm((current) => ({ ...current, nom: event.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="Votre nom"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Téléphone</span>
              <input
                required
                type="tel"
                minLength={8}
                pattern="[+()0-9 .\-]{8,24}"
                inputMode="tel"
                value={form.telephone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    telephone: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="06 00 00 00 00"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="contact@exemple.fr"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Ville</span>
              <input
                required
                minLength={2}
                value={form.ville}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    ville: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="Bordeaux"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Chauffage actuel</span>
              <select
                required
                value={form.chauffage_actuel}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    chauffage_actuel: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              >
                {heatingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Statut</span>
              <select
                required
                value={form.statut_occupation}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    statut_occupation: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              >
                {occupancyStatuses.map((statusOption) => (
                  <option key={statusOption.value} value={statusOption.value}>
                    {statusOption.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-semibold">Type de logement</span>
              <select
                required
                value={form.logement_type}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    logement_type: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              >
                {housingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            disabled={!canSubmit || status === "loading"}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading"
              ? "Vérification en cours..."
              : "Vérifier mon éligibilité"}
          </button>
          {message ? (
            <p
              className={`mt-4 rounded-2xl px-4 py-3 text-sm font-medium ${
                status === "success"
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-red-50 text-red-700"
              }`}
              role="status"
            >
              {message}
            </p>
          ) : null}
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Vos informations sont utilisées uniquement pour traiter votre demande
            d&apos;étude d&apos;éligibilité.
          </p>
        </form>
      </div>
    </section>
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#eefbf4_0,#ffffff_36%,#f8fafc_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-24">
          <header className="flex items-center justify-between lg:col-span-2">
            <a href="#" className="flex items-center gap-3" aria-label="HDI Compagnie">
              <span className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-sm font-semibold text-white shadow-xl shadow-slate-950/15">
                HDI
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-800">
                Compagnie
              </span>
            </a>
            <a
              href="#lead-form"
              className="hidden rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:inline-flex"
            >
              Vérifier mon éligibilité
            </a>
          </header>

          <div className="flex flex-col justify-center py-6">
            <div className="mb-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-emerald-200 bg-white/85 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Pompe à chaleur pour particuliers
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Calculez vos aides pour installer une pompe à chaleur
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Selon votre logement, vos revenus et votre ancien chauffage,
              des aides peuvent réduire le coût de votre installation, sous
              réserve des conditions d&apos;éligibilité.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-base font-semibold text-white shadow-2xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Vérifier mon éligibilité
              </a>
              <a
                href="#aides"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                Voir les aides disponibles
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-3 rounded-[2rem] border border-slate-200 bg-white/85 p-4 shadow-xl shadow-slate-950/5 backdrop-blur">
              {[
                ["2 min", "Premier cadrage"],
                ["4 aides", "À analyser"],
                ["Maison", "Projet individuel"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-xl font-semibold text-slate-950">{value}</dt>
                  <dd className="mt-1 text-xs leading-5 text-slate-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-10 hidden h-28 w-28 rounded-full border border-emerald-200 bg-emerald-50/70 blur-2xl lg:block" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/12">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"
                alt="Maison individuelle récente avec jardin"
                width={1400}
                height={1050}
                priority
                className="h-[460px] w-full rounded-[1.5rem] object-cover sm:h-[560px]"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/60 bg-white/92 p-5 shadow-2xl shadow-slate-950/15 backdrop-blur">
                <p className="text-sm font-semibold text-slate-950">
                  Remplacez votre ancien chauffage avec les aides disponibles
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Le montant dépend de votre revenu, de votre logement, de votre
                  chauffage actuel et des critères applicables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {leadFormSection}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Chauffage ancien
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Pourquoi remplacer son ancien chauffage
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-950/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10"
            >
              <div className="mb-6 size-12 rounded-2xl bg-emerald-50 ring-1 ring-emerald-100" />
              <h3 className="text-xl font-semibold text-slate-950">
                {reason.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="aides" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Aides disponibles
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Des dispositifs à vérifier selon votre situation
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Aides soumises à conditions d&apos;éligibilité. L&apos;étude permet de
              comprendre les dispositifs potentiellement mobilisables avant de
              planifier les travaux.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {aids.map((aid) => (
              <article
                key={aid.title}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5"
              >
                <h3 className="text-lg font-semibold text-slate-950">{aid.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{aid.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Accompagnement
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Comment se passe l&apos;accompagnement
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step.label}
                className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-emerald-400 text-sm font-bold text-slate-950">
                  {index + 1}
                </span>
                <h3 className="mt-8 text-xl font-semibold">{step.label}</h3>
                <p className="mt-4 leading-7 text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Profils
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Exemples de profils à étudier
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Chaque dossier reste individuel. Le résultat dépend des revenus,
              de la maison, de l&apos;équipement remplacé et des règles en vigueur.
            </p>
          </div>
          <div className="grid gap-4">
            {profiles.map((profile) => (
              <article
                key={profile.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-950/5"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {profile.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{profile.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.author}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-950/5"
              >
                <blockquote className="text-lg leading-8 text-slate-700">
                  &quot;{review.quote}&quot;
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-slate-950">
                  {review.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          FAQ
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Questions fréquentes
        </h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/5">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                {faq.question}
              </summary>
              <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-sm text-slate-600 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="font-semibold text-slate-950">HDI Compagnie</p>
            <p className="mt-1">Étude des aides pour pompe à chaleur en maison.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#lead-form" className="font-semibold text-slate-900">
              Vérifier mon éligibilité
            </a>
            <a href="/confidentialite" className="font-semibold text-slate-900">
              Confidentialité
            </a>
            <span>Contact conseiller</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
