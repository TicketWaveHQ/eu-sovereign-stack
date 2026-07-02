# Entry template

Copy this block into the correct category in `README.md`, fill it in, and delete
the guidance in brackets. Keep the field order.

---

### [Vendor and product name] [✅ or ⚠️]

- **Region:** [The specific EEA/UK region the data is hosted in. Name the country
  and, where the vendor uses one, the cloud region code, for example
  "United Kingdom (London, `eu-west-2`)".]
- **How to pin:** [The concrete configuration step that fixes the region. A flag,
  a dashboard setting, a region choice at project creation, a `regions` array in
  a config file. Include a short code block if the pin is code.]
- **How to verify:** [How a third party could confirm the region without trusting
  marketing. A response header, an admin console setting, a published data-centre
  list, a DPA clause. Include the command if there is one, for example
  `curl -sI https://your-domain.example | grep -i x-vercel-id`.]
- **Notes:** [Corporate domicile if it differs from the data-centre country. Any
  sub-processor caveat (US parent, metadata transfer under SCCs). Feature caveats
  a reader should weigh. Whether self-hosting is an option.]

---

## Worked example (delete before submitting)

### Supabase (London / `eu-west-2`) ✅

- **Region:** United Kingdom. Supabase runs on AWS; the London region is
  `eu-west-2`.
- **How to pin:** Choose London (`eu-west-2`) when you create the project. Region
  is fixed at creation.
- **How to verify:** Project region is shown in the Supabase dashboard under
  project settings. The project ref does not encode the region, so confirm in the
  dashboard.
- **Notes:** Postgres, row-level security, storage, and auth in one project.
  Co-locate with your application region to keep latency low.

## Checklist before you open the pull request

- [ ] The product is named specifically, not just the company.
- [ ] There is a concrete way to pin the region.
- [ ] There is a concrete way to verify the region from outside.
- [ ] The corporate domicile is stated honestly.
- [ ] No prices, uptime figures, certifications, or scores that cannot be cited.
- [ ] Marked ✅ Sovereign or ⚠️ Exception correctly (exceptions pass the
      three-part test).
- [ ] British English, no em-dashes.
- [ ] Cheat-sheet table updated if this is a new category or headline pick.
