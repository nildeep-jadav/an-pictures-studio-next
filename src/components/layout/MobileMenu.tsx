"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background animate-slide-in-right shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={onClose}
              className="p-2 -mr-2 hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-8 px-6 overflow-y-auto">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/"
                  className={`block text-2xl font-medium transition-colors ${
                    isActive("/") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block text-2xl font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resume Button */}
          <div className="p-6 border-t border-border">
          </div>
        </div>
      </div>
    </div>
  );
}
