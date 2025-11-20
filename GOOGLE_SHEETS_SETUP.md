# Google Sheets Dynamic Product Integration

This website is designed to dynamically load products from a Google Sheet, making it easy to manage your product catalog without touching any code.

## Quick Setup Guide

### Step 1: Create Your Google Sheet

Create a new Google Sheet with the following columns:

| name | price | image | description | category | in_stock |
|------|-------|-------|-------------|----------|----------|
| Bagasse Round Plate 9 inch | ₹45/piece | https://example.com/image.jpg | Eco-friendly round plate... | bagasse | TRUE |
| Wooden Spoon Set | ₹120/pack | https://example.com/image2.jpg | Pack of 25 biodegradable... | wooden | TRUE |

**Column Details:**
- `name` - Product name (required)
- `price` - Price with currency symbol (optional)
- `image` - Full URL to product image (required)
- `description` - Brief product description (required)
- `category` - One of: bagasse, plastic, wooden, paper, signage, poster, wallpapers (required)
- `in_stock` - TRUE or FALSE (optional, defaults to TRUE)

### Step 2: Publish Your Sheet as JSON

You have three free options to convert your Google Sheet to a JSON API:

#### Option A: SheetDB (Recommended)
1. Go to [https://sheetdb.io/](https://sheetdb.io/)
2. Sign up for free account
3. Click "Create API" and paste your Google Sheet URL
4. Copy the API URL provided (looks like: `https://sheetdb.io/api/v1/xxxxxxx`)

#### Option B: SheetBest
1. Go to [https://sheet.best/](https://sheet.best/)
2. Sign up and connect your Google Sheet
3. Copy the generated API URL

#### Option C: Sheet2API
1. Go to [https://sheet2api.com/](https://sheet2api.com/)
2. Create account and add your sheet
3. Copy the API endpoint

### Step 3: Update the Code

Open the file: `src/hooks/useProducts.ts`

Find this section around line 48:

```typescript
// Uncomment below when you have a real Google Sheets API endpoint
/*
const response = await fetch("YOUR_GOOGLE_SHEET_JSON_URL_HERE");
const data = await response.json();

const filteredProducts = category
  ? data.filter((p: Product) => p.category === category)
  : data;

setProducts(filteredProducts);
setLoading(false);
*/
```

Uncomment the code and replace `YOUR_GOOGLE_SHEET_JSON_URL_HERE` with your API URL:

```typescript
const response = await fetch("https://sheetdb.io/api/v1/xxxxxxx");
const data = await response.json();

const filteredProducts = category
  ? data.filter((p: Product) => p.category === category)
  : data;

setProducts(filteredProducts);
setLoading(false);
```

Then comment out or delete the mock data section above it (lines 21-47).

### Step 4: Test Your Setup

1. Add some products to your Google Sheet
2. Save the sheet
3. Refresh your website
4. Your products should now appear automatically!

## Managing Products

### Adding New Products
Simply add a new row to your Google Sheet with all the required columns filled.

### Updating Products
Edit any cell in your sheet - changes will reflect on your website immediately.

### Removing Products
Delete the row from your sheet.

### Product Images
- Use high-quality images (at least 800x600px)
- Host images on reliable services like:
  - Google Drive (make sure to set sharing to "Anyone with the link")
  - Imgur
  - Cloudinary
  - Your own hosting

## Categories

Make sure to use exact category names:
- `bagasse` - Sugarcane products
- `plastic` - Plastic containers
- `wooden` - Wooden cutlery
- `paper` - Paper packaging
- `signage` - Custom signage
- `poster` - Posters
- `wallpapers` - Wallpaper products

## Troubleshooting

**Products not showing:**
- Check that your Google Sheet is published and accessible
- Verify the API URL is correct
- Check browser console for any errors

**Images not loading:**
- Ensure image URLs are publicly accessible
- Use direct image links (ending in .jpg, .png, etc.)

**Category pages empty:**
- Verify the category name in your sheet matches exactly (lowercase)
- Check for typos in the category column

## Support

For technical issues with the Google Sheets integration, contact your developer or refer to the documentation of your chosen service:
- [SheetDB Docs](https://docs.sheetdb.io/)
- [SheetBest Docs](https://sheet.best/docs)
- [Sheet2API Docs](https://sheet2api.com/documentation)
