# Dekoraj Group — cinematic Next.js website

A complete, standalone Next.js App Router source project for the Dekoraj brief. The visual direction combines forest-black backgrounds, oversized architectural typography, reference photography and a desktop scroll-controlled exterior-to-interior farm journey.

This archive contains the **Next.js edition** prepared for your own deployment. The separately deployed Higgsfield edition uses TanStack Start and a Higgsfield-managed database. This Next.js project uses its own photographic scroll sequence and portable HTTPS enquiry/availability adapters; it does not connect to or export the hosted site's database. All source code and page images needed for this edition are included.

## Run locally

Install Node.js 22 LTS or newer, extract this ZIP and open the `dekoraj-nextjs` folder in VS Code. From PowerShell or your terminal:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

On macOS/Linux, use `cp .env.example .env.local` instead of `Copy-Item`.

Open **http://localhost:3000**. No API keys or paid services are needed to run the preview. Fonts and all page images are included locally; the site does not need an external image CDN.

For a production build:

```sh
npm run build
npm start
```

## What is included

- Next.js 16.3.5, TypeScript, React, Tailwind CSS, GSAP + ScrollTrigger, Lenis and Motion.
- Responsive editorial homepage with full-bleed imagery, a scroll-controlled photographic camera push and exterior/interior reveal.
- Optional skippable introduction; mobile and reduced-motion layouts that expose both scenes without scroll pinning.
- Solutions mega menu, mobile navigation, keyboard focus states and a skip link.
- Six solution detail pages; illustrated project scopes; about and contact pages.
- Interactive system explorer, connected ecosystem navigation, image-changing intent router and expandable project process.
- DekorajMart with category filtering, text search, product details and quotation enquiries.
- Consultation type selection, calendar, available/unavailable dates, time selection and a request form. Times use Africa/Lagos (WAT).
- Project, equipment, financing, partnership and investment enquiry flows.
- Preview enquiry download, validated server API routes and optional server-side HTTPS integrations.
- Local font packages, optimized WebP images, Open Graph image, favicon, metadata, robots and sitemap.
- Validation tests, Playwright browser tests and deployment/integration documentation.

## What needs business setup before launch

This is the complete source for the website experience. It is **not a configured commerce, booking or admin backend**.

1. Replace sample consultation availability with the real availability integration.
2. Connect enquiry delivery to your backend using the server-only environment variables.
3. Implement real slot reservations, admin scheduling and payment checkout in that backend if paid bookings are required. This project deliberately does not accept payments or claim a booking is confirmed.
4. Supply verified prices, stock, consultation durations, contact information, company metrics and completed case studies.
5. Review the draft privacy/terms pages and the rights to supplied photography before publishing.
6. Set `NEXT_PUBLIC_SITE_URL` to the real deployment URL.

Until configured, the calendar is clearly labelled a preview and form completion produces a downloadable enquiry marked `not-sent`. Nothing is silently saved to a local file or represented as delivered.

## Visual assets and Higgsfield

Higgsfield was attempted for six requested visuals. Its connected account rejected every submission with **“Requires basic plan or higher.”** No Higgsfield generation jobs were created.

The included poultry, equipment and farmland photos are references supplied in the earlier Dekoraj conversation. One missing wide poultry-farm exterior was generated with the built-in image-generation tool as a fallback, and is explicitly labelled a concept visual on the site. It is not represented as a completed Dekoraj project.

See `docs/ASSETS.md` for provenance and `docs/HIGGSFIELD_PROMPTS.md` for the six prepared prompts. Replacing an image under `public/images/` updates every relevant section. No real video or WebGL scene is included: this version uses photographic transforms and a scroll-controlled scene reveal, with mobile and reduced-motion fallbacks.

## Main files

| File                                   | Purpose                                                    |
| -------------------------------------- | ---------------------------------------------------------- |
| `src/app/page.tsx`                     | Homepage chapters and content                              |
| `src/app/globals.css`                  | Palette, typography, responsive layouts and visual styling |
| `src/lib/content.ts`                   | Solutions, products, consultation types and process copy   |
| `src/components/hero-journey.tsx`      | Desktop photographic journey and optional intro            |
| `src/components/home-interactions.tsx` | System explorer, ecosystem, intent router and process      |
| `src/components/booking.tsx`           | Consultation calendar and request steps                    |
| `src/components/enquiry-form.tsx`      | Enquiry form, validation UI and preview download           |
| `src/app/api/enquiries/route.ts`       | Input validation and optional backend delivery             |
| `src/lib/availability.ts`              | Preview schedule and optional availability adapter         |
| `public/images/`                       | All locally bundled page imagery                           |

## Verification

This source archive was checked on 22 September 2026: the production build, TypeScript checks and all four validation tests passed. The included Playwright suite has not been verified in a browser for this archive.

```sh
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests run against the production build, exercise desktop/mobile layouts, category filtering, the preview consultation flow, downloads and invalid requests. Run them with delivery integrations unset so test details are never sent to a real business service. `npm run format` formats the editable source with Prettier.

## Deployment

The app requires a Next.js-capable Node host because it contains server routes. It is not a static HTML export. The ordinary Next.js deployment workflow is documented in `docs/DEPLOYMENT.md`.

Framework references consulted while preparing the project: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Next.js August 2026 security release](https://nextjs.org/blog/august-2026-security-release).
