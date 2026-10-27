---
kind: external_dependency
name: GitHub Pages — free static site host used instead of Vercel
slug: github-pages
category: external_dependency
category_hints:
    - vendor_identity
scope:
    - '**'
---

### GitHub Pages
- Role in this repo: the only deployment target for the single-page personal site. The user lost their Vercel account, so the project was built as a plain `index.html` and published through GitHub Pages under the `heddleka/umidjon_nuraliyev` repository.
- Integration point: the repo root contains only `index.html`; no build step or framework is involved. Pushing to the default branch triggers Pages.
- Durable usage model: static HTML served directly from the `heddleka.github.io/umidjon_nuraliyev/` path; future pushes may trigger a re-auth prompt from GitHub.
- Verify exact Pages settings (branch / folder) against the current repository Pages configuration.