import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { BotIdClient } from "botid/client";
import { FadeInObserver } from "./_components/fade-in-observer";
import { SiteNav } from "./_components/site-nav";
import { SiteFooter } from "./_components/site-footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quadgrowth.com.au";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "QuadGrowth — AI-Powered Healthcare Marketing Agency | Melbourne, Victoria",
    template: "%s | QuadGrowth",
  },
  description:
    "QuadGrowth helps Victorian healthcare practices fill appointment books and grow revenue with AI-driven patient acquisition. Dental, physio, allied health & GP clinics across Melbourne, Geelong & regional VIC. Book a free strategy call.",
  keywords: [
    "healthcare marketing agency Melbourne",
    "dental marketing Victoria",
    "AI patient acquisition",
    "medical practice marketing Melbourne",
    "allied health marketing",
    "healthcare SEO Victoria",
  ],
  authors: [{ name: "QuadGrowth" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.svg", type: "image/svg+xml", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.svg",
  },
  other: {
    "geo.region": "AU-VIC",
    "geo.placename": "Melbourne, Victoria, Australia",
  },
  openGraph: {
    type: "website",
    siteName: "QuadGrowth",
    locale: "en_AU",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QuadGrowth — AI-Powered Healthcare Marketing Agency Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://quadgrowth.com.au/#organization",
      name: "QuadGrowth",
      legalName: "QuadGrowth",
      description:
        "AI-powered healthcare marketing agency helping Victorian practices fill appointment books and grow revenue through patient acquisition, local SEO, and intelligent automation.",
      url: "https://quadgrowth.com.au",
      logo: "https://quadgrowth.com.au/logo.png",
      image: "https://quadgrowth.com.au/og-image.jpg",
      telephone: "+61415689225",
      email: "ecuadra@quadgrowth.com.au",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Melbourne",
        addressRegion: "VIC",
        postalCode: "3000",
        addressCountry: "AU",
      },
      areaServed: [
        { "@type": "City", name: "Melbourne" },
        { "@type": "City", name: "Geelong" },
        { "@type": "City", name: "Ballarat" },
        { "@type": "City", name: "Bendigo" },
        { "@type": "AdministrativeArea", name: "Victoria, Australia" },
      ],
      serviceType: [
        "Healthcare Marketing",
        "Dental Marketing",
        "Patient Acquisition",
        "Local SEO for Healthcare",
        "Google Ads for Medical Practices",
        "Allied Health Marketing",
        "AI Marketing Automation",
      ],
      priceRange: "$$",
      identifier: { "@type": "PropertyValue", name: "ABN", value: "53 792 887 825" },
      sameAs: [
        "https://www.linkedin.com/company/quadgrowth",
        "https://www.facebook.com/quadgrowth",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://quadgrowth.com.au/#website",
      url: "https://quadgrowth.com.au",
      name: "QuadGrowth",
      description: "AI-powered healthcare marketing for Victorian practices",
      publisher: { "@id": "https://quadgrowth.com.au/#organization" },
      inLanguage: "en-AU",
    },
  ],
};

const apolloPrehide = `(function initApolloInbound(){var TIMEOUT_MS=15000;var timeoutId;var style=document.createElement('style');style.id='apollo-form-prehide-css';style.textContent='form:has(input[type="email" i]),form:has(input[name="email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="email" i])::before,.hs-form-iframe::before{content:"";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';(document.head||document.documentElement).appendChild(style);function cleanup(){var styleEl=document.getElementById('apollo-form-prehide-css');if(styleEl)styleEl.remove();if(timeoutId)clearTimeout(timeoutId);}timeoutId=setTimeout(function(){console.warn('[Apollo] Form enrichment timeout - revealing forms.');cleanup();},TIMEOUT_MS);var nocache=Math.random().toString(36).substring(7);var script=document.createElement('script');script.src='https://assets.apollo.io/js/apollo-inbound.js?nocache='+nocache;script.defer=true;script.onerror=function(){console.error('[Apollo] Failed to load form enrichment script');cleanup();};script.onload=function(){try{window.ApolloInbound.formEnrichment.init({appId:'69c651c100c6ca00156f3fc1',onReady:function(){cleanup();},onError:function(err){console.error('[Apollo] Form enrichment init error:',err);cleanup();}});}catch(err){console.error('[Apollo] Error initializing form enrichment:',err);cleanup();}};document.head.appendChild(script);})();`;

const apolloTracker = `(function initApolloTracker(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;o.async=!0;o.defer=!0;o.onload=function(){window.trackingFunctions&&window.trackingFunctions.onLoad({appId:"69b2a528a19bc6001d263d20"})};document.head.appendChild(o);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <BotIdClient protect={[{ path: "/api/lead", method: "POST" }]} />
        <GoogleTagManager gtmId="GTM-NCDH3CCC" />
        <Script
          id="apollo-form-enrichment"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: apolloPrehide }}
        />
        <Script
          id="apollo-tracker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: apolloTracker }}
        />
        <Script
          id="ld-json-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <SiteNav />
        {children}
        <SiteFooter />
        <FadeInObserver />
      </body>
    </html>
  );
}
