import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostType = "standard" | "pillar" | "update";
export type AhpraRisk = "Low" | "Medium" | "High";

export type Source = { name: string; url: string };

export type PostFrontmatter = {
  title: string;
  metaTitle?: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  primaryKeyword?: string;
  keywords?: string[];
  suburb?: string;
  postType?: PostType;
  ahpraRisk?: AhpraRisk;
  ahpraReviewed?: boolean;
  heroImage?: string;
  sources?: Source[];
  draft?: boolean;
};

export type Post = {
  slug: string;
  content: string;
  frontmatter: PostFrontmatter;
};

const MDX_EXT = ".mdx";

function isPublished(fm: PostFrontmatter) {
  if (fm.draft && process.env.NODE_ENV === "production") return false;
  return true;
}

async function ensureDir() {
  try {
    await fs.access(BLOG_DIR);
  } catch {
    return false;
  }
  return true;
}

export async function getAllSlugs(): Promise<string[]> {
  if (!(await ensureDir())) return [];
  const files = await fs.readdir(BLOG_DIR);
  return files.filter((f) => f.endsWith(MDX_EXT)).map((f) => f.slice(0, -MDX_EXT.length));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug || slug.includes("/") || slug.includes("..")) return null;
  const filePath = path.join(BLOG_DIR, `${slug}${MDX_EXT}`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  if (!isPublished(frontmatter)) return null;
  if (!frontmatter.title || !frontmatter.description || !frontmatter.publishedAt) {
    return null;
  }
  return { slug, content, frontmatter };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts
    .filter((p): p is Post => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime(),
    );
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
