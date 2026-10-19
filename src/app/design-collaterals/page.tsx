"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BentoGrid from "@/components/projects/BentoGrid";
import ProjectCard from "@/components/projects/ProjectCard";
import CaseStudyPopup, { CaseStudyProject } from "@/components/projects/CaseStudyPopup";
import { designCollateralsProjects } from "@/data/projects";

export default function DesignCollateralsPage() {
  const [selectedProject, setSelectedProject] = useState<CaseStudyProject | null>(null);

  return (
    <Layout>
      <div className="container-full py-12">
        <Breadcrumbs
          items={[
            { label: "Motion Graphics & Video Content" },
          ]}
        />

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-headline mb-6">Motion Graphics & Video Content</h1>
          <p className="text-xl font-medium text-foreground mb-6">
            Dynamic motion graphics, engaging video edits, and compelling visual storytelling.
          </p>
          <p className="text-body-lg text-muted-foreground">
            This collection features a variety of motion graphics and video content tailored for digital platforms and marketing campaigns. The work encompasses animated typography, promotional videos, social media reels, and short-form storytelling pieces designed to capture attention and communicate brand messages effectively. Each project emphasizes fluid animation, strong pacing, and visual impact to create engaging viewer experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <BentoGrid columns={3}>
          {designCollateralsProjects.map((project, index) => (
            <div key={project.id} className={index % 7 === 0 ? "md:col-span-2" : ""}>
              <ProjectCard
                id={project.id}
                title={project.title}
                category={project.category}
                thumbnail={project.thumbnail}
                onClick={() => setSelectedProject(project)}
                size={index % 7 === 0 ? "large" : "medium"}
              />
            </div>
          ))}
        </BentoGrid>
      </div>

      {/* Case Study Popup */}
      <CaseStudyPopup
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        breadcrumb="Motion Graphics & Video Content"
      />
    </Layout>
  );
}
