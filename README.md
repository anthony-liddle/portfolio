# Anthony Liddle's portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)

Personal portfolio and case study site for [anthonyliddle.dev](https://anthonyliddle.dev).

## Features

- Editorial typographic design set in Libre Baskerville and Inter
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
  writing/            Case study essays (MDX)
  projects/           Index of finished, running work
  lately/             Watching, reading, and listening
  about/              About page
components/           Shared UI components
content/case-studies.ts  Source of truth for the case study essays
content/projects.ts      Source of truth for the projects index
lib/cn.ts             classnames utility
```

## Tech stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [Tailwind CSS v4](https://tailwindcss.com/) using the CSS-first config
- [MDX](https://mdxjs.com/) for the case study content
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) loading Libre Baskerville and Inter

## Contributing

This is a personal site. Issues and PRs are welcome for bug fixes.

## License

MIT © Anthony Liddle
