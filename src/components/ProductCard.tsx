import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  price?: string;
  inStock?: boolean;
}

const ProductCard = ({ name, image, description, price, inStock = true }: ProductCardProps) => {
  const handleRequestQuote = () => {
    toast.success(`Quote request sent for ${name}!`, {
      description: "We'll get back to you shortly with pricing details.",
    });
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
          disabled={!inStock}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
        >
          Request Quote
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
