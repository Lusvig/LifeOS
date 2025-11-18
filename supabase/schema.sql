-- Enable Row Level Security
alter default privileges in schema public grant all on tables to postgres, anon, authenticated;

-- 1. PROFILES (Gamification & Settings)
create table profiles (
  id uuid references auth.users not null,
  username text unique,
  avatar_url text,
  xp_total integer default 0,
  current_level integer default 1,
  current_streak integer default 0,
  primary key (id)
);

-- 2. TASKS (The Brain)
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  title text not null,
  description text,
  priority text check (priority in ('low', 'medium', 'high', 'critical')),
  status text check (status in ('todo', 'in_progress', 'done')),
  energy_cost int check (energy_cost between 1 and 5),
  due_date timestamptz,
  created_at timestamptz default now()
);

-- 3. PANTRY (Smart Kitchen)
create table pantry_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  name text not null,
  quantity float default 1.0,
  unit text,
  barcode text,
  expiry_date date,
  is_in_shopping_list boolean default false
);

-- 4. FINANCE (Heatmap Data)
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  amount numeric not null,
  type text check (type in ('income', 'expense')),
  category text,
  date date default CURRENT_DATE,
  receipt_image_url text
);

-- 5. ZEN SESSIONS (Focus Logs)
create table focus_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id),
  duration_minutes int,
  completed_at timestamptz default now(),
  focus_rating int
);
