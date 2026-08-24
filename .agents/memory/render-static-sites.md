---
name: Render static site deployment
description: Deployment convention for this frontend-only product landing page.
---

Render should host this site as a Static Site rather than a long-running Node service.

**Why:** The landing page is a Vite frontend with no runtime API dependency, so static hosting removes unnecessary process and port configuration.

**How to apply:** Build with `BASE_PATH=/` and a valid `PORT`, then publish `artifacts/statusseller-site/dist/public`. Use the deployed `https://...onrender.com` hostname as the public Base URL.