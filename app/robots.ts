import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quadgrowth.com.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/staging/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/*.css", "/*.js"],
        disallow: ["/admin/", "/staging/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/staging/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
