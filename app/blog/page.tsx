import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quadgrowth.com.au";

export const metadata: Metadata = {
  title: "Blog — AU Healthcare Marketing, AHPRA & Local Growth",
  description:
    "Research-grounded writing on AI-powered healthcare marketing for Australian clinics — AHPRA advertising rules, Google visibility, and patient growth in Bendigo and regional Victoria.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: "QuadGrowth Blog — Australian Healthcare Marketing & Growth",
    description:
      "Research-grounded insights for Victorian healthcare clinic owners — AHPRA, local SEO, and patient growth.",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: "QuadGrowth Blog",
    description:
      "AI-powered healthcare marketing insights for Australian clinics. Bendigo-first, regional Victoria focus.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.frontmatter.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.frontmatter.publishedAt,
      dateModified: p.frontmatter.updatedAt ?? p.frontmatter.publishedAt,
    })),
  };

  return (
    <>
      <Script
        id="ld-json-blog-index"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="blog-index">
        <div className="blog-index-inner">
          <span className="section-tag">The QuadGrowth Blog</span>
          <h1>
            Research-grounded writing on Australian
            <br />
            healthcare marketing.
          </h1>
          <p className="blog-index-sub">
            Plain-spoken insights for Victorian clinic owners — AHPRA advertising rules, Google
            visibility, and patient growth. Bendigo-first, regional Victoria framing.
          </p>

          {posts.length === 0 ? (
            <p className="blog-empty">No posts yet. Check back soon.</p>
          ) : (
            <ul className="post-list">
              {posts.map((p) => (
                <li key={p.slug} className="post-card">
                  <Link href={`/blog/${p.slug}`} className="post-card-link">
                    <div className="post-card-meta">
                      <time dateTime={p.frontmatter.publishedAt}>
                        {formatPostDate(p.frontmatter.publishedAt)}
                      </time>
                      {p.frontmatter.suburb ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{p.frontmatter.suburb}</span>
                        </>
                      ) : null}
                    </div>
                    <h2 className="post-card-title">{p.frontmatter.title}</h2>
                    <p className="post-card-desc">{p.frontmatter.description}</p>
                    <span className="post-card-read">Read post →</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
