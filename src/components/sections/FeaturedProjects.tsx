import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BentoGrid, { BentoItem } from "@/components/projects/BentoGrid";
import ProjectCard from "@/components/projects/ProjectCard";

interface FeaturedProject {
  id: string;
  title: string;
  thumbnail: string;
}

interface FeaturedProjectsProps {
  title: string;
  description: string;
  projects: FeaturedProject[];
  viewAllLink: string;
  category: string;
  onProjectClick?: (project: any) => void;
}

export default function FeaturedProjects({
  title,
  description,
  projects,
  viewAllLink,
  category,
  onProjectClick,
}: FeaturedProjectsProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-headline mb-4">{title}</h2>
            <p className="text-body text-muted-foreground">{description}</p>
          </div>
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-2 text-foreground font-medium link-underline whitespace-nowrap"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <BentoGrid columns={3}>
          {projects.slice(0, 3).map((project, index) => {
            const isLarge = index === 0;
            const span = isLarge ? 2 : 1;

            if (onProjectClick) {
              return (
                <BentoItem key={project.id} span={span}>
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    category={category}
                    thumbnail={project.thumbnail}
                    onClick={() => onProjectClick(project)}
                    size={isLarge ? "large" : "medium"}
                  />
                </BentoItem>
              );
            }

            return (
              <BentoItem key={project.id} span={span}>
                <Link href={viewAllLink} className="block h-full">
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    category={category}
                    thumbnail={project.thumbnail}
                    onClick={() => { }}
                    size={isLarge ? "large" : "medium"}
                  />
                </Link>
              </BentoItem>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
