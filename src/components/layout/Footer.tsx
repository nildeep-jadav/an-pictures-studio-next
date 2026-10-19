import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { href: "https://www.instagram.com/an._.pictures/", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/in/nildeep-jadav", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:nildeepjadavnpjd@gmail.com", icon: Mail, label: "Email" },
];

const footerLinks = [
  { href: "/brand-campaign", label: "Brand & Campaign" },
  { href: "/design-collaterals", label: "Motion Graphics (coming soon)" },
  { href: "/logo-identity", label: "Logo & Identity" },
  { href: "/photography", label: "Photography" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-full py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Designer Portfolio
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Graphic Designer based in Gujarat, India. Creating meaningful brand experiences
              and visual communications for forward-thinking brands.
            </p>
            <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Gujarat, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Work
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-foreground hover:text-background transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Designer Portfolio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed & Built by Nildeep Jadav.
          </p>
        </div>
      </div>
    </footer>
  );
}
