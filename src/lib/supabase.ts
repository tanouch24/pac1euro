import { createClient } from "@supabase/supabase-js";

class SupabaseConfigError extends Error {
  constructor() {
    super("Supabase environment variables are missing or invalid.");
    this.name = "SupabaseConfigError";
  }
}

type LeadInsert = {
  nom: string;
  telephone: string;
  email: string;
  ville: string;
  logement_type: string;
  chauffage_actuel: string;
  statut_occupation: string;
};

type LeadRow = LeadInsert & {
  id: string;
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: Partial<LeadInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new SupabaseConfigError();
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export { SupabaseConfigError };
export type { LeadInsert };
