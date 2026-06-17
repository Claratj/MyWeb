# Clara Toloba — Personal Website

Personal portfolio showcasing my work in **web development, photography and graphic design**.

🔗 Live: [claratoloba.com](https://claratoloba.com)

## Tech stack

- [React 19](https://react.dev/) — UI library
- [Vite](https://vite.dev/) — build tool & dev server
- [React Router](https://reactrouter.com/) — client-side routing
- [MUI](https://mui.com/) — UI components
- [Framer Motion](https://www.framer.com/motion/) & [AOS](https://michalsnik.github.io/aos/) — animations
- [Lottie](https://airbnb.io/lottie/) — vector animations
- [Sass](https://sass-lang.com/) — styling
- TypeScript

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) **22.x**
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page reloads automatically as you edit.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server (with HMR) |
| `npm run build` | Build for production into the `dist/` folder |
| `npm run preview` | Preview the production build locally |

## Project structure

```
public/            Static assets served as-is (favicon, icon fonts)
src/
  assets/          Images, fonts and Lottie animations
  core/            Layout & routing (Header, Footer, Router)
  pages/           Route pages (Home, About, Hero, WebDevelopment, Creative…)
  shared/          Reusable components (Button, ProjectList, ProjectItem)
  data/            Project/portfolio content (JSON)
  styles/          Global Sass (settings, elements, blocks)
  main.jsx         App entry point
index.html         Vite HTML entry
```

## Deployment

The site is deployed on [Netlify](https://www.netlify.com/). Configuration lives in [`netlify.toml`](./netlify.toml):

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback redirect so client-side routes (e.g. `/web`) resolve on reload

Every push to a pull request generates a Netlify deploy preview; merging to `main` deploys to production.
