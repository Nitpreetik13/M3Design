import { useState, useEffect } from "react";

export interface Product {
  name: string;
  price?: string;
  image: string;
  description: string;
  category?: string;
  in_stock?: boolean;
}

// IMPORTANT: Replace the API URL below with your actual SheetDB API URL
// Your SheetDB URL should look like: https://sheetdb.io/api/v1/YOUR_API_ID
const SHEET_API_URL = "https://sheetdb.io/api/v1/nls9a6jqmvg5j";

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
        
        // Map the sheet data to our Product interface
        const allProducts: Product[] = data.map((item: any) => ({
          name: item.name || "",
          price: item.price || "",
          image: item.image || "",
          description: item.description || "",
          category: item.category || "",
          in_stock: item.in_stock === "true" || item.in_stock === true,
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
