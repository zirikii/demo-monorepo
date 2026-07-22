export type PipelineStageId =
  | "network-event"
  | "snmp-alert"
  | "backend-filter"
  | "rabbitmq"
  | "remediation";

export type PipelineStage = {
  id: PipelineStageId;
  label: string;
  short: string;
  description: string;
};

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "network-event",
    label: "Network event",
    short: "Event",
    description: "Link flap, BGP withdraw, or cell site anomaly detected on the Optus RAN/IP fabric.",
  },
  {
    id: "snmp-alert",
    label: "SNMP alert",
    short: "SNMP",
    description: "Trap / poller raises a structured alert with OID, severity, and device context.",
  },
  {
    id: "backend-filter",
    label: "Backend filtering",
    short: "Filter",
    description: "Dedup, suppress flapping noise, enrich with topology, and classify runbook eligibility.",
  },
  {
    id: "rabbitmq",
    label: "RabbitMQ",
    short: "Queue",
    description: "Automation workers consume remediation jobs from durable queues.",
  },
  {
    id: "remediation",
    label: "Remediation",
    short: "Action",
    description: "Deterministic playbooks first; agentic AI when the decision tree ends.",
  },
];

export const STAGE_INDEX: Record<PipelineStageId, number> = Object.fromEntries(
  PIPELINE_STAGES.map((stage, index) => [stage.id, index]),
) as Record<PipelineStageId, number>;
