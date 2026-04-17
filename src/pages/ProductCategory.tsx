import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { CheckCircle2, Leaf, Shield, Droplets } from "lucide-react";
import useProducts from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import bagasseImage from "@/assets/bagasse-products.jpg";
import plasticImage from "@/assets/category-plastic.jpg";
import woodenImage from "@/assets/category-wooden.jpg";
import paperImage from "@/assets/category-paper.jpg";
import signageImage from "@/assets/category-signage.jpg";
import posterImage from "@/assets/category-poster.jpg";
import wallpapersImage from "@/assets/category-wallpapers.jpg";

const ProductCategory = () => {
  const { category } = useParams<{ category: string }>();
  const { products, loading } = useProducts(category);

  const categoryInfo: Record<string, { title: string; description: string; features: string[], image: string }> = {
    bagasse: {
      title: "Bagasse Products",
      description: "100% biodegradable sugarcane-based products that are microwave safe and eco-friendly",
      features: ["Microwave Safe", "Biodegradable", "Leak-proof", "Compostable"],
      image: bagasseImage,
    },
    plastic: {
      title: "Plastic Solutions",
      description: "Durable and recyclable plastic packaging for various applications",
      features: ["Durable", "Recyclable", "Food Safe", "Leak-proof"],
      image: plasticImage,
    },
    wooden: {
      title: "Wooden Products",
      description: "Natural wooden cutlery and accessories for an eco-friendly dining experience",
      features: ["100% Natural", "Biodegradable", "Sturdy", "Chemical-free"],
      image: woodenImage,
    },
    paper: {
      title: "Paper Packaging",
      description: "Recyclable paper-based packaging solutions for sustainable businesses",
      features: ["Recyclable", "Customizable", "Eco-friendly", "Cost-effective"],
      image: paperImage,
    },
    signage: {
      title: "Eco Signage",
      description: "Custom printed signage on sustainable materials",
      features: ["Custom Printing", "Weather Resistant", "Eco Materials", "Vibrant Colors"],
      image: signageImage,
    },
    poster: {
      title: "Eco Posters",
      description: "High-quality poster printing on recycled and sustainable paper",
      features: ["High Resolution", "Eco Paper", "Custom Sizes", "Fast Printing"],
      image: posterImage,
    },
    wallpapers: {
      title: "Sustainable Wallpapers",
      description: "Eco-friendly wallpapers for modern, sustainable interior design",
      features: ["Non-toxic", "Sustainable", "Easy Install", "Various Designs"],
      image: wallpapersImage,
    },
  };

  const info = categoryInfo[category || ""] || {
    title: "Products",
    description: "Eco-friendly products",
    features: [],
    image: wallpapersImage,
  };

  const featureIcons = [CheckCircle2, Leaf, Shield, Droplets];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Banner */}
        <section className="relative h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${info.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
          </div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up">
                {info.title}
              </h1>
              <p className="text-lg text-primary-foreground/90 animate-slide-left">
                {info.description}
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {info.features.map((feature, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return (
                  <div
                    key={feature}
                    className={`flex items-center gap-3 animate-stagger-${Math.min(index + 1, 4)}`}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-foreground text-sm">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Available Products</h2>
              <p className="text-muted-foreground">
                Browse our selection of {info.title.toLowerCase()}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-56 w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div
                    key={product.name}
                    className={`animate-stagger-${Math.min((index % 4) + 1, 4)}`}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products available in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
              Need Bulk Orders or Custom Solutions?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Contact us for special pricing on bulk orders and customized packaging solutions
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-background text-primary hover:bg-background/90 transition-colors font-medium"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductCategory;
