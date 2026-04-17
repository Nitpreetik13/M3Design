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
