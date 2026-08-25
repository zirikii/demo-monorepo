import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RovoLogo } from "./RovoLogo";

const ATL_DARK = "#0052CC";
const ATL_LIGHT = "#2684FF";

/** Products with official mark artwork (matching the supplied logo lockups). */
interface OfficialMark {
  viewBox: string;
  render: (uid: string) => ReactNode;
}

const LOOM_SPOKES = [0, 45, 90, 135, 180, 225, 270, 315];

const OFFICIAL: Record<string, OfficialMark> = {
  jira: {
    viewBox: "0 0 128 128",
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-j1`} x1="98%" y1="0%" x2="58%" y2="40%">
            <stop offset="18%" stopColor={ATL_DARK} />
            <stop offset="100%" stopColor={ATL_LIGHT} />
          </linearGradient>
          <linearGradient id={`${uid}-j2`} x1="98%" y1="0%" x2="58%" y2="40%">
            <stop offset="18%" stopColor={ATL_DARK} />
            <stop offset="100%" stopColor={ATL_LIGHT} />
          </linearGradient>
        </defs>
        <path
          fill={ATL_LIGHT}
          d="M108.023 16H61.805c0 11.52 9.324 20.848 20.847 20.848h8.5v8.226c0 11.52 9.328 20.848 20.848 20.848V19.977A3.98 3.98 0 0 0 108.023 16z"
        />
        <path
          fill={`url(#${uid}-j1)`}
          d="M85.121 39.04H38.902c0 11.519 9.325 20.847 20.844 20.847h8.504v8.226c0 11.52 9.328 20.848 20.848 20.848V43.016a3.983 3.983 0 0 0-3.977-3.977z"
        />
        <path
          fill={`url(#${uid}-j2)`}
          d="M62.219 62.078H16c0 11.524 9.324 20.848 20.848 20.848h8.5v8.23c0 11.52 9.328 20.844 20.847 20.844V66.059a3.984 3.984 0 0 0-3.976-3.98z"
        />
      </>
    ),
  },
  confluence: {
    viewBox: "0 0 24 24",
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-c1`} x1="99%" y1="112%" x2="33%" y2="37%">
            <stop offset="18%" stopColor={ATL_DARK} />
            <stop offset="100%" stopColor={ATL_LIGHT} />
          </linearGradient>
          <linearGradient id={`${uid}-c2`} x1="1%" y1="-12%" x2="67%" y2="63%">
            <stop offset="18%" stopColor={ATL_DARK} />
            <stop offset="100%" stopColor={ATL_LIGHT} />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${uid}-c1)`}
          d="M.87 18.257c-.248.382-.53.875-.763 1.245a.764.764 0 0 0 .255 1.04l4.965 3.054a.764.764 0 0 0 1.058-.26c.199-.332.454-.763.733-1.221 1.967-3.247 3.945-2.853 7.508-1.146l4.957 2.337a.764.764 0 0 0 1.028-.382l2.364-5.346a.764.764 0 0 0-.382-1.007c-1.042-.492-3.09-1.46-4.92-2.352-6.72-3.372-12.46-3.164-16.803 4.038z"
        />
        <path
          fill={`url(#${uid}-c2)`}
          d="M23.131 5.743c.249-.382.531-.875.764-1.245a.764.764 0 0 0-.256-1.04L18.675.404a.764.764 0 0 0-1.058.26c-.199.332-.455.763-.734 1.221-1.967 3.247-3.945 2.853-7.508 1.146L4.418.694a.764.764 0 0 0-1.028.382L1.026 6.422a.764.764 0 0 0 .382 1.007c1.042.492 3.09 1.46 4.92 2.352 6.72 3.372 12.46 3.164 16.803-4.038z"
        />
      </>
    ),
  },
  bitbucket: {
    viewBox: "0 0 24 24",
    render: () => (
      <path
        fill={ATL_LIGHT}
        fillRule="evenodd"
        d="M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z"
      />
    ),
  },
  loom: {
    viewBox: "-12 -12 24 24",
    render: () => (
      <g fill="#625DF5">
        {LOOM_SPOKES.map((angle) => (
          <rect
            key={angle}
            x="-2.7"
            y="-11.5"
            width="5.4"
            height="7.6"
            rx="2.4"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    ),
  },
};

/**
 * Stand-in glyphs for products without supplied artwork, rendered
 * containerless in the product colour so they sit alongside the official
 * marks. Trello keeps its tile — the official Trello mark is a blue tile
 * with two white columns.
 */
interface StandInMark {
  fill: string;
  tile?: boolean;
  glyph: (fill: string) => ReactNode;
}

const STANDINS: Record<string, StandInMark> = {
  "jira-service-management": {
    fill: ATL_LIGHT,
    glyph: (fill) => (
      <path
        fill={fill}
        d="M7 6h18v4.8H7V6Zm0 8.1h18V25c0 .9-.6 1.5-1.5 1.5h-15c-.9 0-1.5-.6-1.5-1.5V14.1Z"
      />
    ),
  },
  "jira-product-discovery": {
    fill: "#8F7EE7",
    glyph: (fill) => (
      <path
        fill={fill}
        d="M16 3.5 28.5 16 16 28.5 3.5 16 16 3.5Zm0 8.2L11.7 16 16 20.3 20.3 16 16 11.7Z"
      />
    ),
  },
  trello: {
    fill: "#0052CC",
    tile: true,
    glyph: (fill) => <path fill={fill} d="M9 8h5.4v16H9V8Zm8.6 0H23v10.5h-5.4V8Z" />,
  },
  focus: {
    fill: "#6B5CE7",
    glyph: (fill) => (
      <path
        fill={fill}
        d="M16 5a11 11 0 1 1 0 22 11 11 0 0 1 0-22Zm0 4.4a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2Zm0 3.6a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
      />
    ),
  },
  talent: {
    fill: "#6B5CE7",
    glyph: (fill) => (
      <path
        fill={fill}
        d="M16 5.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm-10 21c.9-4.8 5-7.7 10-7.7s9.1 2.9 10 7.7H6Z"
      />
    ),
  },
  "jira-align": {
    fill: "#6B5CE7",
    glyph: (fill) => (
      <path fill={fill} d="M4.5 25 16 6.8 27.5 25h-23Zm5.2-3h12.6L16 12.2 9.7 22Z" />
    ),
  },
  "customer-service-management": {
    fill: ATL_LIGHT,
    glyph: (fill) => (
      <path fill={fill} d="M5.5 16a10.5 10.5 0 0 1 21 0v7h-4.2v-7a6.3 6.3 0 1 0-12.6 0v7H5.5v-7Z" />
    ),
  },
  assets: {
    fill: ATL_LIGHT,
    glyph: (fill) => (
      <path
        fill={fill}
        d="M4.5 8.9 16 3.2l11.5 5.7v14.2L16 28.8 4.5 23.1V8.9Zm11.5 3.2 6.5-3.2L16 5.6 9.5 8.9l6.5 3.2Z"
      />
    ),
  },
  "rovo-dev": {
    fill: "#1D9E75",
    glyph: (fill) => (
      <path fill={fill} d="M9 8 4 16l5 8h3.4L7.9 16l4.5-8H9Zm14 0h-3.4l4.5 8-4.5 8H23l5-8-5-8Z" />
    ),
  },
  dx: {
    fill: "#1F845A",
    glyph: (fill) => (
      <path
        fill={fill}
        d="M5.5 7h8.9c4.9 0 8 3.2 8 7.7s-3.1 7.8-8 7.8H5.5V7Zm4.3 4.3v7h4.3c2.3 0 3.7-1.4 3.7-3.6s-1.4-3.4-3.7-3.4h-4.3Zm13.7-4.3h3l-2 15.5h-3l2-15.5Z"
      />
    ),
  },
  pipelines: {
    fill: ATL_LIGHT,
    glyph: (fill) => <path fill={fill} d="M6 4.5h5.7V12l6 6h8.3v8h-7.9v-6L12 13.9H6V4.5Z" />,
  },
  feedback: {
    fill: "#8F7EE7",
    glyph: (fill) => (
      <path fill={fill} d="M4.5 6.5h23v16.1H13.4L4.5 28V6.5Zm4.3 4.6v6.9h14.4v-6.9H8.8Z" />
    ),
  },
};

export function AppMark({
  slug,
  size = 40,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const uid = useId();

  if (slug === "rovo") {
    return <RovoLogo size={size} className={className} />;
  }

  const standIn = STANDINS[slug];
  const official = OFFICIAL[slug] ?? (standIn ? undefined : OFFICIAL.jira!);

  if (official) {
    return (
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox={official.viewBox}
        className={cn("shrink-0", className)}
      >
        {official.render(uid)}
      </svg>
    );
  }

  const spec = standIn!;

  if (spec.tile) {
    return (
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className={cn("shrink-0 rounded-[6px]", className)}
        style={{ background: spec.fill }}
      >
        {spec.glyph("#FFFFFF")}
      </svg>
    );
  }

  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="2 2 28 28"
      className={cn("shrink-0", className)}
    >
      {spec.glyph(spec.fill)}
    </svg>
  );
}
