"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

const ITEMS: FaqItem[] = [
  {
    question: "What types of healthcare practices does QuadGrowth work with?",
    answer:
      "QuadGrowth works with a broad range of Victorian healthcare practices — dental clinics, optometry, physiotherapy, psychology, allied health, general practice, chiropractic, and podiatry — across Melbourne and regional Victoria.",
  },
  {
    question: "How quickly can I expect to see more patient bookings?",
    answer:
      "Campaigns are typically live within days of onboarding. Most practices see measurable improvements in appointment bookings within the first 30–60 days, with compounding growth over 3–6 months as local SEO and AI targeting take full effect.",
  },
  {
    question: "Is your marketing compliant with AHPRA advertising guidelines?",
    answer:
      "Yes. All QuadGrowth campaigns are developed with full awareness of AHPRA advertising requirements. We focus on measurable business outcomes — bookings, revenue, and practice growth — not clinical outcome claims that could breach the National Law's advertising provisions.",
  },
  {
    question: "Which areas of Victoria do you serve?",
    answer:
      "We serve healthcare practices across all of Victoria — Melbourne CBD, Fitzroy, Richmond, Southbank, Toorak, St Kilda, Box Hill, Dandenong, Frankston, Ringwood, Footscray, Werribee, Geelong, Ballarat, Bendigo, and regional Victoria.",
  },
  {
    question: "What does the free strategy call include?",
    answer:
      "The free 30-minute strategy call includes a live audit of your practice's current online presence and local search visibility, identification of the specific gaps costing you bookings, and a clear picture of what growth is possible in your suburb — with no sales pressure and no obligation to proceed.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} className={`faq-item${isOpen ? " open" : ""}`}>
            <button
              type="button"
              className="faq-question"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {item.question}
              <span className="faq-icon" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq-answer">
              <span>{item.answer}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
