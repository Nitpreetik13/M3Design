import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import bagasseImg from "@/assets/category-bagasse.jpg";
import plasticImg from "@/assets/category-plastic.jpg";
import woodenImg from "@/assets/category-wooden.jpg";
import paperImg from "@/assets/category-paper.jpg";
import signageImg from "@/assets/category-signage.jpg";
import posterImg from "@/assets/category-poster.jpg";
import wallpapersImg from "@/assets/category-wallpapers.jpg";

const Products = () => {
  const categories = [
    {
      name: "Bagasse",
      slug: "bagasse",
      description: "100% biodegradable sugarcane products - plates, bowls, and containers",
      image: bagasseImg,
    },
    {
      name: "Plastic",
      slug: "plastic",
      description: "Durable recyclable plastic containers and packaging solutions",
      image: plasticImg,
    },
    {
      name: "Wooden",
      slug: "wooden",
      description: "Natural wooden cutlery, stirrers, and eco-friendly accessories",
      image: woodenImg,
    },
    {
      name: "Paper",
      slug: "paper",
      description: "Eco-friendly paper bags, boxes, and sustainable packaging",
      image: paperImg,
    },
    {
      name: "Signage",
      slug: "signage",
      description: "Custom printed eco-friendly signage for businesses and events",
      image: signageImg,
    },
    {
      name: "Poster",
      slug: "poster",
      description: "High-quality eco posters for advertising and decoration",
      image: posterImg,
    },
    {
      name: "Wallpapers",
      slug: "wallpapers",
      description: "Sustainable wallpaper solutions for modern spaces",
      image: wallpapersImg,
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
