# FreshCart

Family grocery list. React 19 + TypeScript + Vite + Tailwind 4, backed by Supabase (auth, `grocery_items` table, realtime).

## Commands
- `npm run dev` — dev server on port 3000
- `npm run lint` — type-check (`tsc --noEmit`)
- `npm run build` — production build

## Structure
- `src/App.tsx` — all state, Supabase CRUD, realtime subscription, sorting, list layout
- `src/components/` — `Auth` (email/password sign-in only), `GroceryForm` (add/edit + suggestions), `GroceryListItem`, `Header`
- `src/lib/supabase.ts` — client; requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
- `public/` — PWA manifest and icons

## Conventions
- UI updates come from the realtime subscription, not optimistic local state; this lag is intentional.
- Item lifecycle: pending → `is_completed` (checked) → `is_archived` (in Completed section) → deleted by "Clear All".
- Name suggestions live in localStorage per device (`freshcart_history`), not in Supabase.
- The list is shared: RLS lets any authenticated user edit any item. Accounts are created manually in Supabase; public sign-up is disabled.
- Schema lives in README.md; keep it in sync with `src/types.ts`.
