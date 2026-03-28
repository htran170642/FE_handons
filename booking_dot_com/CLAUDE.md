# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hotel booking MVP frontend inspired by Booking.com. Primary focus: **React, HTML5, CSS3, Tailwind CSS**. Currently uses static mock data — no backend yet.

## Commands

All commands must be run from the `frontend/` directory:

```bash
cd frontend

npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint check
npm test             # Run all Jest tests
npm run test:watch   # Tests in watch mode
```

## Architecture

**User flow:** Home → Search → Hotel Detail → Booking
**UI components** in `components/ui/` follow shadcn/ui patterns with CVA variants.

## Design Tokens

Defined in `tailwind.config.js`:

| Token | Value |
|---|---|
| Brand blue | `#003b95` |
| CTA blue | `#006ce4` |
| Yellow accent | `#ffb700` |
| Green (score) | `#008234` |
| Text body | `#1a1a1a` |
| Text muted | `#595959` |
| Border | `#e7e7e7` |
| Background | `#f5f5f5` |

## Key Conventions

- Import alias `@/*` maps to `frontend/` root
- State management: React state only (no Redux)
- All new UI components go in `components/ui/` if they're primitives, or `components/` if they're feature components
- Reference HTML designs are in `references/` (home.html, hotel.html, booking.html) — use these as visual spec