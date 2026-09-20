import type { IntegrationToggle } from "./types";

export const DEFAULT_INTEGRATIONS: IntegrationToggle[] = [
  {
    id: "github",
    name: "GitHub",
    description: "Attach take-home repos and the OSS watchlist to your applicant profile.",
    enabled: true,
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    description: "Mirror application status. This demo writes to local JSON, not Greenhouse.",
    enabled: false,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Ping #hiring-gojek when a take-home lands. Simulated — no webhook leaves the browser.",
    enabled: false,
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Hold onsite slots. Toggling only stores a boolean in localStorage.",
    enabled: true,
  },
];
