// Example: a cheap belt-and-braces guard that warns at runtime if your Sentry
// DSN is not on the EU data region (de.sentry.io). Region pinning happens at
// Sentry organisation creation (the data region is fixed and cannot be changed
// later), so this is a tripwire, not the pin itself.
//
// Pair it with PII scrubbing (sendDefaultPii: false + server-side scrubbing) so
// identifying data is stripped before an event leaves the browser.

import * as Sentry from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN ?? ''

// The EU data region serves DSNs on subdomains of de.sentry.io and ingests on
// *.ingest.de.sentry.io. Anything else means the org was created on the US
// region and personal data in traces would leave the EEA.
if (dsn && !dsn.includes('.de.sentry.io')) {
  // eslint-disable-next-line no-console
  console.warn(
    '[sovereignty] Sentry DSN does not target the EU data region (de.sentry.io). ' +
      'Create the Sentry organisation on the EU region and switch the DSN. ' +
      'The data region cannot be changed after org creation.',
  )
}

Sentry.init({
  dsn,
  sendDefaultPii: false,
  // Scrub before send as a second line of defence.
  beforeSend(event) {
    if (event.request?.cookies) delete event.request.cookies
    if (event.user) {
      // Keep an opaque id at most; drop direct identifiers.
      event.user = event.user.id ? { id: event.user.id } : undefined
    }
    return event
  },
})
