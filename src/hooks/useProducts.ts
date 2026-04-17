import { useState, useEffect } from "react";

export interface Product {
  name: string;
  price?: string;
  image: string;
  description: string;
  category?: string;
  inStock?: boolean;
}

// IMPORTANT: Replace the API URL below with your actual SheetDB API URL
// Your SheetDB URL should look like: https://sheetdb.io/api/v1/YOUR_API_ID
const SHEET_API_URL = "https://sheetdb.io/api/v1/nls9a6jqmvg5j";

const parseInStock = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "1" || normalized === "yes";
  }
  return false;
};

const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch products from Google Sheet via SheetDB
        const response = await fetch(SHEET_API_URL);
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await response.json();
        const rows = Array.isArray(data) ? data : [];
        
        // Map the sheet data to our Product interface
        const allProducts: Product[] = rows.map((item: Record<string, unknown>) => ({
          name: typeof item.name === "string" ? item.name : "",
          price: typeof item.price === "string" ? item.price : "",
          image: typeof item.image === "string" ? item.image : "",
          description: typeof item.description === "string" ? item.description : "",
          category: typeof item.category === "string" ? item.category : "",
          inStock: parseInStock(item.in_stock),
        }));
        
        // Filter by category if provided
        const filteredProducts = category
          ? allProducts.filter(p => p.category === category)
          : allProducts;
        
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please check your internet connection.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

export default useProducts;
