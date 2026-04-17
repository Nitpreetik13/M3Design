import { useState, useEffect } from "react";

export interface Product {
  name: string;
  price?: string;
  image: string;
  description: string;
  category?: string;
  inStock?: boolean;
}

type ProductsApiResponse =
  | {
      success: true;
      data: Record<string, unknown>[];
    }
  | {
      success: false;
      error: string;
    };

const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("/api/products");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const result = (await response.json()) as ProductsApiResponse;
        if (!result.success) {
          throw new Error(result.error || "Failed to fetch products");
        }
        const rows = Array.isArray(result.data) ? result.data : [];
        
        // Map the sheet data to our Product interface
        const allProducts: Product[] = rows.map((item: Record<string, unknown>) => ({
          name: typeof item.name === "string" ? item.name : "",
          price: typeof item.price === "string" ? item.price : "",
          image: typeof item.image === "string" ? item.image : "",
          description: typeof item.description === "string" ? item.description : "",
          category: typeof item.category === "string" ? item.category : "",
          inStock: item.in_stock === "true" || item.in_stock === true,
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
