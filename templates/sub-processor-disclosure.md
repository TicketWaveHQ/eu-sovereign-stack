# Sub-processor disclosure (copy-ready template)

A public sub-processor list is one of the cleanest ways to *show* sovereignty
rather than *sell* it. Copy this into a `/data-processors` (or
`/sub-processors`) page on your own site and fill in the rows. A live example
built on this pattern is at https://ticketwavehq.com/data-processors.

Publish the discipline alongside the list:

- Update the list within 7 days of any change.
- Give 30 days' notice, on the page and to affected subscribers, before a
  **material** change takes effect (a new sub-processor handling identifying
  data, a region change, or a regulator change).
- Removing a sub-processor needs no notice period; announce it within 7 days.

---

## Our sub-processors

We choose sub-processors that host your data in the EEA or the UK by default.
Where a vendor outside the EEA is used, we explain why below.

| Sub-processor | Purpose | Data-hosting region | Status |
|---|---|---|---|
| [Hosting vendor] | Application hosting | [e.g. UK, London] | Sovereign |
| [Database vendor] | Database, authentication, storage | [e.g. UK, `eu-west-2`] | Sovereign |
| [Analytics vendor] | Privacy-friendly analytics | [e.g. EU, Germany] | Sovereign (cookie-free, no personal data) |
| [Transactional email] | Account and receipt emails | [e.g. EU] | Sovereign |
| [Newsletter vendor] | Newsletter delivery | [e.g. EU, Lithuania] | Sovereign |
| [Error tracking] | Error monitoring | [e.g. EU, Germany] | Sovereign (PII scrubbed before send) |
| [Edge/CDN vendor] | DNS, CDN, WAF, TLS | Global edge | Documented exception, no personal data persisted at edge |
| [Payments vendor] | Payment processing | [e.g. Ireland, EU entity] | Documented exception, US parent under SCCs |

## Documented exceptions

We keep a small number of vendors outside a strict EEA/UK-only posture, and we
say why:

- **[Edge/CDN vendor]** provides DNS, firewall, and TLS termination at a global
  edge. No personal data is persisted at the edge; only operational metadata
  transits it.
- **[Payments vendor]** contracts through its EU entity. Transactional metadata
  (not primary content) may transit to its US parent under Standard Contractual
  Clauses. No realistic EEA-sovereign alternative matches the required feature
  set.

## How we manage changes

- New sub-processors handling identifying data are announced here 30 days before
  they go live.
- We update this page within 7 days of any change.
- Questions: [privacy contact address].

_Last updated: [date]._
