export type Tint = "mint" | "blue" | "purple" | "pink" | "orange";

/** Background tint classes for icon chips and decorative panels. */
export const tintBg: Record<Tint, string> = {
  mint: "bg-mint-tint",
  blue: "bg-badge-blue",
  purple: "bg-badge-purple",
  pink: "bg-badge-pink",
  orange: "bg-badge-orange",
};

/** Slightly stronger tint used for illustration panels. */
export const tintPanel: Record<Tint, string> = {
  mint: "bg-mint/60",
  blue: "bg-badge-blue",
  purple: "bg-badge-purple",
  pink: "bg-badge-pink",
  orange: "bg-badge-orange",
};
