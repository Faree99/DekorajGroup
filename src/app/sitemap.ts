import type { MetadataRoute } from "next";
import { company, solutions, products } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/solutions",
    "/projects",
    "/mart",
    "/consultation",
    "/about",
    "/contact",
    "/start-project",
    "/financing",
    "/partnerships",
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...products.map((p) => `/mart/${p.slug}`),
  ].map((path) => ({
    url: `${company.siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
