# FreshCart

A minimal grocery list shared by the family, synced in real time through Supabase. Installable on iPhone as a home-screen app.

## Features

- Add, edit and delete items, with an optional note and quantity
- Check items off while shopping, then move them to a collapsible **Completed** section
- Clear all completed items in one tap
- Sort by pending first, newest, oldest or name
- Name suggestions from items you've added before (stored per device)
- Live sync: changes from one phone appear on the others
- Progress bar on mobile

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · Supabase (Auth, Postgres, Realtime) · Motion · Lucide icons

## Setup

### 1. Supabase database

Run in the Supabase SQL Editor:

```sql
create table grocery_items (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  note text,
  quantity int default 1,
  is_completed boolean default false,
  is_archived boolean default false,
  created_at bigint not null,
  user_id uuid references auth.users(id)
);

-- Live sync
alter publication supabase_realtime add table grocery_items;

-- Shared family list: every signed-in user can read and edit all items
alter table grocery_items enable row level security;

create policy "Authenticated users can manage all items"
on public.grocery_items for all
to authenticated
using (true)
with check (true);
```

### 2. Family accounts

1. **Authentication > Sign In / Providers**: turn off **Allow new users to sign up**. The policy above gives every signed-in user full access, so sign-ups must stay closed.
2. **Authentication > Users**: add an account for each family member.

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in the values from **Project Settings > API**:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

### 4. Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
npm run lint     # type-check
```

## Deploy (Vercel)

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Environment Variables.
3. Deploy.

## Install on iPhone

Open the site in Safari → **Share** → **Add to Home Screen** → **Add**.
