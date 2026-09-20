import type { OpenSourceProject } from "./types";

export const OPEN_SOURCE_INTRO =
  "We have built on open source since the first week of the company. When a tool has survived enough production traffic to be useful to somebody else, we publish it — along with the operational lessons that shaped it.";

export const OPEN_SOURCE_PROJECTS: OpenSourceProject[] = [
  {
    name: "optimus",
    language: "Go",
    description:
      "Workflow orchestration for batch and streaming data pipelines, with safe concurrent backfills and lineage captured from operator declarations.",
    stars: 4820,
    topics: ["data", "scheduler", "lineage"],
  },
  {
    name: "firehose",
    language: "Java",
    description:
      "A sink connector that streams Kafka topics into warehouses, object stores, and databases without a bespoke consumer per destination.",
    stars: 3110,
    topics: ["kafka", "streaming", "etl"],
  },
  {
    name: "stencil",
    language: "Go",
    description:
      "Schema registry and compatibility enforcement for protobuf event contracts shared across hundreds of services.",
    stars: 1980,
    topics: ["schema", "protobuf", "governance"],
  },
  {
    name: "shield",
    language: "Go",
    description:
      "Authorisation and policy service providing fine-grained access control for internal platform tooling.",
    stars: 1440,
    topics: ["authz", "policy", "security"],
  },
  {
    name: "asphalt-tokens",
    language: "TypeScript",
    description:
      "The token pipeline behind our design system, generating synchronised theme output for web, Android, and iOS from one source.",
    stars: 2260,
    topics: ["design system", "tokens", "multiplatform"],
  },
  {
    name: "courier",
    language: "Kotlin",
    description:
      "An MQTT client library tuned for mobile networks, keeping long-lived connections alive through handovers and dead zones.",
    stars: 2870,
    topics: ["mobile", "mqtt", "networking"],
  },
  {
    name: "raccoon",
    language: "Go",
    description:
      "High-throughput event collection over WebSocket and gRPC, designed to absorb mobile event bursts without dropping records.",
    stars: 1620,
    topics: ["events", "ingestion", "grpc"],
  },
  {
    name: "weaver",
    language: "Rust",
    description:
      "A geospatial indexing library for S2-cell based supply and demand aggregation at street granularity.",
    stars: 1180,
    topics: ["geospatial", "s2", "indexing"],
  },
];

export const OPEN_SOURCE_FACTS = [
  "Roughly one in six engineers contributes to a public repository each quarter.",
  "We run one of the larger Go, Clojure, and JVM estates in the region.",
  "Every public repository has a named maintainer rota and a published response target.",
];
