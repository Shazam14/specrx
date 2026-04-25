import Link from "next/link";

export function SiteFooter() {
  return (
    <footer role="contentinfo">
      <div>
        <div className="logo" style={{ color: "var(--cream)" }}>
          Quad<span>Growth</span>
        </div>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <a href="mailto:ecuadra@quadgrowth.com.au">ecuadra@quadgrowth.com.au</a>
        <a href="tel:+61415689225">+61 415 689 225</a>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/services">Services</Link>
        <Link href="/blog">Blog</Link>
      </nav>
      <p className="footer-bottom">
        © 2026 QuadGrowth. Melbourne, Victoria, Australia. AI-powered growth for healthcare
        practices across Victoria. | ABN: 53 792 887 825 | All marketing compliant with AHPRA
        advertising guidelines.
      </p>
    </footer>
  );
}
