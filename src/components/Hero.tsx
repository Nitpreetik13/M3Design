import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

const Hero = ({ title, subtitle, image, ctaText, ctaLink }: HeroProps) => {
  return (
    <section className="relative h-[650px] overflow-hidden bg-black">
      
      {/* Background with parallax + slow zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-heroZoom"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Dark gradient overlay like MGX */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 opacity-0 animate-fadeUp">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl opacity-0 animate-slideLeft">
            {subtitle}
          </p>

          {/* CTA button */}
          {ctaText && ctaLink && (
            <Link to={ctaLink}>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 transition-all duration-300 opacity-0 animate-fadeUpDelay group"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
