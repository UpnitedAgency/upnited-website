-- ============================================================
-- UpNited Full Schema — run in Supabase SQL Editor
-- ============================================================

-- 1. Workspace Profiles (existing)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text not null,
  full_name text,
  role text not null default 'employee' check (role in ('employee','manager','admin')),
  invite_token uuid,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid()=id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid()=id);
create policy "Admins view all" on public.profiles for select using (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role in ('admin','manager'))
);

-- 2. Invites (existing)
create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  token uuid not null default gen_random_uuid() unique,
  role text not null default 'employee',
  created_by uuid references auth.users(id),
  used boolean not null default false,
  used_at timestamptz,
  expires_at timestamptz not null default (now()+interval '7 days'),
  created_at timestamptz not null default now()
);
alter table public.invites enable row level security;
create policy "Anyone read invite" on public.invites for select using (true);
create policy "Admins create invite" on public.invites for insert with check (
  exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')
);

-- 3. Talent Profiles (NEW)
create table if not exists public.talent_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references auth.users(id) on delete cascade,
  username text unique not null,
  full_name text not null,
  age integer,
  location text,
  bio text,
  primary_service text,
  experience text,
  availability text default 'available' check (availability in ('available','busy','open')),
  profile_image text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.talent_profiles enable row level security;
create policy "Public profiles visible" on public.talent_profiles for select
  using (is_public=true or auth.uid()=user_id);
create policy "Owners can update" on public.talent_profiles for update using (auth.uid()=user_id);
create policy "Owners can insert" on public.talent_profiles for insert with check (auth.uid()=user_id);

-- 4. Talent Services (NEW)
create table if not exists public.talent_services (
  id uuid primary key default gen_random_uuid(),
  talent_id uuid not null references public.talent_profiles(id) on delete cascade,
  service_name text not null,
  order_index integer not null default 0
);
alter table public.talent_services enable row level security;
create policy "Public read talent services" on public.talent_services for select using (
  exists(select 1 from public.talent_profiles tp where tp.id=talent_id and (tp.is_public or auth.uid()=tp.user_id))
);
create policy "Owners manage services" on public.talent_services for all using (
  exists(select 1 from public.talent_profiles tp where tp.id=talent_id and auth.uid()=tp.user_id)
);

-- 5. Portfolio Projects (NEW)
create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  talent_id uuid not null references public.talent_profiles(id) on delete cascade,
  title text not null,
  description text,
  category text,
  client_name text,
  project_url text,
  cover_image text,
  project_date text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.portfolio_projects enable row level security;
create policy "Public read portfolio" on public.portfolio_projects for select using (
  exists(select 1 from public.talent_profiles tp where tp.id=talent_id and (tp.is_public or auth.uid()=tp.user_id))
);
create policy "Owners manage portfolio" on public.portfolio_projects for all using (
  exists(select 1 from public.talent_profiles tp where tp.id=talent_id and auth.uid()=tp.user_id)
);

-- 6. Portfolio Images (NEW)
create table if not exists public.portfolio_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  image_url text not null,
  order_index integer not null default 0
);
alter table public.portfolio_images enable row level security;
create policy "Public read images" on public.portfolio_images for select using (
  exists(select 1 from public.portfolio_projects pp
    join public.talent_profiles tp on tp.id=pp.talent_id
    where pp.id=project_id and (tp.is_public or auth.uid()=tp.user_id))
);
create policy "Owners manage images" on public.portfolio_images for all using (
  exists(select 1 from public.portfolio_projects pp
    join public.talent_profiles tp on tp.id=pp.talent_id
    where pp.id=project_id and auth.uid()=tp.user_id)
);

-- 7. Social Links (NEW)
create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  talent_id uuid unique not null references public.talent_profiles(id) on delete cascade,
  instagram text,
  facebook text,
  tiktok text,
  linkedin text,
  website text
);
alter table public.social_links enable row level security;
create policy "Public read social" on public.social_links for select using (
  exists(select 1 from public.talent_profiles tp where tp.id=talent_id and (tp.is_public or auth.uid()=tp.user_id))
);
create policy "Owners manage social" on public.social_links for all using (
  exists(select 1 from public.talent_profiles tp where tp.id=talent_id and auth.uid()=tp.user_id)
);

-- 8. Hire Requests (NEW)
create table if not exists public.hire_requests (
  id uuid primary key default gen_random_uuid(),
  talent_id uuid not null references public.talent_profiles(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  service text,
  message text not null,
  status text not null default 'new' check (status in ('new','read','replied')),
  created_at timestamptz not null default now()
);
alter table public.hire_requests enable row level security;
create policy "Anyone can submit hire request" on public.hire_requests for insert with check (true);
create policy "Talent sees own requests" on public.hire_requests for select using (
  exists(select 1 from public.talent_profiles tp where tp.id=talent_id and auth.uid()=tp.user_id)
);
create policy "Talent updates own request status" on public.hire_requests for update using (
  exists(select 1 from public.talent_profiles tp where tp.id=talent_id and auth.uid()=tp.user_id)
);

-- 9. Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$ begin new.updated_at=now(); return new; end; $$ language plpgsql;

create trigger set_talent_profiles_updated_at before update on public.talent_profiles
  for each row execute procedure public.set_updated_at();
create trigger set_portfolio_projects_updated_at before update on public.portfolio_projects
  for each row execute procedure public.set_updated_at();

-- 10. Auto-create profile on workspace signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles(id,username,email,full_name,role,invite_token)
  values(
    new.id,
    coalesce(new.raw_user_meta_data->>'username',split_part(new.email,'@',1)),
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role','employee'),
    (new.raw_user_meta_data->>'invite_token')::uuid
  ) on conflict(id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 11. Indexes for performance
create index if not exists idx_talent_profiles_username on public.talent_profiles(username);
create index if not exists idx_talent_profiles_public on public.talent_profiles(is_public);
create index if not exists idx_talent_services_talent on public.talent_services(talent_id);
create index if not exists idx_portfolio_talent on public.portfolio_projects(talent_id);
create index if not exists idx_hire_talent on public.hire_requests(talent_id);

-- Make first admin (run separately after signing up):
-- update public.profiles set role='admin' where email='upnited.marketing@gmail.com';
