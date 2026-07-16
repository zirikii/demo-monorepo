# Nine media demo

Unofficial Nine.com.au-inspired media demo built with Vite, React 19, TypeScript and Tailwind v4.

## Scripts

- `pnpm dev` - run on port 5177
- `pnpm test` - Vitest component/routing tests
- `pnpm lint` - ESLint
- `pnpm build` - TypeScript and Vite production build

## Demo caveat

The `/weather` page is intentionally buggy for Jira/demo workflows. Forecast cards overflow the
viewport and are tagged in the DOM with `DR-NINE-WEATHER-LAYOUT` so the bug can be located during
manual testing.

This app is an unofficial demo and is not affiliated with Nine Entertainment Co.
