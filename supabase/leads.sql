create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nom text not null,
  telephone text not null,
  email text not null,
  ville text not null,
  logement_type text not null,
  chauffage_actuel text not null,
  statut_occupation text not null,
  constraint leads_nom_length check (char_length(trim(nom)) >= 2),
  constraint leads_telephone_length check (char_length(trim(telephone)) between 8 and 24),
  constraint leads_email_format check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  constraint leads_ville_length check (char_length(trim(ville)) >= 2),
  constraint leads_logement_type_allowed check (
    logement_type in (
      'Maison individuelle',
      'Appartement'
    )
  ),
  constraint leads_chauffage_actuel_allowed check (
    chauffage_actuel in (
      'Fioul',
      'Gaz',
      'Electrique ancien',
      'Bois',
      'Autre chauffage'
    )
  ),
  constraint leads_statut_occupation_allowed check (
    statut_occupation in (
      'Proprietaire occupant',
      'Proprietaire bailleur',
      'Locataire'
    )
  )
);

alter table public.leads enable row level security;

create policy "No public read access"
on public.leads
for select
using (false);
