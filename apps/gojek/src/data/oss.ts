import type { OssProject } from "./types";

export const OSS_PROJECTS: OssProject[] = [
  {
    slug: "ziggurat",
    name: "Ziggurat",
    tagline: "A stream processing framework to build stateless applications on Kafka",
    language: "Clojure",
    stars: 407,
    featured: true,
    summary:
      "Clojure framework that abstracts Kafka consumption, RabbitMQ retries, and an HTTP server. Powers more than 250 applications at Gojek.",
  },
  {
    slug: "statsd-docker",
    name: "statsd-docker",
    tagline: "Dockerized version of StatsD with console backend",
    language: "Java",
    stars: 4,
    featured: true,
    summary: "The metrics sidecar we actually run — StatsD, boxed, with a console backend for local debugging.",
  },
  {
    slug: "proctor",
    name: "Proctor",
    tagline: "A developer friendly Automation Orchestrator",
    language: "Go",
    stars: 180,
    featured: true,
    summary:
      "proctord executes jobs (\"procs\") on Kubernetes so every engineer can run the runbook without SSH.",
  },
  {
    slug: "probed",
    name: "ProbeD",
    tagline: "A unix daemon to perform health check on proxy backends.",
    language: "Go",
    stars: 27,
    featured: true,
    summary:
      "Sits beside Kong (or the next proxy) and pulls unhealthy upstreams before the next 502 reaches a rider.",
  },
  {
    slug: "kubehandler",
    name: "Kubehandler",
    tagline: "A framework for writing Kubernetes controllers.",
    language: "Go",
    stars: 29,
    featured: true,
    summary:
      "EventHandler + EventLoop so you write Add/Update/Delete, not another untested workqueue.",
  },
  {
    slug: "heimdall",
    name: "Heimdall",
    tagline: "An enhanced HTTP client for Go",
    language: "Go",
    stars: 2774,
    featured: true,
    summary:
      "Retries, hystrix-style circuit breaking, and per-request timeouts — the client we use when 350 million internal calls/sec cannot flap.",
  },
  {
    slug: "kingsly",
    name: "Kingsly",
    tagline: "Your own x.509 cert manager",
    language: "Ruby",
    stars: 67,
    featured: true,
    summary: "Issues and renews TLS certificates so no one pages because a leaf expired at 3 a.m. WIB.",
  },
  {
    slug: "weaver",
    name: "Weaver",
    tagline: "An advanced HTTP reverse proxy with dynamic sharding strategies",
    language: "Go",
    stars: 601,
    featured: false,
    summary: "Shard traffic the way the marketplace actually shards — not the way a static nginx.conf wishes it did.",
  },
  {
    slug: "darkroom",
    name: "Darkroom",
    tagline: "Real-time image processing, now a SaaS your services can call",
    language: "Go",
    stars: 235,
    featured: false,
    summary: "500,000 images a minute with on-the-fly transforms. Storage backends and processors are interfaces.",
  },
  {
    slug: "courier",
    name: "Courier",
    tagline: "Notification platform and MQTT clients, now open source",
    language: "Go",
    stars: 210,
    featured: false,
    summary: "The pipe that tells a driver a GoFood is ready without inventing another websocket stack.",
  },
  {
    slug: "draftsman",
    name: "Draftsman",
    tagline: "On-device layout inspector you embed in an Android app",
    language: "Kotlin",
    stars: 253,
    featured: false,
    summary: "Inspect production layouts on the device that actually runs GoRide.",
  },
  {
    slug: "consul-envoy-xds",
    name: "consul-envoy-xds",
    tagline: "Envoy control plane fed by Consul watches",
    language: "Go",
    stars: 140,
    featured: false,
    summary: "CDS, EDS, and RDS from Consul so we do not hand-edit clusters when a service rolls.",
  },
];

export function featuredOss(): OssProject[] {
  return OSS_PROJECTS.filter((project) => project.featured);
}

export function getOss(slug: string): OssProject | undefined {
  return OSS_PROJECTS.find((project) => project.slug === slug);
}
