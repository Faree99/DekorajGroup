# Deploying your source project

## Before deploying

1. Install dependencies with `npm ci`.
2. Run `npm test`, `npm run typecheck` and `npm run build`.
3. Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS URL. It controls metadata and the sitemap.
4. Decide whether this is a client-review preview or a launch. Preview mode requires no backend credentials and clearly identifies its sample booking data.
5. For launch, configure the business integrations described in `INTEGRATION.md` and replace the remaining company data and legal drafts.

## A Next.js hosting provider

Push the extracted project to your own repository, select it in a Next.js-compatible hosting provider and choose the `dekoraj-nextjs` folder as the root if your repository contains a wrapper folder. The build command is `npm run build`. Keep automatic framework detection enabled where offered.

Set the variables from `.env.example` in the provider’s environment settings. Do not commit `.env.local`, real webhook credentials or generated `.next` output.

## Your own Node server

Use a supported Node.js version, run `npm ci` and `npm run build`, then launch `npm start` behind your HTTPS reverse proxy/process supervisor. The default port is 3000; Next.js also accepts a `PORT` environment variable. Keep the `public`, `.next`, package files and production dependencies available.

## Firebase App Hosting

If you choose Firebase, initialize it inside the extracted Dekoraj folder and select the intended Firebase project/backend. Use a separate project configuration for this site and configure the server environment variables there.

## Review URL behaviour

The API routes mean this project cannot use `output: 'export'` without replacing the forms and availability endpoints. A static-file host alone is insufficient. This archive does not deploy itself or alter the separately hosted Higgsfield edition.

Official reference: [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying).
