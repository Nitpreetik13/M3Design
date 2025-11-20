import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { CheckCircle2, Users, Globe, Award } from "lucide-react";
import aboutImage from "@/assets/about-team.jpg";

const About = () => {
  const milestones = [
    { year: "2018", event: "Company Founded", description: "Started our eco-friendly journey" },
    { year: "2020", event: "1M Products Sold", description: "Reached our first million milestone" },
    { year: "2022", event: "Pan India Expansion", description: "Expanded to serve all major cities" },
    { year: "2024", event: "Sustainability Award", description: "Recognized for environmental impact" },
  ];

  const values = [
    {
      icon: Globe,
      title: "Environmental Responsibility",
      description: "Committed to reducing plastic waste and promoting sustainable alternatives",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Dedicated to providing exceptional service and quality products",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Rigorous testing ensures every product meets our high standards",
    },
    {
      icon: CheckCircle2,
      title: "Innovation",
      description: "Constantly developing new eco-friendly packaging solutions",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <Hero
          title="About EcoPackaging"
          subtitle="Leading the change towards sustainable packaging solutions"
          image={aboutImage}
        />

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded in 2018, EcoPackaging started with a simple mission: to provide businesses 
                with high-quality, sustainable packaging alternatives. Today, we're proud to be one 
                of India's leading suppliers of eco-friendly packaging solutions, serving thousands 
                of businesses across the country.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } animate-stagger-${Math.min(index + 1, 4)}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className="glass-card rounded-xl p-6 hover-lift">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">{milestone.event}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold z-10">
                      {index + 1}
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`glass-card rounded-xl p-6 text-center hover-lift animate-stagger-${index + 1}`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From sourcing to delivery, we ensure quality at every step
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Source",
                  description: "We carefully source sustainable materials from certified suppliers",
                },
                {
                  step: "02",
                  title: "Manufacture",
                  description: "State-of-the-art facilities ensure consistent quality production",
                },
                {
                  step: "03",
                  title: "Deliver",
                  description: "Fast and reliable delivery to your doorstep across India",
                },
              ].map((process, index) => (
                <div
                  key={process.step}
                  className={`glass-card rounded-xl p-8 hover-lift animate-slide-right`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl font-bold text-primary/20 mb-4">{process.step}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
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

export default About;
