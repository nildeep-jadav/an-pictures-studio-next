"use client";

import { useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FlipbookViewer = dynamic(() => import("./FlipbookViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  ),
});

export interface ProjectContentBlock {
  type: "text" | "section_title" | "image" | "image_grid" | "pdf_flipbook";
  text?: string;       // For text and section_title
  src?: string;        // For single image or pdf url
  alt?: string;        // For single image or flipbook title
  images?: { src: string; alt: string }[]; // For image_grid
}

export interface CaseStudyProject {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  client?: string;
  year?: string;
  challenge?: string;
  solution?: string;
  content?: ProjectContentBlock[];
}

interface CaseStudyPopupProps {
  project: CaseStudyProject | null;
  onClose: () => void;
  breadcrumb?: string;
}

export default function CaseStudyPopup({
  project,
  onClose,
  breadcrumb,
}: CaseStudyPopupProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  // Helper to render formatting in text (e.g., **bold**)
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup Container */}
      <div className="absolute inset-4 md:inset-8 lg:inset-12 bg-background rounded-lg overflow-hidden animate-scale-in shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {breadcrumb && <span>{breadcrumb} → </span>}
            <span className="text-foreground font-medium">{project.title}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-secondary"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-65px)] scrollbar-thin">
          {/* Hero Image */}
          <div className="aspect-[21/9] w-full bg-secondary">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Info */}
          <div className="container-tight py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {project.category}
                </span>
                <h1 className="text-headline mt-2">{project.title}</h1>
              </div>
              <div className="space-y-4">
                {project.client && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                      Client
                    </span>
                    <span className="font-medium">{project.client}</span>
                  </div>
                )}
                {project.year && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                      Year
                    </span>
                    <span className="font-medium">{project.year}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-body-lg text-muted-foreground max-w-3xl mb-16">
              {project.description}
            </p>

            {(project.challenge || project.solution) && (
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                {project.challenge && (
                  <div>
                    <h3 className="text-title mb-4">The Challenge</h3>
                    <p className="text-body text-muted-foreground">
                      {project.challenge}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h3 className="text-title mb-4">The Solution</h3>
                    <p className="text-body text-muted-foreground">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Flexible Content Rendering (Identity Designed Layout) */}
            {project.content && project.content.length > 0 && (
              <div className="space-y-12 mb-16">
                {project.content.map((block, index) => {
                  if (block.type === "section_title" && block.text) {
                    return (
                      <h2 key={index} className="text-2xl md:text-3xl font-semibold mt-16 mb-6">
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "text" && block.text) {
                    return (
                      <p key={index} className="text-body text-muted-foreground max-w-3xl">
                        {renderFormattedText(block.text)}
                      </p>
                    );
                  }

                  if (block.type === "image_grid" && block.images) {
                    return (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                        {block.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="rounded-lg overflow-hidden bg-secondary">
                            <img
                              src={img.src}
                              alt={img.alt || `Project Image ${imgIndex + 1}`}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (block.type === "image" && block.src) {
                    return (
                      <div key={index} className="rounded-lg overflow-hidden bg-secondary my-8">
                        <img
                          src={block.src}
                          alt={block.alt || "Project Image"}
                          loading="lazy"
                          className="w-full h-auto"
                        />
                      </div>
                    );
                  }

                  if (block.type === "pdf_flipbook" && block.src) {
                    return (
                      <div key={index} className="my-12">
                        <FlipbookViewer pdfUrl={block.src} title={block.alt} />
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            )}

            {/* Standard Image Gallery (Fallback if content not used) */}
            {(!project.content || project.content.length === 0) && (
              <div className="space-y-8">
                {project.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden bg-secondary">
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      loading="lazy"
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
