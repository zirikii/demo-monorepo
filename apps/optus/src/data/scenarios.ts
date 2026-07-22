import type { PipelineStageId } from "./pipeline";

export type ScenarioKind = "deterministic" | "agentic";

export type Scenario = {
  id: string;
  title: string;
  site: string;
  region: string;
  severity: "critical" | "warning" | "info";
  kind: ScenarioKind;
  oid: string;
  symptom: string;
  summary: string;
  deterministicLimit?: string;
  runbook?: string;
  agentSteps: string[];
};

export type FeedEvent = {
  id: string;
  at: number;
  stage: PipelineStageId;
  level: "info" | "ok" | "warn" | "critical";
  message: string;
};

export const SCENARIOS: Scenario[] = [
  {
    id: "bgp-flap-sydney",
    title: "BGP session flap on SYD-PE-07",
    site: "Sydney PE-07",
    region: "NSW",
    severity: "warning",
    kind: "deterministic",
    oid: "1.3.6.1.2.1.15.3.1.2",
    symptom: "BGP peer reset storm after IGP reconvergence",
    summary: "Known pattern matched to runbook RB-BGP-014 — clear stale sessions and verify prefix count.",
    runbook: "RB-BGP-014 · clear bgp soft + verify RIB",
    agentSteps: [
      "Matched historical signature for SYD-PE-07 flap storms",
      "Selected RB-BGP-014 deterministic actions",
      "Executed soft clear and confirmed peer Established",
    ],
  },
  {
    id: "cell-backhaul-degrade",
    title: "Cell site backhaul degrade — MEL-RAN-214",
    site: "Melbourne RAN-214",
    region: "VIC",
    severity: "critical",
    kind: "agentic",
    oid: "1.3.6.1.4.1.9999.2.14",
    symptom: "Microwave fade + intermittent BFD down without a single-device root cause",
    summary:
      "Filters enrich the alert, but no runbook covers multi-domain microwave + BFD + neighbour cell load.",
    deterministicLimit:
      "Decision tree ends after suppress-and-page: conflicting telemetry across transport and RAN.",
    agentSteps: [
      "Troubleshoot: correlate microwave RSSI, BFD flaps, and neighbour cell PRB util",
      "Reason: likely weather-driven path fade amplified by load shift onto RAN-218",
      "Select actions: dampen paging, prefer RAN-218 temporarily, schedule path check",
      "Execute remediation via Cursor Cloud Agent writing an operator note + change plan",
    ],
  },
  {
    id: "optical-power-low",
    title: "Optical Rx power low — BNE-CORE-02",
    site: "Brisbane CORE-02",
    region: "QLD",
    severity: "warning",
    kind: "deterministic",
    oid: "1.3.6.1.4.1.9.9.91.1.1.1.1",
    symptom: "Threshold breach on DWDM client port",
    summary: "Within attenuation playbook — verify patch, clean connector, re-seat if needed.",
    runbook: "RB-OPT-003 · optical threshold recovery",
    agentSteps: [
      "Confirmed threshold vs dirty-connector signature",
      "Queued optical recovery steps to RabbitMQ worker",
      "Cleared alert after Rx power returned to nominal",
    ],
  },
];

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((scenario) => scenario.id === id);
}

export function buildPipelineEvents(scenario: Scenario, startedAt: number): FeedEvent[] {
  const base: Omit<FeedEvent, "id">[] = [
    {
      at: startedAt,
      stage: "network-event",
      level: scenario.severity === "critical" ? "critical" : "warn",
      message: `${scenario.title} detected at ${scenario.site}`,
    },
    {
      at: startedAt + 700,
      stage: "snmp-alert",
      level: "info",
      message: `SNMP trap accepted · OID ${scenario.oid}`,
    },
    {
      at: startedAt + 1400,
      stage: "backend-filter",
      level: "info",
      message: "Dedup + topology enrichment complete · queue candidate published",
    },
    {
      at: startedAt + 2100,
      stage: "rabbitmq",
      level: "ok",
      message: "Remediation job enqueued on exchange noc.automation.remediate",
    },
  ];

  if (scenario.kind === "deterministic") {
    base.push(
      {
        at: startedAt + 2800,
        stage: "remediation",
        level: "info",
        message: `Deterministic runbook selected · ${scenario.runbook}`,
      },
      {
        at: startedAt + 3600,
        stage: "remediation",
        level: "ok",
        message: "Automated remediation succeeded · alert cleared",
      },
    );
  } else {
    base.push(
      {
        at: startedAt + 2800,
        stage: "remediation",
        level: "warn",
        message: "Deterministic automation limit reached — no safe single path",
      },
      {
        at: startedAt + 3400,
        stage: "remediation",
        level: "critical",
        message: scenario.deterministicLimit ?? "Hand off to agentic troubleshooting",
      },
    );
  }

  return base.map((event, index) => ({
    ...event,
    id: `${scenario.id}-${startedAt}-${index}`,
  }));
}
