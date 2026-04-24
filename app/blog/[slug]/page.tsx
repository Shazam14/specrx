import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { formatPostDate, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/app/_components/mdx-components";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quadgrowth.com.au";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const fm = post.frontmatter;
  const url = `/blog/${slug}`;
  return {
    title: fm.metaTitle ?? fm.title,
    description: fm.description,
    keywords: fm.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: fm.metaTitle ?? fm.title,
      description: fm.description,
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt ?? fm.publishedAt,
      authors: [fm.author ?? "QuadGrowth"],
      images: fm.heroImage ? [{ url: fm.heroImage }] : undefined,
    },
    twitter: {
      title: fm.metaTitle ?? fm.title,
      description: fm.description,
      images: fm.heroImage ? [fm.heroImage] : undefined,
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const url = `${SITE_URL}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: fm.title,
        description: fm.description,
        datePublished: fm.publishedAt,
        dateModified: fm.updatedAt ?? fm.publishedAt,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Organization", name: fm.author ?? "QuadGrowth" },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-AU",
        keywords: fm.keywords?.join(", "),
        image: fm.heroImage ? [fm.heroImage] : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: fm.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id={`ld-json-post-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="post">
        <article className="post-article">
          <nav className="post-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{fm.title}</span>
          </nav>

          <header className="post-header">
            <div className="post-meta">
              <time dateTime={fm.publishedAt}>{formatPostDate(fm.publishedAt)}</time>
              {fm.suburb ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{fm.suburb}</span>
                </>
              ) : null}
              {fm.postType ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="post-type">{fm.postType}</span>
                </>
              ) : null}
            </div>
            <h1 className="post-title">{fm.title}</h1>
            <p className="post-description">{fm.description}</p>
          </header>

          <div className="post-content">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </div>

          {fm.sources && fm.sources.length > 0 ? (
            <section className="post-sources" aria-labelledby="sources-heading">
              <h2 id="sources-heading">Sources</h2>
              <ul>
                {fm.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <footer className="post-footer">
            <p className="post-byline">
              {fm.author ?? "QuadGrowth"} is a Bendigo-based AI-powered marketing agency for
              healthcare clinics across Victoria.{" "}
              <Link href="/">quadgrowth.com.au</Link>
            </p>
            <p>
              <Link href="/blog" className="post-back">
                ← Back to all posts
              </Link>
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
