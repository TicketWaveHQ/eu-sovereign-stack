# Security Policy

This repository is a curated list plus a few copy-ready examples. It ships
no runtime code of its own, but its guidance can still be wrong in ways
that matter.

## Reporting an issue

Please report privately rather than opening a public issue if you find:

- an entry whose **How to pin** or **How to verify** step would leave
  personal data outside the EEA/UK while appearing to keep it in;
- an example in [`examples/`](examples/) that weakens security when copied
  (for example the Sentry guard sending personal data it claims to strip);
- anything else here that could lead an operator to a materially less
  secure or less compliant posture.

**Contact:** email [hello@ticketwavehq.com](mailto:hello@ticketwavehq.com)
and say in the subject that it is a security report. TicketWave HQ's
disclosure policy, which covers this repository, is at
<https://ticketwavehq.com/security>.

We will acknowledge your report and say what we intend to do. We do not
publish a response time. Please give us a reasonable window to fix the
issue before you publish it.

## Out of scope

- Vulnerabilities in the vendors listed here. Report those to the vendor.
- An entry that is simply out of date (a region added or withdrawn, a
  change of ownership). Open a normal issue or pull request for those.
