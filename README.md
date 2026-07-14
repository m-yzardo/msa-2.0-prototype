# MSA 2.0 — Prototype 1

A redesign prototype for the **Marcone Servicer's Academy** (msaworld.com) — the membership site and learning portal for appliance repair professionals.

This prototype is a single-page React app covering both the public marketing site and the members-only experience, used to test layout, navigation, and the member workflow before production build.

## What's inside

**Public site** *(subject to change — see note below)*
- Landing, About, and Convention pages

**Members portal**
- Login and Join
- Dashboard
- Document library and document viewer
- Training and webinar player, with an in-place registration drawer (a lightweight "cart + checkout" for signing up to a session)
- Member benefits — a two-level section: a hub with U.S. and Canada categories (Training, Health, Business), each opening a page of grouped benefits with partner logos and links
- Ask a Trainer (browse + submit a question)
- Technical hotline

## Note on the public site

The public-facing site is still evolving and will be updated. We're evaluating building and managing it in **Framer** rather than in this codebase, so the public pages here should be treated as a working prototype, not the final implementation. The members portal remains the focus of this React app.

## Tech stack

- **React 18** + **React Router 7** (browser routing)
- **Vite 6** for dev server and build
- **Tailwind CSS v4** with shadcn/ui components built on **Radix UI**
- **MUI** and **Recharts** for select UI and data visualization
- **TypeScript**

## Running the code

```bash
pnpm install      # install dependencies
pnpm dev          # start the dev server
pnpm build        # production build
```

(`npm` works too if you prefer it.)

## Project structure

```
src/
  app/
    routes.tsx          # all route definitions
    components/
      layouts/          # PublicLayout, MembersLayout
      ui/               # shadcn/ui component library
    pages/
      public/           # Landing, About, Join, Convention, Login
      members/          # Dashboard, Training, Webinars, Documents, etc.
  styles/               # global styles / theme
```

## Deployment

Builds deploy to **GitHub Pages** via the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml). The production build is served under a sub-path (`/msa-2.0-prototype/`), which is configured in [vite.config.ts](vite.config.ts) and matched by the router's `basename`.
