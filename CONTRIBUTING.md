# Contributing to EU / UK Sovereign Stack

Thank you for helping keep this list accurate. The value of this list is that
every entry is **pinnable** and **verifiable**, not merely "EU-friendly". Please
hold new entries to that bar.

## The bar for an entry

An entry is accepted only if it meets all of the following:

1. **It is a real, named product.** Name the specific service, not just the
   company (for example "Supabase Storage", not "Supabase").
2. **The region is pinnable.** There must be a concrete configuration step that
   fixes the data-hosting region to the EEA or the UK. "Supports EU" is not
   enough; there must be a way to *select and lock* the region.
3. **The pin is verifiable from outside.** Name how a third party could confirm
   the region without trusting the vendor's marketing: a trace header, an admin
   console setting, a published data-centre list, a DPA clause.
4. **The domicile is stated honestly.** If the operating company sits outside
   the EEA while the data centre sits inside it, say so. If a US parent may see
   metadata under Standard Contractual Clauses, say so.
5. **No invented facts.** Do not add prices, uptime numbers, certifications, or
   scores you cannot cite. If a detail is uncertain, mark it uncertain rather
   than guessing.

## Sovereign vs exception

- Mark an entry ✅ **Sovereign** when identifying personal data is hosted in the
  EEA/UK, pinnable and verifiable.
- Mark an entry ⚠️ **Exception** when the vendor is region-agnostic or has US
  exposure, but the exposure is limited (metadata only) and documented. An
  exception must pass the three-part test in the README's
  "Documented exceptions" section. If it cannot, it is a gap, not an exception,
  and does not belong on the list.

## Style

- **British English.** "organise", "licence" (noun), "centre".
- **No em-dashes.** Use commas or spaced hyphens ( - ).
- **Full forms over contractions** in prose where it reads naturally.
- Keep the entry shape consistent: Region, How to pin, How to verify, Notes.

Use [`templates/entry-template.md`](templates/entry-template.md) as a starting
point.

## How to submit

1. Fork the repository and create a branch.
2. Add or edit the entry in the correct category, in the shape shown in the
   template.
3. Update the region-pinning cheat sheet table if you added a new category or a
   headline pick.
4. Open a pull request describing the source you used to confirm the region and
   domicile.

## What this list is not

- Not legal advice.
- Not a directory of every EU vendor. It is a curated shortlist of options that
  can be pinned and verified.
- Not a place for affiliate links or vendor marketing copy.

By contributing, you agree that your contribution is licensed under CC BY 4.0,
the same licence as the rest of the list.
