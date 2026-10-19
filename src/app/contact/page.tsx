"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Instagram, Linkedin, Send } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    turnstileToken?: string | null;
    turnstile?: any;
    onTurnstileSuccess?: (token: string) => void;
  }
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!window.turnstileToken) {
      toast.error("Please complete captcha verification");
      return;
    }

    setIsSubmitting(true);

    const form = new FormData(e.currentTarget);
    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      process.env.VITE_WEB3FORMS_KEY ||
      "";
    form.append("access_key", accessKey);
    form.append("cf-turnstile-response", window.turnstileToken);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
        window.turnstile?.reset();
        window.turnstileToken = null;
      } else {
        toast.error("Captcha verification failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => {
      window.turnstileToken = token;
    };

    return () => {
      delete window.onTurnstileSuccess;
    };
  }, []);

  const siteKey =
    process.env.NEXT_PUBLIC_MY_SITE_KEY ||
    process.env.VITE_MY_SITE_KEY ||
    "";

  return (
    <Layout>
      <div className="container-full py-12">
        <Breadcrumbs items={[{ label: "Contact" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div>
            <h1 className="text-headline mb-6">Let's Work Together</h1>
            <p className="text-body-lg text-muted-foreground mb-12">
              Have a project in mind? I'd love to hear about it. Whether you need
              brand design, campaign creatives, or visual identity work, let's
              discuss how we can collaborate.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground">Gujarat, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a
                    href="mailto:nildeepjadavnpjd@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    nildeepjadavnpjd@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Follow Me
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/an._.pictures/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-lg hover:bg-foreground hover:text-background transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nildeep-jadav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-lg hover:bg-foreground hover:text-background transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-card p-8 md:p-12 rounded-lg border border-border">
            <h2 className="text-title mb-6">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nildeepjadavnpjd@gmail.com"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  className="bg-background resize-none"
                />
              </div>

              <div
                className="cf-turnstile"
                data-sitekey={siteKey}
                data-callback="onTurnstileSuccess"
              ></div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
