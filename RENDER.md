# Deploy StatusSeller to Render

StatusSeller is packaged as a static Vite site, so the simplest Render setup is
a **Static Site** connected to this repository.

## Option 1: use the included `render.yaml`

1. Push this repository to GitHub or GitLab.
2. In Render, choose **New → Blueprint** and select the repository.
3. Render will read `render.yaml`, build the site, and publish the generated
   `artifacts/statusseller-site/dist/public` directory.

## Option 2: configure a Static Site manually

- **Build command**

  ```bash
  pnpm install --frozen-lockfile && BASE_PATH=/ PORT=10000 pnpm --filter @workspace/statusseller-site run build
  ```

- **Publish directory**

  ```text
  artifacts/statusseller-site/dist/public
  ```

No environment secrets are required for this landing page.

## Base URL

After the first deploy, Render gives the service a public URL such as:

```text
https://statusseller-site.onrender.com
```

Use that complete URL as your production **Base URL**. The exact hostname
depends on the Render service name and is only known after Render creates the
service. If you add a custom domain later, replace it with that domain,
including `https://` and excluding any trailing slash.

For this frontend-only landing page, do **not** use `/api` as the Base URL.
If a future backend is added, its API base URL would be a separate value.