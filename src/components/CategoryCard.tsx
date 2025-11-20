import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
  description: string;
}

const CategoryCard = ({ name, image, slug, description }: CategoryCardProps) => {
  return (
    <Link to={`/products/${slug}`} className="group block">
      <div className="glass-card rounded-2xl overflow-hidden hover-lift">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-foreground">{name}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <Button
            variant="ghost"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          >
            Explore {name}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
