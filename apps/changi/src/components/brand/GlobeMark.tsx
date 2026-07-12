interface GlobeMarkProps {
  className?: string;
  size?: number;
}

/**
 * The Changi Airport globe emblem, self-hosted from the official brand asset
 * (public/brand/changi-globe.svg). Kept as an <img> so the multi-colour
 * gradients render exactly as supplied.
 */
export function GlobeMark({ className, size = 40 }: GlobeMarkProps) {
  return (
    <img
      src="/brand/changi-globe.svg"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
    />
  );
}
