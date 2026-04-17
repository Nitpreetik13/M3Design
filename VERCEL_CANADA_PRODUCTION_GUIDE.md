# Vercel + Canada Website Production Guide

This project now uses a Vercel serverless API for contact submissions to avoid browser CORS issues with Google Apps Script.

## What Was Implemented

1. Added `api/contact.ts`
- `POST` only (returns `405` for other methods)
- Validates request payload
- Forwards data to your existing Google Apps Script URL
- Returns JSON success/error responses
- Uses env var first: `GOOGLE_APPS_SCRIPT_CONTACT_URL`

2. Updated `src/pages/Contact.tsx`
- Frontend now submits to `/api/contact`
- Removed `mode: "no-cors"`
- Uses async/await with proper response/error handling

3. Strengthened TypeScript mapping in `src/hooks/useProducts.ts`
- Safe parsing from sheet response
- Fixed stock field mapping to `inStock` for UI compatibility

4. Production image-path fixes in `src/pages/Products.tsx`
- Replaced string paths like `"src/assets/...jpg"` with proper asset imports

5. Canada-focused text and consistency updates
- `src/pages/Index.tsx`: changed delivery text to Canada + brand heading
- `src/pages/Contact.tsx`: fixed phone placeholder and `Crescent` spelling
- `src/components/Footer.tsx`: fixed phone/address formatting + dynamic copyright year
- `src/pages/ProductCategory.tsx`: switched category hero images to local assets (including signage/poster/wallpapers)

## Vercel Environment Variable

Add this in Vercel Project Settings -> Environment Variables:

- `GOOGLE_APPS_SCRIPT_CONTACT_URL` = your Apps Script endpoint URL

Then redeploy.

## Local Development Note

`/api/contact` is a Vercel function route.  
For local API testing, run with `vercel dev` (instead of only `vite`), or deploy and test on preview URL.

If you run only `vite` and saw `POST /api/contact 404`, this project now includes a Vite dev proxy in `vite.config.ts` so `/api/contact` still works locally.

## Photo Update Plan (Wallpapers / Signage / Poster)

For your Canada restaurant-focused branding, replace these files with real service photos:

- `src/assets/category-signage.jpg`
- `src/assets/category-poster.jpg`
- `src/assets/category-wallpapers.jpg`
- `src/assets/hero-eco-packaging.jpg` (homepage hero)
- `src/assets/about-team.jpg` (about hero/team section)

Recommended photo direction:
- Restaurant storefront signage in Canadian cities
- In-restaurant promotional posters/menu boards
- Branded wall graphics/wallpaper installations
- Real team/installations in Canada (authentic trust signal)

## Remaining Recommended Changes (Next Step)

1. Add a serverless `GET` endpoint for products (e.g. `api/products.ts`) and update `useProducts` to call `/api/products` for full CORS-proof architecture.
2. Add lightweight form validation (email + message length) server-side in `api/contact.ts`.
3. Add spam protection (`hCaptcha`/`Turnstile`) before production marketing campaigns.
