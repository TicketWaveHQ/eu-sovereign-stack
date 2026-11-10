# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Nothing yet.

## [1.0.0] - 2026-11-10

First tagged release. The list has been public since 2026-07-02; this
release records what it contains and the fixes made on the way.

### Contents

- Region-pinned entries for analytics (Plausible, Matomo, Pirsch),
  transactional and marketing email (MailerLite, Resend, Scaleway TEM,
  Proton), database and backend (Supabase, Neon, Exoscale and Scaleway
  managed Postgres, Directus), authentication (Supabase Auth, Ory, Zitadel),
  error monitoring (Sentry EU, GlitchTip, Highlight.io), hosting and edge
  (Vercel `lhr1`, Scaleway, Hetzner, OVHcloud, Bunny.net), object storage
  (Supabase Storage, Scaleway Object Storage, Cloudflare R2 as an
  exception) and payments (Stripe as an exception, Mollie, GoCardless).
- Documented exceptions and the three-part test for accepting one.
- Region-pinning cheat sheet, a worked example of a fully pinned stack, and
  verification commands.
- `examples/vercel.json`, `examples/sentry-eu-guard.js`,
  `templates/entry-template.md` and `templates/sub-processor-disclosure.md`.

### Added in this release

- README opens with what the list is, who it is for, and a 60-second start.
- `SECURITY.md`, pointing to TicketWave HQ's disclosure policy.
- This changelog.
- The legend explains the ⚪ marker used for self-hosted software.
- CI can be run by hand (`workflow_dispatch`).

### Changed

- Proton moved to the email section and Directus to database and backend;
  both had been filed under object storage.
- CI uses `actions/checkout@v7`, and the link check moved from
  `gaurav-nelson/github-action-markdown-link-check` (archived) to
  `tcort/github-action-markdown-link-check@v1`. The house-style check also
  covers `.js`, `.json`, `.yml` and `.cff` files.
- Credit and attribution name Jordan Gilbert and TicketWave HQ, matching
  `NOTICE`; the README had credited "Sansware". The author's GitHub handle
  is `@eu-jordangilbert` (`@sansware` is an organisation account).

### Removed

- `lighthouserc.json`: a Lighthouse budget for TicketWave HQ's own
  data-processors page. No workflow ran it and it had nothing to do with
  the list. Lighthouse budgets for Astro sites live in
  [TicketWaveHQ/astro-performance-budget](https://github.com/TicketWaveHQ/astro-performance-budget).

### Fixed

- The in-page link from Supabase Auth to the Supabase entry used the anchor
  `#supabase-london-eu-west-2-`; the heading's anchor is
  `#supabase-london--eu-west-2-`. The link check reported it as dead.
- The Proton entry's `dig` example used a real-looking domain; it now uses
  `your-domain.example`.

[Unreleased]: https://github.com/TicketWaveHQ/eu-sovereign-stack/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/TicketWaveHQ/eu-sovereign-stack/releases/tag/v1.0.0
