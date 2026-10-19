import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AN pictures",
  description:
    "At AN Pictures, we create design, branding, photography, and visual storytelling to create meaningful visual identities and digital experiences.",
  authors: [{ name: "AN pictures" }],
  openGraph: {
    title: "AN pictures",
    description:
      "At AN Pictures, we create design, branding, photography, and visual storytelling to create meaningful visual identities and digital experiences.",
    url: "https://anpictures.com/",
    type: "website",
    images: [
      {
        url: "https://anpictures.com/Essential%20Images/an-pictures-light.svg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@anpictures",
    title: "AN pictures",
    description:
      "At AN Pictures, we create design, branding, photography, and visual storytelling to create meaningful visual identities and digital experiences.",
    images: ["https://anpictures.com/Essential%20Images/an-pictures-light.svg"],
  },
  icons: {
    icon: [
      {
        url: "/Essential Images/an-pictures-dark.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Essential Images/an-pictures-light.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
