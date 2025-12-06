import { Recycle, Truck, DollarSign, Package, Leaf } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-eco-packaging.jpg";
import { Link } from "react-router-dom";

// Import all category images properly (required for Vercel)
import bagasseImg from "@/assets/category-bagasse.jpg";
import plasticImg from "@/assets/category-plastic.jpg";
import woodenImg from "@/assets/category-wooden.jpg";
import paperImg from "@/assets/category-paper.jpg";
import signageImg from "@/assets/category-signage.jpg";
import posterImg from "@/assets/category-poster.jpg";
import wallpapersImg from "@/assets/category-wallpapers.jpg";

const Index = () => {
  const categories = [
    {
      name: "Bagasse",
      slug: "bagasse",
      description: "100% biodegradable sugarcane products",
      image: bagasseImg,
    },
    {
      name: "Plastic",
      slug: "plastic",
      description: "Durable and recyclable plastic solutions",
      image: plasticImg,
    },
    {
      name: "Wooden",
      slug: "wooden",
      description: "Natural wooden cutlery and accessories",
      image: woodenImg,
    },
    {
      name: "Paper",
      slug: "paper",
      description: "Eco-friendly paper packaging",
      image: paperImg,
    },
    {
      name: "Signage",
      slug: "signage",
      description: "Custom printed eco signage",
      image: signageImg,
    },
    {
      name: "Poster",
      slug: "poster",
      description: "High-quality eco posters",
      image: posterImg,
    },
    {
      name: "Wallpapers",
      slug: "wallpapers",
      description: "Sustainable wallpaper solutions",
      image: wallpapersImg,
    },
  ];

  const features = [
    {
      icon: Recycle,
      title: "Eco-Friendly",
      description: "100% biodegradable and compostable products",
    },
    {
      icon: DollarSign,
      title: "Affordable",
      description: "Competitive prices without compromising quality",
    },
    {
      icon: Package,
      title: "Bulk Orders",
      description: "Special discounts on large quantity orders",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick shipping across India",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <Hero
          title="Sustainable Packaging for a Greener Tomorrow"
          subtitle="Premium eco-friendly packaging solutions that protect both your products and the planet"
          image={heroImage}
          ctaText="Explore Products"
          ctaLink="/products"
        />

        {/* Featured Categories */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Our Product Categories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our wide range of eco-friendly packaging solutions designed for every need
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={category.slug}
                  className={`animate-stagger-${Math.min(index % 4 + 1, 4)}`}
                >
                  <CategoryCard {...category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Choose EcoPackaging?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the best eco-friendly packaging solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`glass-card rounded-xl p-6 text-center hover-lift animate-stagger-${index + 1}`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <Leaf className="w-16 h-16 mx-auto mb-6 text-primary-foreground animate-fade-up" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground animate-fade-up">
                Looking for Custom Packaging Solutions?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 animate-slide-left">
                Get in touch with us for customized eco-friendly packaging tailored to your business needs
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90 animate-fade-up"
                >
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
