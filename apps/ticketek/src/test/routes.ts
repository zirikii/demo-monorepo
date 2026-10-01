/** Paths the router serves, for link-integrity checks in tests. */
export const STEP_LINKS: RegExp[] = [
  /^\/$/,
  /^\/whats-on(\?.*)?$/,
  /^\/category\/(concerts|sports|theatre|family|comedy)(\?.*)?$/,
  /^\/search(\?.*)?$/,
  /^\/shows\/[a-z0-9-]+$/,
  /^\/venues(\/[a-z0-9-]+)?$/,
  /^\/login(\?.*)?$/,
  /^\/signup$/,
  /^\/account(\/(orders|history|favourites|waitlist|details|notifications|payment|password|close))?$/,
  /^\/(wheres-my-ticket|gift-vouchers|agencies|groups|accessible-ticketing|cart)$/,
  /^\/help(\/request|\/article\/[a-z0-9-]+|\/[a-z0-9-]+)?$/,
  /^\/admin(\/(conversations|routing|simulator|assistant|fan))?$/,
];
