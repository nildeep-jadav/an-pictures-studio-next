import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    VITE_WEB3FORMS_KEY: process.env.VITE_WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
    VITE_MY_SITE_KEY: process.env.VITE_MY_SITE_KEY || process.env.NEXT_PUBLIC_MY_SITE_KEY || "",
  },
};

export default nextConfig;
