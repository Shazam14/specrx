import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/blog";

export async function InsightsSection() {
  const posts = await getAllPosts();
  if (posts.length === 0) return null;

  const featured = posts.slice(0, 3);
  const isSingle = featured.length === 1;

  return (
    <section className="insights fade-in" aria-labelledby="insights-heading">
      <div className="insights-inner">
        <span className="section-tag">Insights</span>
        <h2 id="insights-heading">
          Thinking on healthcare
          <br />
          patient acquisition.
        </h2>
        <p className="insights-sub">
          Plain-spoken writing for Victorian clinic owners — AHPRA rules, Google visibility, and
          what actually moves the needle for local practices.
        </p>

        <ul className={`post-list ${isSingle ? "insights-featured" : "insights-grid"}`}>
          {featured.map((p) => (
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
                <h3 className="post-card-title">{p.frontmatter.title}</h3>
                <p className="post-card-desc">{p.frontmatter.description}</p>
                <span className="post-card-read">Read post →</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="insights-footer">
          <Link href="/blog" className="insights-view-all">
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
