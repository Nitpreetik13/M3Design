import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sendingQuote, setSendingQuote] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuoteForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRequestQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingQuote(true);

    const payload = {
      data: [
        {
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone || "N/A",
          message: `Product Inquiry
Client Name: ${quoteForm.name}
Client Email: ${quoteForm.email}
Client Phone: ${quoteForm.phone || "N/A"}
Product: ${name}
Category: ${category || "N/A"}
In Stock: ${inStock ? "Yes" : "No"}
Client Message: ${quoteForm.message || "N/A"}`,
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
      setQuoteForm({ name: "", email: "", phone: "", message: "" });
      setIsDialogOpen(false);
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Request Quote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Quote</DialogTitle>
              <DialogDescription>
                Share your details and we will contact you for {name}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRequestQuote} className="space-y-4">
              <Input
                name="name"
                type="text"
                placeholder="Your name"
                required
                value={quoteForm.name}
                onChange={handleChange}
              />
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={quoteForm.email}
                onChange={handleChange}
              />
              <Input
                name="phone"
                type="tel"
                placeholder="+1 613 555 0123"
                value={quoteForm.phone}
                onChange={handleChange}
              />
              <Textarea
                name="message"
                placeholder={`Tell us your quantity/specs for ${name}`}
                rows={4}
                required
                value={quoteForm.message}
                onChange={handleChange}
              />
              <DialogFooter>
                <Button type="submit" disabled={sendingQuote} className="w-full sm:w-auto">
                  {sendingQuote ? "Sending..." : "Send Request"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductCard;
