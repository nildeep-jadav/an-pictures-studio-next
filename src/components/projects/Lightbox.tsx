"use client";

import { useEffect, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
          break;
        case "ArrowRight":
          onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
          break;
      }
    },
    [onClose, onNavigate, currentIndex, images.length]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/95">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 flex items-center justify-between">
        <span className="text-sm text-primary-foreground/70">
          {currentIndex + 1} / {images.length}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-primary-foreground hover:bg-primary-foreground/10 w-12 h-12"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-primary-foreground hover:bg-primary-foreground/10 w-12 h-12"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Image */}
      <div className="absolute inset-0 flex items-center justify-center p-16">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          </div>
        )}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          onLoad={() => setIsLoading(false)}
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Thumbnail Strip (optional - for larger galleries) */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 py-4">
          <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                className={`w-16 h-12 rounded overflow-hidden flex-shrink-0 transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-primary-foreground opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
