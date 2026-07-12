export type StandardRate = {
  service: string;
  rate: string;
};

export const standardRates: StandardRate[] = [
  { service: "Additional NZ minutes", rate: "$0.49 per minute" },
  { service: "Additional standard NZ texts", rate: "$0.20 per message" },
  { service: "MMS (picture messaging)", rate: "$0.50 per message" },
  { service: "Video calling", rate: "$0.89 per minute" },
  { service: "International text message", rate: "$0.30 per message" },
  { service: "Casual data", rate: "$1.00 per day for 10MB" },
  { service: "Additional casual data", rate: "$0.30 per MB" },
  { service: "Voicemail", rate: "$0.20 per retrieval" },
  { service: "Video messaging", rate: "$1.00 per message" },
  {
    service: "International direct-dial calling: Australia, USA, Canada, United Kingdom, Ireland",
    rate: "$0.91 per minute",
  },
  { service: "International direct-dial calling: Rest of the world", rate: "$1.43 per minute" },
];
