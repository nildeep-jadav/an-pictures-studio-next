import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { MapPin, Briefcase, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const expertise = [
  "Brand Communication",
  "Campaign Creatives",
  "Identity Systems",
  "Visual Design",
  "Social Media Design",
  "Photography",
  "Print Design",
];

const clients = [
  "BMW",
  "MINI",
  "Motorrad",
  "Hyundai",
  "Kia",
  "Hamleys",
  "Vantara",
  "WantASanta",
  "Mumbai Coffee Festival",
  "Sachin-Jigar",
];

export default function AboutPage() {
  return (
    <Layout>
      <div className="container-full py-12">
        <Breadcrumbs items={[{ label: "About" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-headline mb-8">About Me</h1>

            <div className="prose prose-lg max-w-none block">
              <div className="float-left w-full md:w-1/3 mr-8 mb-2">
                <img
                  src="/My Images/Nildeep-Jadav-01.png"
                  alt="Nildeep Jadav"
                  className="w-full h-auto object-contain"
                />
              </div>

              <p className="text-body-lg text-muted-foreground mb-6">
                I'm a Graphic Designer based in Gujarat, India, passionate about creating
                meaningful visual experiences that connect brands with their audiences.
                Currently, I'm crafting impactful work at <strong className="text-foreground">Dimensions360</strong>,
                where I collaborate with some of the most prestigious brands in the automotive
                and retail sectors.
              </p>

              <p className="text-body text-muted-foreground mb-6">
                My approach to design combines strategic thinking with creative execution.
                I believe that great design is not just about aesthetics—it's about solving
                problems, communicating ideas, and creating emotional connections that drive
                results.
              </p>

              <p className="text-body text-muted-foreground mb-6">
                Over the years, I've had the privilege of working with renowned brands like
                BMW, MINI, Hyundai, Kia, and Hamleys, helping them communicate their stories
                through compelling visual narratives. From brand launches to awareness campaigns,
                each project is an opportunity to push creative boundaries while delivering
                measurable impact.
              </p>

              <p className="text-body text-muted-foreground">
                When I'm not designing, you'll find me exploring photography, attending
                design conferences, or experimenting with new creative tools and techniques.
                I'm always eager to learn, grow, and take on new challenges.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            {/* Quick Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Gujarat, India</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Briefcase className="w-5 h-5" />
                <span>Dimensions360</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:nildeepjadavnpjd@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  nildeepjadavnpjd@gmail.com
                </a>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Areas of Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {expertise.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Clients I've Worked With
              </h3>
              <div className="flex flex-wrap gap-2">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="px-3 py-1.5 border border-border text-foreground text-sm rounded-full"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
