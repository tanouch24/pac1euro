import { NextRequest, NextResponse } from "next/server";
import {
  SupabaseConfigError,
  getSupabaseAdmin,
  type LeadInsert,
} from "@/lib/supabase";

const allowedHousingTypes = new Set(["Maison individuelle", "Appartement"]);

const allowedHeatingTypes = new Set([
  "Fioul",
  "Gaz",
  "Électrique ancien",
  "Bois",
  "Autre chauffage",
]);

const allowedOccupancyStatuses = new Set([
  "Propriétaire occupant",
  "Propriétaire bailleur",
  "Locataire",
]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 160) : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[+()\d\s.-]{8,24}$/.test(phone);
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { message: "Format de requête invalide." },
        { status: 415 },
      );
    }

    const body = (await request.json()) as Partial<LeadInsert>;
    const lead: LeadInsert = {
      nom: clean(body.nom),
      telephone: clean(body.telephone),
      email: clean(body.email).toLowerCase(),
      ville: clean(body.ville),
      logement_type: clean(body.logement_type),
      chauffage_actuel: clean(body.chauffage_actuel),
      statut_occupation: clean(body.statut_occupation),
    };

    if (
      lead.nom.length < 2 ||
      !isValidPhone(lead.telephone) ||
      !isValidEmail(lead.email) ||
      lead.ville.length < 2 ||
      !allowedHousingTypes.has(lead.logement_type) ||
      !allowedHeatingTypes.has(lead.chauffage_actuel) ||
      !allowedOccupancyStatuses.has(lead.statut_occupation)
    ) {
      return NextResponse.json(
        { message: "Merci de vérifier les informations saisies." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").insert(lead);

    if (error) {
      console.error("Supabase lead insert failed", error);
      return NextResponse.json(
        { message: "La demande n'a pas pu être enregistrée." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Demande transmise." }, { status: 201 });
  } catch (error) {
    console.error("Lead API error", error);

    if (error instanceof SupabaseConfigError) {
      return NextResponse.json(
        {
          message:
            "Le formulaire n'est pas encore configuré côté serveur. Merci de réessayer plus tard.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Une erreur serveur est survenue." },
      { status: 500 },
    );
  }
}
