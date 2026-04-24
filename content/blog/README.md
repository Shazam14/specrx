# Blog content

Each post is a single `.mdx` file in this directory. The filename (without `.mdx`) becomes the
URL slug — e.g. `how-to-get-more-dental-patients-bendigo.mdx` → `/blog/how-to-get-more-dental-patients-bendigo`.

Follow the Blog Post Formula in `../../SKILL.MD` for voice, structure, and AHPRA rules.

## Frontmatter schema

```yaml
---
title: "H1 + default meta title (≤60 chars is ideal)"
metaTitle: "Optional override for <title> (≤60 chars)"
description: "Meta description (≤160 chars)"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"          # optional
author: "QuadGrowth"             # optional, defaults to QuadGrowth
primaryKeyword: "..."
keywords:
  - "secondary keyword 1"
  - "secondary keyword 2"
suburb: "Bendigo"                # Bendigo | Ballarat | Shepparton | Geelong | ...
postType: "standard"             # standard | pillar | update
ahpraRisk: "Low"                 # Low | Medium | High
ahpraReviewed: true
heroImage: "/blog/images/slug.jpg"  # optional
sources:                         # Tier 1/2 AU sources, per SKILL.MD
  - name: "AHPRA"
    url: "https://ahpra.gov.au/..."
  - name: "ADA"
    url: "https://ada.org.au/..."
draft: false                     # true hides from prod + index + sitemap
---
```

## MDX components available

- Standard markdown (headings, lists, tables, blockquotes, links) via `remark-gfm`.
- `<CTA href="...">Label</CTA>` — themed primary CTA button.
- `<Callout tone="info|warn">…</Callout>` — highlighted block.

Internal links use relative paths (`/blog/...`, `/dental-marketing-bendigo`).
External links open in a new tab automatically.

## Required sections per post (per SKILL.MD)

1. Hook intro (2–3 paragraphs; news angle; Bendigo/regional framing)
2. Three H2s with body + inline sources
3. `## What [Suburb] Clinic Owners Should Do This Week` — 3–5 numbered steps
4. Outro + `<CTA>` to Calendly
5. Byline (rendered automatically by the post template)
