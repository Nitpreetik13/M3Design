# Vercel + Canada Website Production Guide

This project now uses Vercel serverless APIs for both contact submissions and product fetching to avoid browser CORS issues with Google Apps Script.

## What Was Implemented

1. Added `api/contact.ts`
- `POST` only (returns `405` for other methods)
- Validates request payload
- Forwards data to your existing Google Apps Script URL
- Returns JSON success/error responses
- Uses env var first: `GOOGLE_APPS_SCRIPT_CONTACT_URL`

2. Added `api/products.ts`
- `GET` only (returns `405` for other methods)
- Fetches product rows from your existing Google Apps Script URL
- Returns typed JSON `{ success, data }`
- Uses env var first: `GOOGLE_APPS_SCRIPT_PRODUCTS_URL` (falls back to contact URL)

3. Updated `src/pages/Contact.tsx`
- Frontend now submits to `/api/contact`
- Removed `mode: "no-cors"`
- Uses async/await with proper response/error handling

4. Updated `src/hooks/useProducts.ts`
- Frontend now loads products from `/api/products`
- Safe typed parsing for server response
- Fixed stock field mapping to `inStock` for UI compatibility

5. Production image-path fixes in `src/pages/Products.tsx`
- Replaced string paths like `"src/assets/...jpg"` with proper asset imports

6. Canada-focused text and consistency updates
- `src/pages/Index.tsx`: changed delivery text to Canada + brand heading
- `src/pages/Contact.tsx`: fixed phone placeholder and `Crescent` spelling
- `src/components/Footer.tsx`: fixed phone/address formatting + dynamic copyright year
- `src/pages/ProductCategory.tsx`: switched category hero images to local assets (including signage/poster/wallpapers)

## Vercel Environment Variable

Add this in Vercel Project Settings -> Environment Variables:

- `GOOGLE_APPS_SCRIPT_CONTACT_URL` = your Apps Script endpoint URL
- `GOOGLE_APPS_SCRIPT_PRODUCTS_URL` = your product Apps Script endpoint URL (optional if same as contact)

Then redeploy.

## Local Development Note

`/api/contact` and `/api/products` are Vercel function routes.  
For local API testing, run with `vercel dev` (instead of only `vite`), or deploy and test on preview URL.

If you run only `vite` and saw `/api/* 404`, this project now includes Vite dev proxies in `vite.config.ts` so `/api/contact` and `/api/products` still work locally.

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

1. Add stronger server-side validation rules (email format + message length + sanitization).
2. Add spam protection (`hCaptcha`/`Turnstile`) before production marketing campaigns.
3. Optionally split contact/products into separate Apps Script URLs if you want independent scaling.
