import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full border border-foreground" />
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full border border-foreground" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-foreground" />
      </div>

      <div className="container-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          <div className="lg:col-span-3">
            {/* Main Headline */}
            <h1 className="text-display mb-8 animate-fade-in-up">
              Designing brands, campaigns &amp; experiences that{" "}
              <span className="text-accent">connect</span>.
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg text-muted-foreground max-w-2xl mb-4 animate-fade-in-up delay-100 opacity-0">
              Graphic Designer based in Gujarat · Currently at{" "}
              <span className="text-foreground font-medium">Dimensions360</span>
            </p>

            <p className="text-body text-muted-foreground mb-10 animate-fade-in-up delay-200 opacity-0">
              Worked with BMW, MINI, Hyundai, Hamleys & more
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300 opacity-0">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 px-8"
              >
                <Link href="/brand-campaign">
                  View Work
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8"
              >
                <Link href="/contact">Let's Work Together</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in delay-200 hidden lg:block lg:col-span-1">
            <img
              src="/My Images/Nildeep-Jadav-01.png"
              alt="Nildeep Jadav"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
