import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { PackageCheck, Truck, Landmark, Lightbulb } from "lucide-react";
import aboutImage from "@/assets/about-team.jpg";

const About = () => {
  const milestones = [
    {
      year: "2024",
      event: "Idea Born",
      description: "The concept of a next‑generation restaurant supply chain model was envisioned",
    },
    {
      year: "2024",
      event: "Company Launched",
      description: "M3 Design officially launched as a dedicated supply‑chain partner for restaurants",
    },
    {
      year: "2025",
      event: "First Vendor Partnerships",
      description: "We began forming our first verified vendor and packaging supplier partnerships",
    },
  ];

  const values = [
    {
      icon: PackageCheck,
      title: "Reliable Packaging",
      description: "Ensuring restaurants never run out of essential boxes, cups, and eco-friendly supplies",
    },
    {
      icon: Truck,
      title: "Smooth Logistics",
      description: "Fast, predictable delivery with real-time tracking and zero guesswork",
    },
    {
      icon: Landmark,
      title: "Vendor Transparency",
      description: "Fair pricing, verified vendors, and complete clarity at every step",
    },
    {
      icon: Lightbulb,
      title: "Smart Technology",
      description: "Leveraging automation to help restaurants manage inventory effortlessly",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-16">
        <Hero
          title="About M3 Design"
          subtitle="Revolutionizing the way restaurants manage and receive their packaging supplies"
          image={aboutImage}
        />

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                M3 Design was born with one clear mission: to eliminate the chaos behind restaurant packaging logistics. 
                From boxes to cups to eco-friendly containers, we ensure restaurants get exactly what they need—on time, 
                every time. No more last-minute shortages. No more unreliable vendors. Just smooth operations.
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
                The principles that drive our mission to build the most reliable restaurant supply chain platform
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How We Operate</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our tech-driven process ensures every restaurant gets the right packaging at the right time
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Forecast",
                  description: "Smart predictions ensure restaurants never overstock or run out",
                },
                {
                  step: "02",
                  title: "Source & Verify",
                  description: "We work with trusted suppliers to maintain consistent quality",
                },
                {
                  step: "03",
                  title: "Deliver",
                  description: "Fast, reliable delivery with seamless coordination and tracking",
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
