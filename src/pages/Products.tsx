import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";

const Products = () => {
  const categories = [
    {
      name: "Bagasse",
      slug: "bagasse",
      description: "100% biodegradable sugarcane products - plates, bowls, and containers",
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=600",
    },
    {
      name: "Plastic",
      slug: "plastic",
      description: "Durable recyclable plastic containers and packaging solutions",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600",
    },
    {
      name: "Wooden",
      slug: "wooden",
      description: "Natural wooden cutlery, stirrers, and eco-friendly accessories",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600",
    },
    {
      name: "Paper",
      slug: "paper",
      description: "Eco-friendly paper bags, boxes, and sustainable packaging",
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=600",
    },
    {
      name: "Signage",
      slug: "signage",
      description: "Custom printed eco-friendly signage for businesses and events",
      image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&h=600",
    },
    {
      name: "Poster",
      slug: "poster",
      description: "High-quality eco posters for advertising and decoration",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600",
    },
    {
      name: "Wallpapers",
      slug: "wallpapers",
      description: "Sustainable wallpaper solutions for modern spaces",
      image: "https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?w=800&h=600",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <Hero
          title="Our Product Range"
          subtitle="Explore our comprehensive collection of eco-friendly packaging solutions"
          image="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1920&h=600"
        />

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </main>

      <Footer />
    </div>
  );
};

export default Products;
