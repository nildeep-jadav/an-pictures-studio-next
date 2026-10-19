"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navLinks = [
  { href: "/brand-campaign", label: "Brand & Campaign" },
  { href: "/design-collaterals", label: "Motion Graphics (coming soon)" },
  { href: "/logo-identity", label: "Logo & Identity" },
  { href: "/photography", label: "Photography" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass border-b border-border/50 py-4" : "py-6"
        }`}
      >
        <div className="container-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <img
              src="/Essential Images/an-pictures-dark.svg"
              alt="Logo"
              className="h-8 w-auto dark:hidden"
            />
            <img
              src="/Essential Images/an-pictures-light.svg"
              alt="Logo"
              className="h-8 w-auto hidden dark:block"
            />
            <span className="text-lg font-semibold tracking-tight">Nildeep Jadav</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors link-underline ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
