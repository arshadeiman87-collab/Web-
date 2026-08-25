create extension if not exists pgcrypto;
create table if not exists restaurants(id uuid primary key default gen_random_uuid(),name text not null,slug text unique not null,cuisine text,address text,phone text,logo_url text,created_at timestamptz default now());
create table if not exists menu_items(id uuid primary key default gen_random_uuid(),restaurant_id uuid references restaurants(id) on delete cascade,name text not null,description text,price numeric(10,2) not null,category text,stock int default 0,is_available boolean default true,created_at timestamptz default now());
create table if not exists dining_tables(id uuid primary key default gen_random_uuid(),restaurant_id uuid references restaurants(id) on delete cascade,table_number text not null,seats int default 2,status text default 'available');
create table if not exists customer_profiles(id uuid primary key default gen_random_uuid(),email text unique,name text,phone text,points int default 0,referral_code text unique,created_at timestamptz default now());
create table if not exists orders(id uuid primary key default gen_random_uuid(),restaurant_id uuid references restaurants(id),customer_id uuid references customer_profiles(id),table_id uuid references dining_tables(id),order_type text default 'dine-in',status text default 'pending',total numeric(10,2) default 0,created_at timestamptz default now());
create table if not exists order_items(id uuid primary key default gen_random_uuid(),order_id uuid references orders(id) on delete cascade,menu_item_id uuid references menu_items(id),quantity int not null,unit_price numeric(10,2) not null);
create table if not exists loyalty_transactions(id uuid primary key default gen_random_uuid(),customer_id uuid references customer_profiles(id),points int not null,reason text,created_at timestamptz default now());
alter table restaurants enable row level security; alter table menu_items enable row level security;
create policy "public restaurants read" on restaurants for select using(true);
create policy "public menu read" on menu_items for select using(true);
insert into restaurants(name,slug,cuisine,address) values('The Yorkshire Kitchen','yorkshire-kitchen','British','24 High Street, Leeds') on conflict(slug) do nothing;
insert into menu_items(restaurant_id,name,description,price,category,stock) select id,'Classic Fish & Chips','Crispy cod, chips & tartare sauce',12.95,'Mains',25 from restaurants where slug='yorkshire-kitchen' and not exists(select 1 from menu_items where name='Classic Fish & Chips');
insert into menu_items(restaurant_id,name,description,price,category,stock) select id,'Chicken Tikka Wrap','Grilled chicken, salad & mint sauce',9.50,'Mains',18 from restaurants where slug='yorkshire-kitchen' and not exists(select 1 from menu_items where name='Chicken Tikka Wrap');
insert into menu_items(restaurant_id,name,description,price,category,stock) select id,'Loaded Fries','Cheese, spring onion & house sauce',6.95,'Sides',30 from restaurants where slug='yorkshire-kitchen' and not exists(select 1 from menu_items where name='Loaded Fries');

-- Realtime publication (safe if already present in a fresh Supabase project):
alter publication supabase_realtime add table menu_items;
alter publication supabase_realtime add table orders;
