"use client";

import { useState } from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  onClick: () => void;
  size?: "small" | "medium" | "large";
}

export default function ProjectCard({
  title,
  category,
  thumbnail,
  onClick,
  size = "medium",
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const sizeClasses = {
    small: "aspect-square",
    medium: "aspect-[4/3]",
    large: "aspect-[16/10]",
  };

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div
        className={`relative overflow-hidden bg-secondary ${sizeClasses[size]} rounded-lg`}
      >
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        
        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-secondary" />
        )}
      </div>

      <div className="mt-4">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {category}
        </span>
        <h3 className="mt-1 text-lg font-medium group-hover:text-accent transition-colors">
          {title}
        </h3>
      </div>
    </article>
  );
}
