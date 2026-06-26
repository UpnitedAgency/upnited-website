-- ============================================
-- UpNited Workspace: Employee Invite & Profiles
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Profiles table (extends Supabase auth.users with employee data)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text not null,
  full_name text,
  role text not null default 'employee' check (role in ('employee', 'manager', 'admin')),
  invite_token uuid,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile (but not their role)
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Admins/managers can view all profiles
create policy "Admins and managers can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'manager')
    )
  );

-- 2. Invites table (admin-generated invite links)
create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  token uuid not null default gen_random_uuid() unique,
  role text not null default 'employee' check (role in ('employee', 'manager', 'admin')),
  created_by uuid references auth.users(id),
  used boolean not null default false,
  used_at timestamptz,
  expires_at timestamptz not null default (now() + interval '7 days'),
  created_at timestamptz not null default now()
);

alter table public.invites enable row level security;

-- Anyone can read an invite by token (needed to validate the signup link before auth)
create policy "Anyone can read invite by token"
  on public.invites for select
  using (true);

-- Only admins can create invites
create policy "Admins can create invites"
  on public.invites for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Only admins can view all invites (for the admin dashboard list)
create policy "Admins can manage invites"
  on public.invites for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- 3. Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, email, full_name, role, invite_token)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'employee'),
    (new.raw_user_meta_data->>'invite_token')::uuid
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Mark invite as used once the linked profile is created
create or replace function public.handle_invite_used()
returns trigger as $$
begin
  if new.invite_token is not null then
    update public.invites
    set used = true, used_at = now()
    where token = new.invite_token;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_profile_created on public.profiles;
create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_invite_used();

-- 5. Make the very first signed-up user an admin (run manually once, replace email)
-- update public.profiles set role = 'admin' where email = 'upnited.marketing@gmail.com';
