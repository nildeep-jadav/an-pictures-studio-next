import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container-full text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Let's Create Something Great
        </p>
        <h2 className="text-headline max-w-3xl mx-auto mb-8">
          Have a project in mind? Let's work together.
        </h2>
        <p className="text-body-lg text-muted-foreground max-w-xl mx-auto mb-10">
          I'm always interested in hearing about new projects and opportunities.
          Feel free to reach out and let's discuss how we can collaborate.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 px-8"
          >
            <Link href="/contact">
              Get In Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8"
          >
            <a href="mailto:nildeepjadavnpjd@gmail.com" target="_blank" rel="noopener noreferrer">nildeepjadavnpjd@gmail.com</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
