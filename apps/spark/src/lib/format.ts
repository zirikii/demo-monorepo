export function formatPrice(price: number) {
  return `$${price}`;
}

export function formatAllowance(primary: string, secondary?: string) {
  return secondary ? `${primary} | ${secondary}` : primary;
}
