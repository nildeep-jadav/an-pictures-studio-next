"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ClientLogos from "@/components/sections/ClientLogos";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ContactCTA from "@/components/sections/ContactCTA";
import CaseStudyPopup, { CaseStudyProject } from "@/components/projects/CaseStudyPopup";
import Lightbox from "@/components/projects/Lightbox";
import {
  brandCampaignProjects,
  designCollateralsProjects,
  logoIdentityProjects,
  photographyProjects,
  PhotographyProject,
} from "@/data/projects";

export default function HomePage() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyProject | null>(null);
  const [selectedPhotoProject, setSelectedPhotoProject] = useState<PhotographyProject | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const handleCaseStudyClick = (project: any) => {
    setSelectedCaseStudy(project as CaseStudyProject);
  };

  const handlePhotoClick = (project: any) => {
    setSelectedPhotoProject(project as PhotographyProject);
    setLightboxIndex(0);
  };

  return (
    <Layout>
      <HeroSection />
      <ClientLogos />

      {/* Featured Brand & Campaign */}
      <FeaturedProjects
        title="Brand & Campaign Visual Communication"
        description="Visual design work developed for brand campaigns, social communication, and print collateral across industries"
        projects={brandCampaignProjects.slice(0, 5)}
        viewAllLink="/brand-campaign"
        category="Brand & Campaign Visual Communication"
        onProjectClick={handleCaseStudyClick}
      />

      {/* Featured Motion Graphics */}
      <div className="bg-secondary">
        <FeaturedProjects
          title="Motion Graphics & Video Content"
          description="Dynamic motion graphics, engaging video edits, and compelling visual storytelling."
          projects={designCollateralsProjects.slice(0, 5)}
          viewAllLink="/design-collaterals"
          category="Motion Graphics & Video Content"
          onProjectClick={handleCaseStudyClick}
        />
      </div>

      {/* Featured Logo & Identity */}
      <FeaturedProjects
        title="Logo & Identity Design"
        description="Logos developed for startups and growing brands across multiple industries"
        projects={logoIdentityProjects.slice(0, 5)}
        viewAllLink="/logo-identity"
        category="Logo & Identity Design"
        onProjectClick={handleCaseStudyClick}
      />

      {/* Featured Photography */}
      <div className="bg-secondary">
        <FeaturedProjects
          title="Photography"
          description="Photography work created for brands, environments, and occasions"
          projects={photographyProjects.slice(0, 5)}
          viewAllLink="/photography"
          category="Photography"
          onProjectClick={handlePhotoClick}
        />
      </div>

      <ContactCTA />

      {/* Case Study Popup */}
      <CaseStudyPopup
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Photography Lightbox */}
      {selectedPhotoProject && (
        <Lightbox
          images={selectedPhotoProject.images}
          currentIndex={lightboxIndex}
          onClose={() => setSelectedPhotoProject(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </Layout>
  );
}
