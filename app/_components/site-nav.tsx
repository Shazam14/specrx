import Link from "next/link";

export function SiteNav() {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <Link href="/" className="logo" aria-label="QuadGrowth — Home">
        Quad<span>Growth</span>
      </Link>
      <Link href="/#book" className="nav-cta">
        Book a Free Call →
      </Link>
    </nav>
  );
}
