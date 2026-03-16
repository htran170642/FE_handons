# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a React learning workspace following the [official react.dev/learn](https://react.dev/learn) curriculum. Each exercise is a hands-on implementation of concepts from the plan in [PLAN.md](PLAN.md).

## Project Setup

Each exercise or mini-project uses Vite + React. To create a new exercise project:

```bash
npm create vite@latest <exercise-name> -- --template react
cd <exercise-name>
npm install
npm run dev
```

## Common Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Learning Structure

The plan progresses through these phases (see [PLAN.md](PLAN.md) for full details):

1. **Describing the UI** — components, JSX, props, conditional rendering, lists
2. **Adding Interactivity** — events, `useState`, immutable state updates
3. **Managing State** — lifting state, controlled components, state structure
4. **Escape Hatches** — `useEffect`, `useRef`, syncing with external systems
5. **Practice Projects** — Todo App, Weather App, Shopping Cart, etc.

With practice projects, please do it slowly, explain the source code deeply

## Architecture Conventions

- Each concept/exercise lives in its own directory or component file under `src/`
- Components use functional style with hooks (no class components)
- State updates follow immutability patterns (spread operators, not direct mutation)
- Keep components pure — no side effects outside `useEffect`
