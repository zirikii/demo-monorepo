/**
 * Resolve a path under an app's `public/` folder when the app may be served
 * from a subpath (e.g. `/optus/`, `/seek/`).
 *
 * @param path - Absolute-from-public path, e.g. `/brand/logo.svg`
 * @param base - Deploy base with trailing slash (Vite `import.meta.env.BASE_URL`)
 *               or without (Next `NEXT_PUBLIC_BASE_PATH` like `/seek` or `""`)
 */
export function asset(path: string, base: string = "/"): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  if (!base || base === "/") {
    return `/${normalized}`;
  }
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${prefix}/${normalized}`;
}
