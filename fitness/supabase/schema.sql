create extension if not exists pgcrypto;

create table if not exists gyms(
 id uuid primary key default gen_random_uuid(), name text not null, owner_id uuid, timezone text default 'Europe/London',
 subscription_plan text default 'pro', created_at timestamptz default now()
);
create table if not exists members(
 id uuid primary key default gen_random_uuid(), gym_id uuid references gyms(id) on delete cascade,
 name text not null, email text not null, phone text, plan text default 'Standard',
 status text default 'active', goals text, points int default 0, qr_token text unique default encode(gen_random_bytes(18),'hex'),
 face_template jsonb, joined_at timestamptz default now()
);
create table if not exists classes(
 id uuid primary key default gen_random_uuid(), gym_id uuid references gyms(id) on delete cascade,
 name text not null, trainer text, starts_at timestamptz not null, duration_minutes int default 45,
 capacity int not null default 20, price_pence int default 0
);
create table if not exists bookings(
 id uuid primary key default gen_random_uuid(), class_id uuid references classes(id) on delete cascade,
 member_id uuid references members(id) on delete cascade, status text default 'booked',
 booked_at timestamptz default now(), cancelled_at timestamptz, unique(class_id,member_id)
);
create table if not exists waitlist(
 id uuid primary key default gen_random_uuid(), class_id uuid references classes(id) on delete cascade,
 member_id uuid references members(id) on delete cascade, position int not null, status text default 'waiting',
 created_at timestamptz default now(), promoted_at timestamptz
);
create table if not exists checkins(
 id uuid primary key default gen_random_uuid(), gym_id uuid references gyms(id) on delete cascade,
 member_id uuid references members(id) on delete cascade, method text not null,
 confidence numeric, checked_in_at timestamptz default now()
);
create table if not exists workout_history(
 id uuid primary key default gen_random_uuid(), member_id uuid references members(id) on delete cascade,
 exercise text, weight_kg numeric, reps int, completed_at timestamptz default now()
);
create table if not exists workouts(
 id uuid primary key default gen_random_uuid(), member_id uuid references members(id) on delete cascade,
 goal text, level text, duration_minutes int, plan jsonb not null, source text default 'ai',
 created_at timestamptz default now()
);
create table if not exists points_ledger(
 id uuid primary key default gen_random_uuid(), member_id uuid references members(id) on delete cascade,
 points int not null, reason text, checkin_id uuid references checkins(id), created_at timestamptz default now()
);
create table if not exists rewards(
 id uuid primary key default gen_random_uuid(), gym_id uuid references gyms(id) on delete cascade,
 name text not null, description text, points_cost int not null, stock int default 0, active boolean default true
);
create table if not exists redemptions(
 id uuid primary key default gen_random_uuid(), member_id uuid references members(id), reward_id uuid references rewards(id),
 points_spent int not null, status text default 'redeemed', created_at timestamptz default now()
);
create table if not exists payments(
 id uuid primary key default gen_random_uuid(), gym_id uuid references gyms(id) on delete cascade,
 member_id uuid references members(id), provider text default 'gocardless', provider_id text,
 amount_pence int, currency text default 'GBP', status text, retry_count int default 0,
 next_retry_at timestamptz, metadata jsonb, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists trial_leads(
 id uuid primary key default gen_random_uuid(), gym_id uuid references gyms(id) on delete cascade,
 email text not null, name text, source text default 'google', crm_status text default 'new',
 crm_response jsonb, created_at timestamptz default now()
);
create table if not exists webhook_events(
 id uuid primary key default gen_random_uuid(), provider text, event_id text unique, event_type text,
 payload jsonb, processed boolean default false, error text, created_at timestamptz default now()
);
create table if not exists gym_subscriptions(
 id uuid primary key default gen_random_uuid(), gym_id uuid references gyms(id) on delete cascade,
 provider text default 'gocardless', customer_id text, mandate_id text, status text default 'pending',
 plan text default 'pro', monthly_pence int default 9900, created_at timestamptz default now()
);

create index if not exists bookings_class_status_idx on bookings(class_id,status);
create index if not exists waitlist_class_status_idx on waitlist(class_id,status,position);
create index if not exists payments_status_idx on payments(status,next_retry_at);
create index if not exists members_qr_idx on members(qr_token);

-- Demo seed
insert into gyms(name,timezone,subscription_plan)
select 'FitFlow Demo Gym','Europe/London','pro'
where not exists(select 1 from gyms);

-- RLS: enable before production and add tenant-specific policies for auth.uid().
-- This starter intentionally leaves policies to be configured with your chosen auth model.
