# Optus NOC remediation log

Demo artifact for Cursor Cloud Agents. Agents append incident notes here when
dispatched from the Optus NOC console.

| Timestamp (UTC) | Incident | Hypothesis | Actions |
| --- | --- | --- | --- |
| 2026-07-22T21:55:00Z | Cell site backhaul degrade — MEL-RAN-214 | Weather-driven microwave fade + load shift to RAN-218 | Dampen paging; prefer RAN-218; schedule path check |

## MEL-RAN-214 — agentic remediation note

**SNMP OID:** `1.3.6.1.4.1.9999.2.14` · **Site:** Melbourne RAN-214

**Likely root cause:** Correlated microwave RSSI fade and intermittent BFD loss across transport and RAN domains, with no single faulty device. Telemetry suggests a weather-driven path attenuation event, compounded by neighbour cell PRB load shifting onto RAN-218 during the degrade window.

**Recommended operator actions:**

1. Dampen duplicate paging for MEL-RAN-214 while transport is unstable.
2. Temporarily prefer RAN-218 for subscriber offload where policy allows.
3. Schedule a field/path verification on the microwave hop after fade clears.
4. Continue correlating BFD flap timestamps with RSSI and neighbour util before closing.

**Deterministic runbooks:** **Exceeds** — enrichment and suppress-and-page run, but the decision tree has no safe single-path remediation when transport and RAN telemetry conflict (multi-domain microwave + BFD + neighbour load).
