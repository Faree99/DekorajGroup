import type { MetadataRoute } from "next";
import { company } from "@/lib/content";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/privacy", "/terms"],
    },
    sitemap: `${company.siteUrl}/sitemap.xml`,
  };
}
