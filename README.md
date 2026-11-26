# Hailie Jade Ruiz — Portfolio

Personal portfolio built with **React + Vite + React Router**, extended from the original foundation template.

## Stack
- React 18, React Router 6: one fixed screen, no page scrolling. `/`, `/about`, `/skills`, `/projects`, `/contact` are panels you switch between; any other URL shows a 404 Not Found page (click the header menu, or the View my projects / Let's connect buttons on Home; wheel, swipe and arrow keys do nothing)
- **GSAP** for the preloader and magnetic buttons
- **motion** (Framer Motion successor): mobile menu, nav underline, project card tilt, scroll progress
- **tsParticles** hero particle network (reacts to the pointer)
- **Typed.js** rotating skills line, **CountUp.js** stats + preloader counter
- **Tailwind CSS v4** (`@tailwindcss/vite`), mobile-first: base styles are the phone layout, `md:` (768px, tablets) and `lg:` (1024px, desktops) add to them. Theme colors, fonts and easing live in `@theme` in `src/index.css`; shared class strings are in `src/lib/ui.js`. Custom `short` / `shorter` / `tall` variants handle low-height screens.
- Fonts self-hosted via Fontsource (Anton, DM Sans, Playfair Display)
- Motion ideas borrowed from `claude-animation-skills` (re-built in GSAP, since the skills themselves render mp4 reels):
  - **/minimalistic-graphics** → Skills: a dot hops down the skill rows (squash & stretch), an orbit ring + sparks land on the last row, then it follows your hover
  - **/breakdown** → Projects: the FaithEvents phone turns and comes apart layer by layer with leader-line labels (hover pauses it)
  - **/graph** → hairlines (section rules, skills list, About stats) draw themselves in from the left
- Animations always play. To honor the OS "reduce motion" setting, set `RESPECT_REDUCED_MOTION = true` in `src/lib/smooth.js`

## Run locally
```bash
npm install
npm run dev      # development
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## Edit your content
Everything (name, about, skills, tools, project, contact info) lives in `src/data/content.js`.
The About portrait is `src/assets/portrait-bw.webp`. The FaithEvents Events-page screenshot is `src/assets/faithevents-dashboard.webp` (shown by the Check-in / Events page toggle in Projects).

## Logo
`logo/` holds the HR monogram (black, white, green, app icon). Favicons are in `public/`.

## Hosting on GitHub Pages
The site uses `HashRouter` (URLs look like `/#/about`) and a relative Vite `base`, so it works from `https://<user>.github.io/<repo>/` without any server rewrites.

1. Push this project to a GitHub repo (branch `main`).
2. In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, builds the site and publishes `dist/`.

Do not point Pages at the repo root ("Deploy from a branch"): that serves the raw source, and the browser cannot run `/src/main.jsx`, which gives a blank white page.
