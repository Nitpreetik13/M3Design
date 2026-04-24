# Production Notes (SheetDB Setup)

We reverted API-layer changes and kept the working SheetDB flow for speed and stability.

## Included Changes

1. Product data now loads directly from SheetDB in `src/hooks/useProducts.ts`
- Safe typed parsing for response rows
- Fixed stock field mapping to `inStock` for UI compatibility

2. Contact form now submits directly to SheetDB in `src/pages/Contact.tsx`
- Clean async/await handling
- Shows success/error toasts properly

3. Production image-path fixes in `src/pages/Products.tsx`
- Replaced string paths like `"src/assets/...jpg"` with proper asset imports

4. Canada-focused text and consistency updates
- `src/pages/Index.tsx`: changed delivery text to Canada + brand heading
- `src/pages/Contact.tsx`: fixed phone placeholder and `Crescent` spelling
- `src/components/Footer.tsx`: fixed phone/address formatting + dynamic copyright year
- `src/pages/ProductCategory.tsx`: switched category hero images to local assets (including signage/poster/wallpapers)

## SheetDB Endpoints In Use

- Contact: `https://sheetdb.io/api/v1/gj3kq5u7gf1ck`
- Products: `https://sheetdb.io/api/v1/nls9a6jqmvg5j`

## Photo Update Plan (Canada Restaurant Focus)

Replace these files with your real photos:
- `src/assets/category-signage.jpg`
- `src/assets/category-poster.jpg`
- `src/assets/category-wallpapers.jpg`
- `src/assets/hero-eco-packaging.jpg`
- `src/assets/about-team.jpg`

## Admin Panel Setup (`/admin`)

This project now includes a basic admin route:
- `/admin` -> login with passcode
- add product form
- Cloudinary upload button for local image upload
- saves product rows directly to your products SheetDB

### Vercel env vars required

- `VITE_ADMIN_PASSCODE` = your admin login passcode (example: `m3-uncle-admin-2026`)
- `VITE_CLOUDINARY_CLOUD_NAME` = your Cloudinary cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET` = unsigned upload preset name

### Cloudinary quick setup

1. Create account at Cloudinary.
2. Go to Settings -> Upload -> Upload presets.
3. Create preset:
- Signing Mode: `Unsigned`
- Folder: `m3-products`
- Allowed formats: `jpg,png,webp,jpeg`
4. Copy:
- `Cloud name`
- `Upload preset name`
5. Add both in Vercel env vars and redeploy.

### Security note

Client-side admin passcode is simple and low-cost, but not highly secure.
For stronger security later:
- protect `/admin` behind real auth (Supabase/Auth0/Clerk), or
- move admin write APIs to server-side endpoints.
