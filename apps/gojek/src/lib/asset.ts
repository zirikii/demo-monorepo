import { asset as resolveAsset } from "@demo/ui/asset";

/** Public asset URL, prefixed with Vite `base` for subpath deploys. */
export function asset(path: string): string {
  return resolveAsset(path, import.meta.env.BASE_URL);
}
