-- HTS starter schema. Review and test in a separate Supabase project before production.
create type public.hts_role as enum ('learner','admin','super_admin');
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  learning_group text check (learning_group in ('student','high_school','middle_school','primary_school','armed_forces')),
  role public.hts_role not null default 'learner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.learning_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  is_open_access boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.learning_categories(id) on delete restrict,
  title text not null,
  description text,
  status text not null default 'draft' check(status in ('draft','published','archived')),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  body text,
  position integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);
create or replace function public.is_hts_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role in ('admin','super_admin')) $$;
-- Prevent ordinary users from changing their own privilege level.
create or replace function public.protect_profile_role()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_hts_admin() then
    raise exception 'Only an HTS administrator can change account roles';
  end if;
  return new;
end;
$$;
create trigger protect_profile_role_before_update
before update on public.profiles
for each row execute function public.protect_profile_role();

alter table public.profiles enable row level security;
alter table public.learning_categories enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.learning_progress enable row level security;
create policy "profiles read self or admins" on public.profiles for select using (id = auth.uid() or public.is_hts_admin());
create policy "profiles update self" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "published categories visible" on public.learning_categories for select using (is_published or public.is_hts_admin());
create policy "admins manage categories" on public.learning_categories for all using (public.is_hts_admin()) with check (public.is_hts_admin());
create policy "published courses visible" on public.courses for select using (status = 'published' or public.is_hts_admin());
create policy "admins manage courses" on public.courses for all using (public.is_hts_admin()) with check (public.is_hts_admin());
create policy "published lessons visible" on public.lessons for select using (is_published or public.is_hts_admin());
create policy "admins manage lessons" on public.lessons for all using (public.is_hts_admin()) with check (public.is_hts_admin());
create policy "learner manages own progress" on public.learning_progress for all using (user_id = auth.uid() or public.is_hts_admin()) with check (user_id = auth.uid() or public.is_hts_admin());
-- IMPORTANT: Assign super_admin only through a trusted server-side administrative process.
