import Script from "next/script";
import type { Metadata } from "next";
import { Faq } from "./_components/faq";
import { InsightsSection } from "./_components/insights-section";
import { LeadForm } from "./_components/lead-form";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "QuadGrowth — AI-Powered Healthcare Marketing | Melbourne, Victoria",
    description:
      "Fill your appointment book with AI-driven patient acquisition. Trusted by healthcare practices across Victoria — dental, physio, allied health & GP. Free strategy call.",
  },
  twitter: {
    title: "QuadGrowth — AI-Powered Healthcare Marketing | Melbourne",
    description:
      "Fill your appointment book with AI-driven patient acquisition across Victoria. Free strategy call for healthcare practices.",
  },
};

const SUBURBS = [
  "Melbourne CBD",
  "Fitzroy",
  "Richmond",
  "Southbank",
  "Toorak",
  "St Kilda",
  "Box Hill",
  "Dandenong",
  "Frankston",
  "Ringwood",
  "Footscray",
  "Werribee",
  "Geelong",
  "Ballarat",
  "Bendigo",
  "+ Regional Victoria",
];

const NICHES = [
  { emoji: "🦷", label: "Dental" },
  { emoji: "👁️", label: "Optometry" },
  { emoji: "🦴", label: "Physiotherapy" },
  { emoji: "🧠", label: "Psychology" },
  { emoji: "💆", label: "Allied Health" },
  { emoji: "🏥", label: "General Practice" },
  { emoji: "💉", label: "Chiropractic" },
  { emoji: "🦶", label: "Podiatry" },
];

const HOW_STEPS = [
  "Find your patients",
  "Reach them first",
  "Fill your schedule",
  "Track every result",
];

const PAIN_POINTS = [
  {
    icon: "📅",
    title: "Empty appointment slots",
    body:
      "Your practice has the capacity but the chairs are empty. In Victoria's competitive market, every unfilled slot is revenue your practice will never recover.",
  },
  {
    icon: "📍",
    title: "Invisible on local search",
    body:
      "Patients across Melbourne, Geelong, Ballarat and regional Victoria are searching for your services right now — and finding your competitors instead of you.",
  },
  {
    icon: "💸",
    title: "Wasted ad spend",
    body:
      "Running Google or Meta ads with no clear strategy? Most Victorian practices burn budget monthly on campaigns that generate clicks but don't convert into actual bookings.",
  },
  {
    icon: "🔄",
    title: "Lapsed patient database",
    body:
      "You have hundreds of patients who haven't returned. An AI-powered reactivation campaign could fill your next few weeks — automatically and compliantly.",
  },
];

const PILLARS = [
  {
    title: "Dominate Local Search",
    body:
      "We optimise your Google presence so patients in your area find you first — before your competitors get the chance.",
  },
  {
    title: "AI Patient Targeting",
    body:
      "Our AI identifies high-intent patients in your suburb and serves them the right message at the right time — compliantly.",
  },
  {
    title: "Fill Empty Slots",
    body:
      "Automated follow-ups and reactivation campaigns keep your schedule moving — week after week, without the manual effort.",
  },
  {
    title: "Track Every Dollar",
    body:
      "Real reporting, real accountability. You'll always know exactly what's working and what your investment is returning.",
  },
];

const PROCESS = [
  {
    icon: "🔍",
    title: "Free Growth Audit",
    body:
      "We analyse your clinic's current online presence, local search visibility, and identify the specific gaps costing you bookings in your area.",
    metric: "Delivered in your first call — no cost, no obligation",
  },
  {
    icon: "🗺️",
    title: "Custom Growth Plan",
    body:
      "Every Victorian suburb is different. We build a strategy specific to your location, your practice type, and your patient demographic — not a generic template.",
    metric: "Tailored to your suburb and practice type",
  },
  {
    icon: "🤖",
    title: "AI-Powered Execution",
    body:
      "Our automation handles the repetitive work — outreach, follow-ups, reporting — so your team focuses on what they do best: caring for patients.",
    metric: "Campaigns live within days of onboarding",
  },
];

