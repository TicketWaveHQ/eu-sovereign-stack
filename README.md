# EU / UK Sovereign Stack

**A curated list of EEA and UK-hosted alternatives to common US SaaS, with region-pinning notes you can actually verify.**

Most "EU-friendly" vendor pages tell you a region is *supported*. That is not the same as a region being *pinned*. This list is for engineers and operators who need to prove, in a procurement questionnaire or a data protection impact assessment, exactly **where** identifying personal data lives, **who** processes it, and **which regulator** has authority over it.

Every entry below names a real product, its data-hosting region, and the concrete configuration step that pins that region. Where a vendor is a documented exception (region-agnostic edge, US parent under Standard Contractual Clauses), we say so plainly rather than pretending the problem away.

British English throughout. Curated and maintained by [Sansware](https://ticketwavehq.com). Contributions welcome, see [Contributing](#contributing).

> This is an awesome-list, not legal advice. Region availability, corporate ownership, and transfer mechanisms change. Always verify against the vendor's current Data Processing Agreement and your own regulator's guidance before you rely on anything here.

---

## Contents

- [Why sovereignty, and why pinning](#why-sovereignty-and-why-pinning)
- [How to read an entry](#how-to-read-an-entry)
- [Analytics](#analytics)
- [Transactional and marketing email](#transactional-and-marketing-email)
- [Database and backend](#database-and-backend)
- [Authentication](#authentication)
- [Error and performance monitoring](#error-and-performance-monitoring)
- [Application hosting and edge](#application-hosting-and-edge)
- [Object storage and files](#object-storage-and-files)
- [Payments](#payments)
- [Documented exceptions](#documented-exceptions)
- [Region-pinning cheat sheet](#region-pinning-cheat-sheet)
- [A worked example: a fully pinned stack](#a-worked-example-a-fully-pinned-stack)
- [Verify it yourself](#verify-it-yourself)
- [Related resources](#related-resources)
- [Contributing](#contributing)
- [Licence](#licence)

---

## Why sovereignty, and why pinning

Data sovereignty is not a marketing wedge. It is a way to reduce compliance surface. A clean EEA/UK sub-processor mix removes the need to manage cross-border transfer mechanisms (the UK International Data Transfer Agreement, EU Standard Contractual Clauses, adequacy decisions) for your core personal-data flows. Fewer transfers means fewer things that can break when transfer case law shifts.

Three practical benefits follow:

1. **Procurement.** UK and EU public-sector buyers (schools, universities, NHS trusts, councils, charities) increasingly require named EEA/UK-only data flows in supplier questionnaires. A pinned stack answers those questions in one line each.
2. **Trust.** If your product copy promises that customer data stays in the UK or EU, your infrastructure should back that up. Sovereignty is shown, not sold.
3. **Resilience.** The US CLOUD Act, FISA Section 702, and Schrems-line case law create periodic surprises for US-hosted dependencies. Avoiding them where you reasonably can is operationally simpler than continually re-papering them.

**"Supported" is not "pinned."** A vendor supporting an EU region means you *can* select it. Pinning means you *have* selected it, the choice is captured in version-controlled configuration, and it is verifiable from outside (a trace header, an admin console screenshot, an account setting). This list only rewards pinning.

---

## How to read an entry

Each entry uses the same shape:

- **Vendor and product** - the specific service, not just the company.
- **Region** - the EEA/UK data-hosting region we are pinning to.
- **How to pin** - the concrete configuration step.
- **How to verify** - how to prove the pin from outside the vendor's marketing.
- **Notes** - corporate domicile, sub-processor caveats, feature caveats.

Legend:

- ✅ **Sovereign** - EEA/UK data hosting, pinnable and verifiable.
- ⚠️ **Exception** - kept deliberately; personal-data exposure is limited and documented (see [Documented exceptions](#documented-exceptions)).

---

## Analytics

Analytics is the easiest category to get right because you rarely need identifying data at all. Prefer cookie-free, aggregate-first tools.

### Plausible Analytics ✅

- **Region:** European Union. Plausible hosts on infrastructure in Germany.
- **How to pin:** Use the hosted `plausible.io` service, which is EU-hosted by default, or self-host in your own EEA/UK region. Add the script with `data-domain` set to your site; no configuration flag is needed to keep data in the EU on the hosted plan.
- **How to verify:** Plausible is cookie-free and collects no personal data by design, so there is no per-user record to localise. Confirm in the Plausible Data Policy and your account's data region setting.
- **Notes:** Plausible Insights OÜ is an Estonian company. Cookie-free and aggregate by default, which usually removes the need for a consent banner for analytics alone. Open-source core; self-hosting is a first-class option if you want the data on your own EEA/UK metal.

### Matomo ✅

- **Region:** Your choice. Matomo Cloud offers EU (Germany) hosting; self-hosted Matomo lives wherever you deploy it.
- **How to pin:** On Matomo Cloud, select the EU data centre at account creation. Self-hosted, deploy to an EEA/UK region (for example a London or Frankfurt VM/managed database).
- **How to verify:** Cloud data-region is shown in account settings. Self-hosted, you own the host, so the region is whatever you provisioned.
- **Notes:** InnoCraft Ltd is New Zealand-domiciled, but the Cloud EU tier and self-hosting both keep the *data* in the EEA. Heavier than Plausible; choose it when you need funnels, heatmaps, or full session detail.

### Pirsch ✅

- **Region:** European Union (Germany).
- **How to pin:** Default. Pirsch is operated by a German company and hosts in the EU.
- **How to verify:** Data region stated in the Pirsch privacy documentation.
- **Notes:** Cookie-free, privacy-first, lightweight. A good Plausible alternative if you want server-side integration options.

---

## Transactional and marketing email

Split these two jobs. Transactional (receipts, password resets) and marketing (newsletters, campaigns) often want different tools, and both should keep recipient lists in the EEA/UK.

### MailerLite ✅

- **Region:** European Union.
- **How to pin:** MailerLite is operated by MailerLite Limited, a Lithuanian company, and processes subscriber data in the EU. No region flag is required; the EU domicile is the default posture.
- **How to verify:** Confirm the processing location in the MailerLite Data Processing Agreement and sub-processor list.
- **Notes:** Under both UK GDPR and EU GDPR jurisdiction. A strong newsletter and campaign platform when you want the subscriber list to stay in the EEA. Prefer connecting via the generic API/webhook rather than a heavy SDK so the dependency stays swappable.

### Resend ✅ (EU endpoint)

- **Region:** European Union (regional sending endpoint available).
- **How to pin:** Select the EU region for your Resend account and send through the EU regional endpoint. Confirm the region in the Resend dashboard.
- **How to verify:** Region is shown in the account settings; message metadata and logs are held in the selected region.
- **Notes:** Developer-friendly transactional email with a clean API and React email templating. Verify the region pin in the admin console after setup, do not assume it.

### Scaleway Transactional Email (TEM) ✅

- **Region:** France (European Union).
- **How to pin:** Scaleway is a French cloud provider; TEM sends from French infrastructure. Region is fixed to Scaleway's EU regions.
- **How to verify:** Scaleway publishes its data-centre locations (Paris, Amsterdam, Warsaw) and its status as a French company.
- **Notes:** Good when you already run other workloads on Scaleway and want a single EU-domiciled provider for compute, storage, and email.

---

## Database and backend

The database is where identifying personal data most often accumulates, so pinning here matters most.

### Supabase (London / `eu-west-2`) ✅

- **Region:** United Kingdom. Supabase runs on AWS; the London region is `eu-west-2`.
- **How to pin:** Choose **London (`eu-west-2`)** (or another EEA region such as Frankfurt `eu-central-1`) when you create the project. The region is fixed at project creation, so pick it deliberately; moving later means a migration.
- **How to verify:** The project region is shown in the Supabase dashboard under project settings. The project ref does not encode the region, so confirm it in the dashboard rather than inferring it from the URL.
- **Notes:** Postgres, row-level security, storage, and auth in one project. Co-locating the database with your application region (for example Supabase London alongside a London-region host) keeps function-to-database latency low. Row-level security is the primary access-control boundary; use it rather than raw service-role queries against tables holding personal data.

### Neon (EU regions) ✅

- **Region:** European Union or UK. Neon offers AWS `eu-central-1` (Frankfurt) and other EEA regions.
- **How to pin:** Select an EEA/UK region when creating the Neon project. Region is fixed per project.
- **How to verify:** Region shown in the Neon console.
- **Notes:** Serverless Postgres with branching. Good developer ergonomics; confirm the specific region against your sovereignty requirement, as available regions change over time.

### Exoscale / Scaleway managed Postgres ✅

- **Region:** European Union. Exoscale (Switzerland/EU regions) and Scaleway (France) both offer managed databases in EEA data centres.
- **How to pin:** Select the EEA region at provisioning.
- **How to verify:** Provider publishes data-centre locations; the region you select is fixed for that instance.
- **Notes:** European-domiciled providers when you want the operating company, not just the data centre, inside the EEA.

---

## Authentication

Authentication touches identifiers (email, sometimes name, sometimes more) on every login, so keep it in the EEA/UK.

### Supabase Auth ✅

- **Region:** Same as your Supabase project (for example London `eu-west-2`).
- **How to pin:** Auth data lives in your Supabase project's Postgres, so pinning the project region ([above](#supabase-london-eu-west-2-)) pins auth too. No separate vendor.
- **How to verify:** Same as the Supabase project region check.
- **Notes:** Using the auth built into your database region removes an entire sub-processor from the diagram. Integrates natively with row-level security.

### Ory (self-hosted or EU cloud) ✅

- **Region:** Your choice when self-hosted; Ory Network offers EU regions.
- **How to pin:** Self-host Ory Kratos/Hydra in an EEA/UK region, or select an EU region on Ory Network.
- **How to verify:** Self-hosted, you own the region. On the network, region is an account setting.
- **Notes:** Open-source identity (login, registration, OAuth2/OIDC). Choose when you want full control of the identity layer on your own EEA/UK infrastructure.

### Zitadel (EU regions / self-hosted) ✅

- **Region:** Switzerland/EU on the managed cloud; anywhere you deploy when self-hosted.
- **How to pin:** Pick an EEA region for the managed instance, or self-host in-region.
- **How to verify:** Managed region shown in account settings; self-hosted region is your own.
- **Notes:** Swiss-domiciled identity platform with OIDC, SAML, and multi-tenancy. A capable EU-friendly alternative to US-hosted identity providers.

---

## Error and performance monitoring

Error trackers ingest stack traces and request context, which can carry personal data unless scrubbed. Pin the ingest region and scrub before send.

### Sentry (EU data region, `de.sentry.io`) ✅

- **Region:** European Union (Germany).
- **How to pin:** Create the Sentry organisation on the **EU data region**, so the DSN targets `*.de.sentry.io` (and ingest targets `*.ingest.de.sentry.io`). The data region is fixed at organisation creation and cannot be changed later, so create the org in EU from the start.
- **How to verify:** Confirm the DSN host starts with a subdomain of `de.sentry.io`. If your Content Security Policy has a `connect-src` for Sentry, it should reference the `ingest.de.sentry.io` host and not the US default. A small guard in your Sentry init that warns when the DSN is not an EU host is a cheap belt-and-braces check.
- **Notes:** Also enable PII scrubbing (`sendDefaultPii: false` and server-side data scrubbing) so identifying data is stripped before an event leaves the browser. Region pinning and scrubbing are complementary, do both.

### GlitchTip ✅

- **Region:** Your choice (self-hosted) or EU on hosted plans.
- **How to pin:** Self-host GlitchTip in an EEA/UK region, or select an EU-hosted plan.
- **How to verify:** Self-hosted, you own the region.
- **Notes:** Open-source, Sentry-SDK-compatible error tracking. Drop-in for many Sentry SDKs; good when you want error data entirely on your own EEA/UK infrastructure.

### Telemetry Tracker ✅

- **Region:** European Union (Amsterdam) on the official Hosted Cloud; your choice when self-hosted.
- **How to pin:** Use the Hosted Cloud at telemetry-tracker.com (API and primary PostgreSQL run on Railway in EU West, Amsterdam), or self-host the MIT open-source stack in an EEA/UK region via Docker and PostgreSQL as documented in DEPLOYMENT.md.
- **How to verify:** The public privacy policy states that Hosted Cloud API and primary PostgreSQL (including the database volume) run on Railway in EU West (Amsterdam). Self-hosted, you own the region. Prefer enabling ingest PII scrubbing and avoiding unnecessary personal data in SDK payloads.
- **Notes:** Built by a Slovenia-based operator (EEA). JavaScript and TypeScript error tracker with grouped errors, source maps, events, sessions and alerts. Hosted Free plan is available; self-hosting keeps all customer telemetry on your own infrastructure. Avatars use Cloudflare R2 (Eastern Europe location hint); confirm that against your own requirements if avatar storage matters.

### Highlight.io (self-hosted) ✅

- **Region:** Your choice when self-hosted.
- **How to pin:** Self-host in an EEA/UK region.
- **How to verify:** You own the deployment region.
- **Notes:** Session replay plus error monitoring. Self-hosting keeps replay data, which can be sensitive, in-region.

---

## Application hosting and edge

Where your functions execute and where your build artefacts and logs live.

### Vercel (London, `lhr1`) ✅

- **Region:** United Kingdom (London) for serverless function execution.
- **How to pin:** Set the function region in `vercel.json`:

  ```json
  {
    "regions": ["lhr1"]
  }
  ```

  This pins serverless/edge function execution to London. Co-locate with a London-region database (for example Supabase `eu-west-2`) to keep function-to-database latency low.
- **How to verify:** The `x-vercel-id` response header reflects the region that served the request. Confirm it resolves to `lhr1`:

  ```sh
  curl -sI https://your-domain.example | grep -i x-vercel-id
  ```

- **Notes:** Vercel is US-domiciled, but function execution region is pinnable and verifiable. Treat build logs and any platform analytics as aggregate operational metadata, and keep identifying personal data in your pinned database rather than in edge state. Some platform features (certain analytics, image optimisation caches) are region-agnostic; keep personal data out of them.

### Scaleway ✅

- **Region:** France, Netherlands, Poland (EU).
- **How to pin:** Select the EU region when provisioning compute, containers, or serverless functions.
- **How to verify:** Region is fixed per resource and shown in the console; Scaleway is a French company.
- **Notes:** French-domiciled cloud with compute, serverless, object storage, and managed databases. Choose when you want the operating company inside the EEA, not only the data centre.

### Hetzner ✅

- **Region:** Germany and Finland (EU).
- **How to pin:** Choose an EU location (for example Nuremberg, Falkenstein, Helsinki) when creating the server or volume.
- **How to verify:** Location is set per resource in the Hetzner console; Hetzner is a German company.
- **Notes:** Cost-effective German-domiciled hosting for VMs and dedicated servers. Good base layer for self-hosting the open-source tools listed above.

### OVHcloud ✅

- **Region:** France and other EU locations.
- **How to pin:** Select an EU data centre at provisioning.
- **How to verify:** Region shown per resource; OVHcloud is a French company.
- **Notes:** Large French-domiciled provider with a broad EEA footprint. Useful when procurement specifically wants a European hyperscaler alternative.

---

### Bunny.net ✅ (EU entity, global edge)

- **Region:** Slovenia. BunnyWay d.o.o. is an EU company, and storage zones are individually region-pinned — choose an EEA zone and the origin copy stays there.
- **How to pin:** Create the storage zone in an EEA region (Frankfurt, Stockholm, London, Paris) and set the pull zone to that origin. Edge PoPs remain global, which is the point of a CDN; the durable copy is what you are pinning.
- **How to verify:** The storage zone's region is shown in the dashboard and returned by the Storage API. Check request logs are disabled, or that their retention is set deliberately — edge logs contain requesting IP addresses.
- **Notes:** The clearest EEA-entity alternative to Cloudflare or Fastly for asset delivery. Treat the global edge as a documented exception on the same basis as any other CDN: the edge function is region-agnostic by nature, and personal data transits rather than resides. Substantially cheaper than the US incumbents at volume, which is rarely the reason to choose it but is not nothing.

## Object storage and files

User uploads, exports, and backups are personal-data-bearing; pin the bucket region.

### Supabase Storage ✅

- **Region:** Same as your Supabase project (for example London `eu-west-2`).
- **How to pin:** Storage lives in your project's region, so pinning the project pins storage.
- **How to verify:** Same as the Supabase project region check.
- **Notes:** S3-compatible object storage co-located with your database and auth. One region to reason about.

### Scaleway Object Storage ✅

- **Region:** France, Netherlands, Poland (EU).
- **How to pin:** Select the EU region for the bucket at creation.
- **How to verify:** Bucket region is fixed and shown in the console.
- **Notes:** S3-compatible, EU-domiciled operator. Good for backups and exports you want kept in-region.

### Cloudflare R2 ⚠️

- **Region:** Location-hint available (for example EU); Cloudflare is US-domiciled and region-agnostic by design.
- **How to pin:** Set a location hint of `eu` at bucket creation to bias placement to EEA data centres.
- **How to verify:** Location hint is set at bucket creation; Cloudflare publishes its transparency reporting and EU representative details.
- **Notes:** Kept as a [documented exception](#documented-exceptions) where you already use Cloudflare and the objects are non-identifying or the EU location hint is sufficient for your risk assessment. For strictly identifying data at scale, prefer a fully EEA-domiciled store above.

---

### Proton ✅ (Switzerland — UK adequacy)

- **Region:** Switzerland. Covered by a UK adequacy decision and an EU adequacy decision, so transfers need no additional safeguard.
- **How to pin:** Proton operates only from Swiss infrastructure; there is no region to select. Point your domain's MX records at Proton and the mailbox is Swiss by construction.
- **How to verify:** `dig MX yourdomain.com` should return Proton's mail hosts and nothing else. If a previous provider's routing is still in the chain, you have two mail processors and have disclosed one.
- **Notes:** Mail, calendar, drive and a password manager under one entity. Worth naming explicitly on a sub-processor register — mailboxes hold whatever a correspondent chooses to send, which is often the least controlled and most sensitive flow in a small company. Switzerland is adequate, not EEA; if your policy says EEA rather than adequate, that distinction matters and should be written down.

### Directus ⚪ (self-hosted — software, not a service)

- **Region:** Wherever you run it. That is the point.
- **How to pin:** Deploy on EEA compute you control. The data never leaves your infrastructure, because the vendor never receives it.
- **How to verify:** Confirm the deployment host's region, and confirm telemetry is disabled if you do not want version-check pings leaving the host.
- **Notes:** Listed because self-hosted software is the category most often handled wrongly on a sub-processor register. Running Directus yourself does not make Monospace an Article 28 sub-processor — no personal data reaches them in normal operation. Say that explicitly rather than omitting them: an omission reads as an oversight, whereas a stated rationale reads as a decision. The same logic applies to any self-hosted application.

## Payments

### Stripe (Stripe Payments Europe Ltd, Ireland) ⚠️

- **Region:** Ireland (EU customer-facing entity: Stripe Payments Europe, Limited).
- **How to pin:** Contract through the EU entity; your Stripe account under an EEA business is served by Stripe Payments Europe Ltd.
- **How to verify:** The contracting entity is shown in your Stripe agreement and dashboard.
- **Notes:** Kept as a [documented exception](#documented-exceptions). Operational metadata may transit to Stripe, Inc. (US) for fraud-prevention and support under Standard Contractual Clauses. The data exposed is transactional metadata, not primary content, and no realistic EEA-sovereign alternative matches Stripe's feature set (notably Stripe Connect) for many use cases. Document the exception rather than pretending it away.

### Mollie ✅

- **Region:** Netherlands (European Union).
- **How to pin:** Mollie is a Dutch payment provider; processing is EU-based.
- **How to verify:** Mollie's domicile and processing location are stated in its documentation.
- **Notes:** A strong EU-domiciled payments option for European markets, covering cards, iDEAL, SEPA, and more. Fewer platform/marketplace features than Stripe Connect; evaluate against your split-payment needs.

### GoCardless ✅

- **Region:** United Kingdom / European Union.
- **How to pin:** UK and EU entities serve UK/EEA merchants for bank-debit payments.
- **How to verify:** Contracting entity shown in your GoCardless agreement.
- **Notes:** Bank debit (Direct Debit, SEPA) rather than cards. Good for subscriptions and recurring billing where bank debit suits the audience.

---

## Documented exceptions

Sovereignty is not absolutism. A few vendors are kept deliberately because the personal-data exposure is limited, the alternative is materially worse, or the vendor is region-agnostic by nature. The discipline is to **document** each exception, not to hide it.

### Cloudflare (DNS, CDN, WAF, DDoS) ⚠️

- **Why kept:** Cloudflare provides DNS, TLS termination, a web application firewall, and DDoS protection at a global edge. Personal data is not persisted at the edge; what transits is operational (TLS metadata, WAF challenge events). No realistic EEA-sovereign alternative matches the security and reach at the required parity.
- **Discipline:** Rely on Cloudflare for edge security, not for persisting identifying data. Keep personal data in your pinned database. Cloudflare publishes a transparency report and names an EU representative.

### Stripe, Inc. (US parent) ⚠️

- **Why kept:** See [Payments](#payments). The EU entity (Ireland) is the contracting party; the US parent may process transactional metadata under Standard Contractual Clauses. Feature parity, particularly Stripe Connect, has no realistic EEA-sovereign equivalent for many marketplaces.
- **Discipline:** Contract through the EU entity, expose only transactional metadata, and record the exception where buyers can see it.

### The test for any exception

Accept a US-hosted or region-agnostic vendor only where **all** of the following hold:

1. No EEA/UK alternative exists at the required feature parity, **and**
2. the data exposed is operational metadata (delivery logs, pseudonymous analytics, PII-scrubbed error traces), not identifying data at scale, **and**
3. the vendor has a published EU representative, an appropriate transfer mechanism (UK IDTA and/or EU SCCs), and a recognised attestation (SOC 2 Type II or equivalent).

If an exception cannot meet all three, it is not an exception, it is a gap to close.

---

## Region-pinning cheat sheet

| Category | Sovereign pick | Region | Pin it with |
|---|---|---|---|
| Analytics | Plausible | EU (Germany) | Hosted EU default, or self-host in-region |
| Analytics (full) | Matomo | EU (Germany) / self-host | Select EU data centre, or self-host |
| Newsletter | MailerLite | EU (Lithuania) | EU domicile by default |
| Transactional email | Resend | EU | Select EU region in dashboard |
| Database | Supabase | UK (`eu-west-2`, London) | Choose region at project creation |
| Database | Neon | EU/UK | Choose region at project creation |
| Auth | Supabase Auth | Same as project | Pin the Supabase project region |
| Auth | Ory / Zitadel | EU / self-host | EU region or self-host in-region |
| Error tracking | Sentry | EU (`de.sentry.io`) | Create org on EU data region |
| Error tracking | GlitchTip | Self-host / EU | Self-host in-region |
| Error tracking | Telemetry Tracker | Hosted EU West (Amsterdam) / self-host | Privacy policy (Railway EU West); or self-host in-region |
| Hosting | Vercel | UK (`lhr1`, London) | `regions: ["lhr1"]` in `vercel.json` |
| Hosting | Scaleway / Hetzner / OVHcloud | EU | Select EU location at provisioning |
| Object storage | Supabase Storage | Same as project | Pin the Supabase project region |
| Payments | Mollie | EU (Netherlands) | EU domicile by default |
| Edge (exception) | Cloudflare | Global | Region-agnostic; keep no personal data at edge |
| Payments (exception) | Stripe | EU entity (Ireland) | Contract via Stripe Payments Europe Ltd |

---

## A worked example: a fully pinned stack

A representative production stack, fully pinned, with every identifying-data sub-processor in the EEA or the UK:

- **Hosting:** Vercel, `regions: ["lhr1"]` (London), verified via `x-vercel-id`.
- **Database + auth + storage:** Supabase, London `eu-west-2`, one region to reason about.
- **Analytics:** Plausible, EU-hosted, cookie-free, no personal data collected.
- **Transactional email:** Resend, EU region pinned in the dashboard.
- **Newsletter:** MailerLite, Lithuanian entity, connected via API/webhook so it stays swappable.
- **Error tracking:** Sentry EU (`de.sentry.io`) with PII scrubbing on; CSP `connect-src` references the `ingest.de.sentry.io` host only.
- **Payments:** Stripe via Stripe Payments Europe Ltd (Ireland), documented exception for the US parent under SCCs.
- **Edge:** Cloudflare for DNS/WAF/TLS, documented exception, no personal data persisted at the edge.

Result: every sub-processor that touches identifying personal data sits in the EEA or the UK. The two exceptions (Cloudflare edge, Stripe US parent) are region-agnostic or metadata-only, and both are written down where buyers can see them. A live example of a public sub-processor disclosure built on this pattern is published at [ticketwavehq.com/data-processors](https://ticketwavehq.com/data-processors).

---

## Verify it yourself

Pinning that is not verified is just a hope. A few checks you can automate:

- **Hosting region:** `curl -sI https://your-domain.example | grep -i x-vercel-id` and confirm it resolves to your pinned region.
- **Error-tracker region:** grep your codebase for the Sentry DSN and confirm the host is a subdomain of `de.sentry.io`; grep your CSP for `ingest.de.sentry.io` and confirm no US ingest host is present.
- **Database region:** confirm in the vendor dashboard (the project URL does not encode the region).
- **Config-as-truth:** keep `vercel.json` `regions`, your Sentry init, and your CSP under version control so the pin is reviewable in a pull request.

A minimal, provider-agnostic checklist you can copy into your own repository lives at [github.com/TicketWaveHQ/eu-sovereignty-checklist](https://github.com/TicketWaveHQ/eu-sovereignty-checklist). It walks through onboarding a new sub-processor, verifying its region, and disclosing the change. This list (the *what*) and that checklist (the *how*) are meant to be used together.

An example continuous-integration workflow and a Lighthouse budget file are included in this repository under [`.github/workflows/`](.github/workflows/) and [`lighthouserc.json`](lighthouserc.json), plus a copy-ready sub-processor disclosure template under [`templates/`](templates/).

---

## Related resources

- **[github.com/TicketWaveHQ/eu-sovereignty-checklist](https://github.com/TicketWaveHQ/eu-sovereignty-checklist)** - the operational checklist companion to this list: how to onboard, verify, and disclose a sub-processor.
- **[ticketwavehq.com/data-processors](https://ticketwavehq.com/data-processors)** - a live, public sub-processor register built on the pinning discipline described here, exceptions included. A working reference for what a good disclosure looks like.
- **[ticketwavehq.com](https://ticketwavehq.com)** - TicketWave HQ, who maintain this list.
- Your own regulator's guidance (the UK Information Commissioner's Office for the UK; your supervisory authority in the EEA) is always the authoritative source on transfers.

---

## Contributing

Additions and corrections are welcome. To keep the list trustworthy:

1. **Only pinnable, verifiable entries.** Every entry must name a concrete way to pin the region **and** a way to verify it from outside the vendor's marketing.
2. **State the domicile honestly.** If the operating company is outside the EEA but the data centre is inside it, say so. If a US parent may see metadata, say so.
3. **No invented facts.** Do not add prices, uptime figures, certifications, or scores you cannot cite. If a region or ownership detail is uncertain, mark it uncertain.
4. **Exceptions are documented, not hidden.** A vendor with limited, metadata-only US exposure can be listed as ⚠️ with the reason written out. A vendor that fails the three-part exception test does not belong on the list.
5. **British English, no em-dashes.** Use commas or spaced hyphens.

Open a pull request with the entry in the shape shown in [How to read an entry](#how-to-read-an-entry). See [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`templates/entry-template.md`](templates/entry-template.md).

---

## Licence

This list is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). See [`LICENSE`](LICENSE). You are free to share and adapt it, including commercially, with attribution.

Attribution: *EU / UK Sovereign Stack*, maintained by [Sansware](https://ticketwavehq.com).
