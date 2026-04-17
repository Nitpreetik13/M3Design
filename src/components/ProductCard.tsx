import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  price?: string;
  inStock?: boolean;
  category?: string;
}

const SHEETDB_CONTACT_API = "https://sheetdb.io/api/v1/gj3kq5u7gf1ck";

const ProductCard = ({ name, image, description, price, inStock = true, category }: ProductCardProps) => {
  const [sendingQuote, setSendingQuote] = useState(false);

  const handleRequestQuote = async () => {
    setSendingQuote(true);

    const payload = {
      data: [
        {
          name: "Website Product Inquiry",
          email: "quote-request@website.local",
          phone: "N/A",
          message: `Quote requested for product: ${name} | Category: ${category || "N/A"} | In stock: ${inStock ? "Yes" : "No"}`,
        },
      ],
    };

    try {
      const response = await fetch(SHEETDB_CONTACT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send quote request");
      }

      toast.success(`Quote request sent for ${name}!`, {
        description: "Your team can now track this product inquiry in the contact sheet.",
      });
    } catch {
      toast.error("Failed to send quote request. Try again.");
    } finally {
      setSendingQuote(false);
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift group">
      <div className="relative h-56 overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600";
          }}
        />
        {!inStock && (
          <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-foreground">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        {price && (
          <p className="text-primary font-semibold mb-4">{price}</p>
        )}
        <Button
          onClick={handleRequestQuote}
          disabled={sendingQuote}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
        >
          {sendingQuote ? "Sending..." : "Request Quote"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
