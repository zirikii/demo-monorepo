/** Paths the router serves, for link-integrity checks in tests. */
export const STEP_LINKS: RegExp[] = [
  /^\/$/,
  /^\/platform(\/[a-z0-9-]+)?$/,
  /^\/solutions\/[a-z0-9-]+$/,
  /^\/resources(\/[a-z0-9-]+)?$/,
  /^\/(pricing|customers|integrations|about|contact|demo|get-started)$/,
  /^\/login(\?.*)?$/,
  /^\/app(\/(channels|reservations|rates|events|billing|team|help))?$/,
  /^\/admin(\/(conversations|routing|simulator|assistant|property))?$/,
];
