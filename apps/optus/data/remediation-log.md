# Optus NOC remediation log

Demo artifact for Cursor Cloud Agents. Agents append incident notes here when
dispatched from the Optus NOC console.

| Timestamp (UTC) | Incident | Hypothesis | Actions |
| --- | --- | --- | --- |
| 2026-07-22T23:39:00Z | Cell site backhaul degrade — MEL-RAN-214 | Weather-driven microwave path fade; BFD flaps correlate with RSSI dip and load shift to RAN-218 | Dampen paging; temporarily prefer RAN-218; schedule field path check |

## Cell site backhaul degrade — MEL-RAN-214

**Likely root cause:** Microwave backhaul fade on the MEL-RAN-214 path (OID `1.3.6.1.4.1.9999.2.14`), likely weather-related, with intermittent BFD loss and no single faulty network element. Neighbour cell PRB util on RAN-218 suggests traffic has shifted onto alternate RAN while the primary backhaul is unstable.

**Recommended operator actions:**

1. Correlate microwave RSSI, BFD session history, and RAN-218 load before any hard failover.
2. Dampen duplicate paging for MEL-RAN-214 while transport is marginal.
3. Prefer RAN-218 for new sessions temporarily if RF and capacity allow.
4. Open a field / microwave path inspection ticket after the fade window; avoid blind microwave reboots.

**Deterministic runbooks:** Exceeds safe automation — backend filtering and suppress-and-page complete, but the decision tree stops on conflicting transport vs RAN telemetry. Agentic handoff required for multi-domain reasoning and operator-facing change plan.
