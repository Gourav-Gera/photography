import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
    {
        q: "They don't just capture weddings, they capture the feeling of the people you love. Our album gives us goosebumps every time.",
    name: "Ritika & Shaan",
    loc: "Udaipur Wedding",
  },
    {
        q: "Gera Films turned our pre-wedding into a short film we show everyone. Quietly perfect at everything — lighting, editing, the pace of it all.",
    name: "Meher & Aadi",
    loc: "Jaipur Pre-Wedding",
  },
    {
        q: "The drone work and the cinematic highlight are next level. Worth every rupee. They felt like family by day two.",
    name: "The Kapoors",
    loc: "Goa Destination",
  },
    {
        q: "Roka was tiny, just 30 guests — but the photos feel like a magazine shoot. Everyone in the family asks who shot it.",
    name: "Simran Gill",
    loc: "Delhi Roka",
  },
];

export default function Testimonials() {
    const [i, setI] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
        return () => clearInterval(t);
    }, []);

    const item = testimonials[i];

    return (
        <section
            data-testid="testimonials-section"
    className="py-24 md:py-32 lg:py-40 bg-[#F5F2EB]"
        >
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
            <span className="overline">Kind Words</span>
                <Quote
    size={ 44}
    className="mx-auto mt-8 text-[#C88775]"
    strokeWidth={ 1}
        />
        <blockquote
            key={item.q}
            data-testid="testimonial-quote"
    className="font-display italic text-3xl md:text-4xl lg:text-5xl font-light text-[#2C2A29] mt-8 leading-[1.15]"
        >
    "{item.q}"
        </blockquote>
        <div className="mt-10">
            <p className="font-display text-2xl text-[#2C2A29]">{item.name}</p>
                <p className="overline mt-1">{item.loc}</p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-2" data-testid="testimonial-dots">
    {
        testimonials.map((_, idx) => (
            <button
                key={idx}
                onClick={() => setI(idx)}
                data-testid={`testimonial-dot-${idx}`}
                aria-label={`Show testimonial ${idx + 1}`}
                className={`h-[2px] transition-all ${idx === i ?"w-10 bg-[#2C2A29]" : "w-5 bg-[#C88775]/40"
              } `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
