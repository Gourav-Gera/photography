import React from "react";
import { Check } from "lucide-react";

const packages = [
    {
        name: "The Intimate",
    tagline: "Roka · Birthday · Small Function",
    price: "₹ 35,000",
    onwards: "onwards",
    includes: [
"1 Photographer · 4 hours",
"200+ edited photographs",
"30-second highlight reel",
"Online private gallery",
    ],
  },
{
    name: "The Signature",
    featured: true,
        tagline: "Wedding · Pre-Wedding",
    price: "₹ 1,20,000",
    onwards: "onwards",
    includes: [
        "2 Photographers + 1 Cinematographer",
        "Full-day coverage",
        "500+ edited photographs",
        "3–5 min cinematic film",
        "Private hand-bound album (60 pgs)",
    ],
  },
{
    name: "The Odyssey",
    tagline: "Destination · Multi-day",
    price: "₹ 2,85,000",
    onwards: "onwards",
    includes: [
        "4-person crew + drone pilot",
        "Up to 3 days coverage",
        "800+ edited photographs",
        "7–10 min feature film + teaser",
        "Two premium albums + USB keepsake",
    ],
  },
];

export default function Pricing() {
    return (
        <section
            id="pricing"
    data-testid="pricing-section"
    className="py-24 md:py-32 lg:py-40 bg-[var(--gf-bg)] transition-colors duration-500"
        >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
                <div >
                <span className="overline">Investment</span>
                    <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-[var(--gf-text)] mt-3 leading-[1.05]">
    Thoughtful <em className="italic text-[var(--gf-accent)]">packages</em>
            </h2>
          </div>
        <p className="text-[var(--gf-text-soft)] max-w-md font-light">
            Starting points — every shoot is eventually tailored around your
    days, your guest count, and your story.Custom quotes on request.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
    {
        packages.map((p, i) => (
            <div
                key={p.name}
                data-testid={`pricing-card-${i}`}
                className={`p-8 md:p-10 flex flex-col ${p.featured
                        ? "bg-[var(--gf-accent)] text-white border border-[var(--gf-accent)]"
                  : "bg-transparent text-[var(--gf-text)] border border-[var(--gf-border)] hover:border-[var(--gf-accent)]/40 transition-colors"
              } `}
            >
              {p.featured && (
                <span className="overline mb-5 text-white/80">
                  Most Chosen
                </span>
              )}
              <h3 className="font-display text-3xl md:text-4xl font-light leading-none">
                {p.name}
              </h3>
              <p
                className={`text-sm font-light mt-2 ${
        p.featured ? "text-white/75" : "text-[var(--gf-text-soft)]"
    } `}
              >
                {p.tagline}
              </p>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-display text-4xl md:text-5xl font-light">
                  {p.price}
                </span>
                <span
                  className={`text-xs uppercase tracking-[0.2em] ${
        p.featured ? "text-white/75" : "text-[var(--gf-text-soft)]"
    } `}
                >
                  {p.onwards}
                </span>
              </div>
              <ul
                className={`mt-8 space-y-3 flex-1 ${
        p.featured ? "text-white/90" : "text-[var(--gf-text-soft)]"
    } `}
              >
                {p.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 text-sm font-light">
                    <Check
                      size={16}
                      className={`mt-1 ${p.featured ? "text-white" : "text-[var(--gf-accent)]"}`}
                    />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-testid={`pricing-cta-${i}`}
                className={`mt-10 inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] uppercase tracking-[0.2em] transition-all ${
        p.featured
            ? "bg-white text-[var(--gf-accent)] hover:bg-white/90 font-semibold"
                    : "border border-[var(--gf-border)] text-[var(--gf-text)] hover:border-[var(--gf-accent)] hover:text-[var(--gf-accent)]"
    } `}
              >
                Enquire
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
