# Anthony Liddle — Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)

Personal portfolio and case study site for [anthonyliddle.dev](https://anthonyliddle.dev).

## Features

- Editorial typographic design — Libre Baskerville + Inter
- Dark/light mode respecting system preference (defaults to dark)
- MDX-powered case study pages with full prose styling
- Strict TypeScript, WCAG AA accessibility, Lighthouse 95+ target
- Zero client-side JS required for reading content

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx          Root layout with fonts, nav, metadata
  page.tsx            Home page
  globals.css         Tailwind + CSS design system
  work/               Case study pages (MDX)
  about/              About page
components/           Shared UI components
content/projects.ts   Source of truth for project metadata
lib/cn.ts             classnames utility
```

## Tech stack

- [Next.js 16](https://nextjs.org/) — App Router
- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first config
- [MDX](https://mdxjs.com/) — case study content
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) — Libre Baskerville + Inter

## Contributing

This is a personal site. Issues and PRs are welcome for bug fixes.

## License

MIT © Anthony Liddle