const FAQ_ITEMS = [
  {
    q: "What types of healthcare practices does QuadGrowth work with?",
    a: "QuadGrowth works with a broad range of Victorian healthcare practices including dental clinics, optometry, physiotherapy, psychology, allied health, general practice, chiropractic, and podiatry — across Melbourne and regional Victoria.",
  },
  {
    q: "How quickly can QuadGrowth grow my patient bookings?",
    a: "Campaigns are typically live within days of onboarding. Most practices see measurable improvements in appointment bookings within the first 30–60 days, with compounding growth over 3–6 months as local SEO and AI targeting take full effect.",
  },
  {
    q: "Is QuadGrowth's marketing compliant with AHPRA advertising guidelines?",
    a: "Yes. All QuadGrowth campaigns and marketing materials are developed with full awareness of AHPRA advertising requirements for regulated health services in Australia. We focus on measurable business outcomes — bookings, revenue, and practice growth — not clinical outcome claims.",
  },
  {
    q: "Which areas of Victoria does QuadGrowth serve?",
    a: "QuadGrowth serves healthcare practices across all of Victoria, including Melbourne CBD, Fitzroy, Richmond, Southbank, Toorak, St Kilda, Box Hill, Dandenong, Frankston, Ringwood, Footscray, Werribee, Geelong, Ballarat, Bendigo, and broader regional Victoria.",
  },
  {
    q: "What does the free strategy call include?",
    a: "The free 30-minute strategy call includes a live audit of your practice's current online presence and local search visibility, identification of the specific gaps costing you bookings, and a clear picture of what growth is possible in your suburb — with no sales pressure and no obligation to proceed.",
  },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://quadgrowth.com.au/#webpage",
      url: "https://quadgrowth.com.au",
      name: "QuadGrowth — AI-Powered Healthcare Marketing Agency | Melbourne, Victoria",
      description:
        "QuadGrowth helps Victorian healthcare practices fill appointment books and grow revenue with AI-driven patient acquisition.",
      isPartOf: { "@id": "https://quadgrowth.com.au/#website" },
      about: { "@id": "https://quadgrowth.com.au/#organization" },
      inLanguage: "en-AU",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://quadgrowth.com.au/" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Script
        id="ld-json-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-content">
            <div className="hero-badge" aria-hidden="true">
              Victoria&apos;s AI-Powered Healthcare Growth
            </div>
            <h1 id="hero-heading">
              Your Victorian practice deserves a<br />
              <em>full appointment</em>
              <br />
              book. Every week.
            </h1>
            <p className="hero-sub">
              QuadGrowth helps healthcare clinics across Victoria attract more local patients,
              fill empty slots, and grow sustainably — using AI-driven marketing built specifically
              for Australian healthcare.
            </p>
            <div className="hero-actions">
              <a
                href="#book"
                className="btn-primary"
                aria-label="Book a free strategy call with QuadGrowth"
              >
                Book a Free Strategy Call
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <span className="hero-note">No commitment. 30 minutes. No obligation.</span>
            </div>
          </div>
        </section>

        <div className="how-strip" role="list" aria-label="How QuadGrowth works">
          {HOW_STEPS.map((label, i) => (
            <div key={label} className="how-item" role="listitem">
              <span className="how-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="how-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="niches fade-in" aria-label="Healthcare specialties we serve">
          <span className="niches-label">
            We work with Victoria&apos;s healthcare practices including
          </span>
          <div className="niche-tags" role="list">
            {NICHES.map(({ emoji, label }) => (
              <span key={label} className="niche-tag" role="listitem">
                {emoji} {label}
              </span>
            ))}
          </div>
        </div>

        <section className="pain fade-in" aria-labelledby="pain-heading">
          <span className="section-tag">The Problem</span>
          <h2 id="pain-heading">Sound familiar?</h2>
          <div className="pain-grid">
            {PAIN_POINTS.map((p) => (
              <article key={p.title} className="pain-card">
                <span className="pain-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="solution fade-in" aria-labelledby="solution-heading">
          <div className="solution-inner">
            <span className="section-tag">The QuadGrowth Method</span>
            <h2 id="solution-heading">
              Four pillars of growth,
              <br />
              built for Australian healthcare.
            </h2>
            <div className="solution-grid">
              {PILLARS.map((pillar, i) => (
                <div key={pillar.title} className="solution-item">
                  <span className="solution-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process fade-in" aria-labelledby="process-heading">
          <span className="section-tag">What to Expect</span>
          <h2 id="process-heading">
            A clear process.
            <br />
            From day one.
          </h2>
          <div className="process-grid">
            {PROCESS.map((step) => (
              <article key={step.title} className="process-card">
                <div className="process-icon" aria-hidden="true">
                  {step.icon}
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="process-metric">{step.metric}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="faq fade-in" aria-labelledby="faq-heading">
          <span className="section-tag">Common Questions</span>
          <h2 id="faq-heading">
            Everything you need
            <br />
            to know.
          </h2>
          <Faq />
        </section>

        <section className="coverage fade-in" aria-labelledby="coverage-heading">
          <div className="coverage-inner">
            <span className="section-tag">Our Coverage</span>
            <h2 id="coverage-heading">
              Serving healthcare practices
              <br />
              across all of Victoria.
            </h2>
            <p className="coverage-sub">
              From Melbourne&apos;s inner suburbs to regional Victoria — we understand the local
              market dynamics that matter for your practice&apos;s growth.
            </p>
            <div
              className="suburb-grid"
              role="list"
              aria-label="Victorian suburbs and regions we serve"
            >
              {SUBURBS.map((s) => (
                <span key={s} className="suburb-tag" role="listitem">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        <InsightsSection />

        <section className="cta-section fade-in" id="book" aria-labelledby="cta-heading">
          <span className="section-tag">Get Started</span>
          <h2 id="cta-heading">
            Ready to grow your
            <br />
            Victorian practice?
          </h2>
          <p className="cta-sub">
            Book a free 30-minute strategy call or send a quick enquiry below. We&apos;ll review
            your clinic&apos;s local visibility and walk you through exactly what&apos;s possible
            in your suburb — no pressure, just clarity.
          </p>
          <div className="cta-group">
            <a
              href="https://calendly.com/ecuadra-quadgrowth/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "1.05rem", padding: "18px 44px" }}
              aria-label="Book your free strategy call with QuadGrowth"
            >
              Book My Free Strategy Call →
            </a>
            <LeadForm />
            <span className="hero-note">
              No sales pressure. Just a real conversation about your practice&apos;s growth.
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
