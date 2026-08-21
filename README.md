# GRIM SIGNAL LABS

Complete source code for the GRIM SIGNAL LABS landing page.

The site presents rights-cleared, synchronized RGB, thermal, POV and ground-level datasets for computer vision, autonomous systems and Physical AI.

## Stack

- React 19
- Next-compatible Vinext application
- Vite
- TypeScript
- Tailwind CSS 4
- Cloudflare Worker-compatible production build

## Run locally

Requirements:

- Node.js 22.13 or newer
- npm

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## GitHub Pages

Every push to the `main` branch automatically builds and publishes the website
through the workflow in `.github/workflows/deploy-pages.yml`.

The production address is:

`https://karolhuzarski-maker.github.io/grimsignal/`

## Upload to GitHub

1. Create a new empty repository on GitHub.
2. Extract this project.
3. Upload the extracted files and folders to the repository.

Or use Git locally:

```bash
git init
git add .
git commit -m "Initial GRIM SIGNAL LABS website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Main files

- `app/page.tsx` - page structure and website copy
- `app/globals.css` - full visual design and responsive layout
- `app/layout.tsx` - metadata and social sharing configuration
- `public/og.png` - social preview image
- `public/` - logo and public assets

## Before public launch

- replace the temporary CSS brand symbol with the final GRIM SIGNAL LABS logo;
- add the correct contact email;
- replace the illustrative multisensor interface with authentic GSL RGB/thermal/POV material when available;
- update the production URL in `app/layout.tsx` if the website is moved to another domain.

## Brand colors

- primary: `#0D1115`
- accent: `#C5222E`
- warm background: `#F2F0EB`

© 2026 GRIM SIGNAL LABS
