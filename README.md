# Marco Molinari — Personal Portfolio

Personal portfolio and blog built with React, TanStack Router, and Tailwind CSS v4.

**Live:** [marco.molinari.dev](https://marco.molinari.dev) · **Repo:** [github.com/themolinario/marco-molinari-dev](https://github.com/themolinario/marco-molinari-dev)

## Stack

- **Framework:** React 19 + TanStack Router (file-based routing)
- **Styling:** Tailwind CSS v4 (CSS-first config) + CSS custom properties
- **Content:** content-collections (MDX/Markdown blog posts)
- **Animations:** Framer Motion
- **Build:** Vite 7

## Design

Editorial / Swiss philosophy — single warm amber accent (`#c8a96e` dark, `#8a6a28` light), 4-level background depth system, Fraunces display font + Manrope UI font.

Supports **dark and light mode** with a persistent toggle (localStorage) and FOUC-free initialization.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Project Structure

```
src/
  components/    # Hero, Navbar, Experience, Projects, About, Contact, Blog, ThemeToggle, Scene
  routes/        # TanStack Router file-based routes (__root, index, blog/*)
  styles.css     # Design tokens + global styles
content/
  blog/          # MDX / Markdown posts
public/
  images/        # Static assets
```
