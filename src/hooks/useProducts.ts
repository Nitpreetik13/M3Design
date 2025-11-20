import { useState, useEffect } from "react";

export interface Product {
  name: string;
  price?: string;
  image: string;
  description: string;
  category?: string;
  in_stock?: boolean;
}

// This hook fetches products from a Google Sheet published as JSON
// To set up:
// 1. Create a Google Sheet with columns: name, price, image, description, category, in_stock
// 2. Use SheetDB (https://sheetdb.io/), SheetBest (https://sheet.best/), or Sheet2API (https://sheet2api.com/)
// 3. Replace the URL below with your published sheet URL

const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace this URL with your Google Sheet JSON endpoint
        // For now, using mock data as placeholder
        const mockProducts: Product[] = [
          {
            name: "Bagasse Round Plate 9 inch",
            price: "₹45/piece",
            image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=600",
            description: "Eco-friendly round plate made from sugarcane bagasse, microwave safe",
            category: "bagasse",
            in_stock: true,
          },
          {
            name: "Bagasse Square Container",
            price: "₹55/piece",
            image: "https://images.unsplash.com/photo-1610701596061-2ecf2f0e6b4c?w=800&h=600",
            description: "Leak-proof container perfect for takeaway meals",
            category: "bagasse",
            in_stock: true,
          },
          {
            name: "Wooden Spoon Set",
            price: "₹120/pack",
            image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600",
            description: "Pack of 25 biodegradable wooden spoons",
            category: "wooden",
            in_stock: true,
          },
          {
            name: "Wooden Fork",
            price: "₹130/pack",
            image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=600",
            description: "Sturdy wooden forks, pack of 25",
            category: "wooden",
            in_stock: true,
          },
          {
            name: "Paper Bag Small",
            price: "₹5/piece",
            image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=600",
            description: "Brown kraft paper bag with handles",
            category: "paper",
            in_stock: true,
          },
          {
            name: "Paper Box Large",
            price: "₹15/piece",
            image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde7?w=800&h=600",
            description: "Recyclable paper box for food packaging",
            category: "paper",
            in_stock: true,
          },
          {
            name: "Plastic Container 500ml",
            price: "₹8/piece",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600",
            description: "Recyclable plastic container with lid",
            category: "plastic",
            in_stock: true,
          },
          {
            name: "Plastic Cup 200ml",
            price: "₹3/piece",
            image: "https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=800&h=600",
            description: "Transparent disposable plastic cups",
            category: "plastic",
            in_stock: true,
          },
          {
            name: "Custom Signage A3",
            price: "₹250/piece",
            image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&h=600",
            description: "Eco-friendly printed signage on recyclable material",
            category: "signage",
            in_stock: true,
          },
          {
            name: "Poster A2 Glossy",
            price: "₹150/piece",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600",
            description: "High-quality glossy poster printing",
            category: "poster",
            in_stock: true,
          },
          {
            name: "Eco Wallpaper Roll",
            price: "₹1200/roll",
            image: "https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?w=800&h=600",
            description: "Sustainable wallpaper, 10m x 0.5m",
            category: "wallpapers",
            in_stock: true,
          },
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Filter by category if provided
        const filteredProducts = category
          ? mockProducts.filter(p => p.category === category)
          : mockProducts;

        setProducts(filteredProducts);
        setLoading(false);

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
      } catch (err) {
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

export default useProducts;
