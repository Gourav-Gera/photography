import React from "react";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 md:py-32 lg:py-40 bg-[#F5F2EB]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1 relative">
          <div className="aspect-[4/5] overflow-hidden grain">
            <img
              src="/films/images/masoori-prewedding.png"
              alt="Gera Films studio"
              className="w-full h-full object-cover"
              data-testid="about-image"
            />
          </div>
          <div className="hidden md:block absolute -right-8 top-10 bg-[#FDFBF7] px-8 py-6 border border-[#E8E3DA] max-w-[230px]">
            <span className="overline">A Note</span>
            <p className="font-display italic text-xl text-[#2C2A29] mt-2 leading-snug">
              "We don't shoot events. We listen to stories and quietly record
              the way they're felt."
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <span className="overline">Our Story</span>
          <h2
            data-testid="about-title"
            className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-[#2C2A29] mt-4 leading-[1.05]"
          >
            A small studio
            <br />
            with a <em className="italic text-[#C88775]">cinematic</em> soul.
          </h2>
          <div className="mt-8 space-y-5 text-[#595553] text-base md:text-lg font-light leading-relaxed">
            <p >
              Gera Films was started in 2017 with a single belief — that a
              wedding is not a production line but a private cinema.Every
              couple, every family, every ritual deserves a film that feels
              unmistakably theirs.
            </p>
            <p>
              Today we're a tight-knit team of photographers, cinematographers,
              drone pilots and editors. We shoot fewer weddings a year, on
              purpose — so every film gets the attention of a feature.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-[#E8E3DA]">
            <div >
              <span className="font-display text-3xl text-[#2C2A29]">400+</span>
              <p className="overline mt-1">Weddings shot</p>
            </div>
            <div>
              <span className="font-display text-3xl text-[#2C2A29]">50+</span>
              <p className="overline mt-1">Cities covered</p>
            </div>
            <div>
              <span className="font-display text-3xl text-[#2C2A29]">98%</span>
              <p className="overline mt-1">Referrals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
