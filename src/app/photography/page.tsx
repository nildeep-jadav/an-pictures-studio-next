"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Lightbox from "@/components/projects/Lightbox";
import BentoGrid, { BentoItem } from "@/components/projects/BentoGrid";
import { photographyProjects, PhotographyProject } from "@/data/projects";

export default function PhotographyPage() {
  const [selectedProject, setSelectedProject] = useState<PhotographyProject | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const handleProjectClick = (project: PhotographyProject) => {
    setSelectedProject(project);
    setLightboxIndex(0);
  };

  const handleCloseLightbox = () => {
    setSelectedProject(null);
    setLightboxIndex(0);
  };

  const lightboxImages = selectedProject?.images || [];

  return (
    <Layout>
      <div className="container-full py-12">
        <Breadcrumbs
          items={[
            { label: "Photography" },
          ]}
        />

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-headline mb-6">Photography</h1>
          <p className="text-xl font-medium text-foreground mb-6">
            Photography work created for brands, environments, and occasions
          </p>
          <p className="text-body-lg text-muted-foreground">
            This collection features photography work spanning architecture, hospitality, events, and personal milestones. The focus remains on composition, lighting, and detail to accurately capture spaces, experiences, and moments as they are meant to be seen. Each project is approached with an understanding of context and purpose, ensuring the photographs serve both documentation and brand presentation.
          </p>
        </div>

        {/* Photo Projects Grid */}
        <BentoGrid columns={3}>
          {photographyProjects.map((project, index) => (
            <BentoItem
              key={project.id}
              span={index % 5 === 0 ? 2 : 1}
              rowSpan={index % 7 === 0 ? 2 : 1}
            >
              <div
                onClick={() => handleProjectClick(project)}
                className="group cursor-pointer overflow-hidden rounded-lg bg-card h-full"
              >
                <div className="relative aspect-[4/3] w-full h-full min-h-[250px]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground mt-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.images.length} photos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </BentoItem>
          ))}
        </BentoGrid>
      </div>

      {/* Lightbox */}
      {selectedProject && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </Layout>
  );
}
