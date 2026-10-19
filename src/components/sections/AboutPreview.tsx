import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              About Me
            </p>
            <h2 className="text-headline mb-6">
              Crafting visual stories that leave lasting impressions.
            </h2>
            <p className="text-body-lg text-muted-foreground mb-6">
              As a Graphic Designer based in Gujarat, I specialize in brand
              communication, campaign creatives, identity systems, and
              photography. Currently creating impactful work at Dimensions360.
            </p>
            <p className="text-body text-muted-foreground mb-8">
              My approach combines strategic thinking with creative execution,
              ensuring every project resonates with its intended audience while
              maintaining visual excellence.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-foreground font-medium link-underline"
            >
              Learn More About Me
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-secondary rounded-lg overflow-hidden">
              <img
                src="/My Images/Nildeep-Jadav.png"
                alt="Nildeep Jadav"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-accent rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
