import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function SmartLink({ href = "", children, ...rest }: AnchorProps) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export function CTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p className="post-cta">
      <a
        href={href}
        className="btn-primary"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    </p>
  );
}

export function Callout({
  tone = "info",
  children,
}: {
  tone?: "info" | "warn";
  children: React.ReactNode;
}) {
  return <div className={`post-callout post-callout--${tone}`}>{children}</div>;
}

export const mdxComponents: MDXRemoteProps["components"] = {
  a: SmartLink,
  CTA,
  Callout,
};
