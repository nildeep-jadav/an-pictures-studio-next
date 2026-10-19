"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BentoGrid from "@/components/projects/BentoGrid";
import ProjectCard from "@/components/projects/ProjectCard";
import CaseStudyPopup, { CaseStudyProject } from "@/components/projects/CaseStudyPopup";
import { logoIdentityProjects } from "@/data/projects";

export default function LogoIdentityPage() {
  const [selectedProject, setSelectedProject] = useState<CaseStudyProject | null>(null);

  return (
    <Layout>
      <div className="container-full py-12">
        <Breadcrumbs
          items={[
            { label: "Logo & Identity" },
          ]}
        />

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-headline mb-6">Logo & Identity Design</h1>
          <p className="text-xl font-medium text-foreground mb-6">
            Logos developed for startups and growing brands across multiple industries
          </p>
          <p className="text-body-lg text-muted-foreground">
            This collection showcases logo design work created for startups and growing brands across a range of industries. Each project focuses on developing a clear and distinctive visual mark that reflects the brand’s purpose and positioning. The logos are designed to be practical, adaptable, and scalable, ensuring they work effectively across digital platforms, print materials, and real-world brand applications.
          </p>
        </div>

        {/* Projects Grid */}
        <BentoGrid columns={3}>
          {logoIdentityProjects.map((project, index) => (
            <div key={project.id} className={index % 4 === 0 ? "md:col-span-2" : ""}>
              <ProjectCard
                id={project.id}
                title={project.title}
                category={project.category}
                thumbnail={project.thumbnail}
                onClick={() => setSelectedProject(project)}
                size={index % 4 === 0 ? "large" : "medium"}
              />
            </div>
          ))}
        </BentoGrid>
      </div>

      {/* Case Study Popup */}
      <CaseStudyPopup
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        breadcrumb="Logo & Identity"
      />
    </Layout>
  );
}
