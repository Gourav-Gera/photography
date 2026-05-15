import React from "react";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 md:py-32 lg:py-40 bg-[var(--gf-bg)] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

        {/* Images Column */}
        <div className="lg:col-span-6 relative min-h-[480px] md:min-h-[560px]">
          {/* Main large image */}
          <div className="relative z-10 w-3/4 aspect-[3/4] overflow-hidden">
            <div className="absolute -top-3 -left-3 w-full h-full border border-[var(--gf-accent)]/30 -z-10 pointer-events-none" />
            <img
              src="/films/images/masoori-prewedding.png"
              alt="Gera Films studio — pre-wedding shoot"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              data-testid="about-image"
            />
          </div>

          {/* Floating second image — overlapping */}
          <div className="absolute bottom-0 right-0 w-2/5 aspect-[3/4] overflow-hidden shadow-2xl z-20 border-2 border-[var(--gf-bg)]">
            <img
              src="https://images.pexels.com/photos/9801096/pexels-photo-9801096.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400"
              alt="Wedding photography"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Stats badge */}
          <div className="absolute -bottom-4 left-0 bg-[var(--gf-surface)] border border-[var(--gf-border)] px-6 py-4 z-30">
            <span className="font-display text-3xl text-[var(--gf-text)]">8+</span>
            <p className="overline mt-1">Years of craft</p>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-6 flex flex-col gap-8 pt-8 lg:pt-0">
          <div>
            <span className="overline">Our Story</span>
            <h2
              data-testid="about-title"
              className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-[var(--gf-text)] mt-4 leading-[1.05]"
            >
              A small studio
              <br />
              with a <em className="italic text-[var(--gf-accent)]">cinematic</em> soul.
            </h2>
          </div>

          <div className="space-y-5 text-[var(--gf-text-soft)] text-base md:text-lg font-light leading-relaxed">
            <p>
              Gera Films was started in 2017 with a single belief — that a
              wedding is not a production line but a private cinema. Every
              couple, every family, every ritual deserves a film that feels
              unmistakably theirs.
            </p>
            <p>
              Today we're a tight-knit team of photographers, cinematographers,
              drone pilots and editors. We shoot fewer weddings a year, on
              purpose — so every film gets the attention of a feature.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--gf-border)]">
            <div>
              <span className="font-display text-3xl text-[var(--gf-text)]">400+</span>
              <p className="overline mt-1">Weddings shot</p>
            </div>
            <div>
              <span className="font-display text-3xl text-[var(--gf-text)]">50+</span>
              <p className="overline mt-1">Cities covered</p>
            </div>
            <div>
              <span className="font-display text-3xl text-[var(--gf-text)]">98%</span>
              <p className="overline mt-1">Referrals</p>
            </div>
          </div>

          <a href="#contact" className="gf-btn-primary w-fit">
            Book a Shoot
          </a>
        </div>
      </div>
    </section>
  );
}
