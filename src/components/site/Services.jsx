import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
    {
        number: "01",
    id: "wedding-photography",
    title: "Wedding Photography",
    desc: "Full-day coverage crafted like a timeless photo essay.",
    img: "https://images.pexels.com/photos/8621982/pexels-photo-8621982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
    {
        number: "02",
    id: "pre-wedding-shoots",
    title: "Pre-Wedding Shoots",
    desc: "Cinematic portraits that hold the spark of the very first look.",
    img: "https://images.unsplash.com/photo-1722952934661-dde241aeb591?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY291cGxlfGVufDB8fHx8MTc3Njk1Mzk1MXww&ixlib=rb-4.1.0&q=85",
  },
    {
        number: "03",
    id: "cinematic-films",
    title: "Cinematic Films",
    desc: "Long-form wedding films edited like a feature — rhythm, score, soul.",
    img: "https://images.pexels.com/photos/34607172/pexels-photo-34607172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
    {
        number: "04",
    id: "drone-cinematography",
    title: "Drone Cinematography",
    desc: "Sweeping aerials that give your day a sense of landscape and scale.",
    img: "https://images.pexels.com/photos/31841629/pexels-photo-31841629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
    {
        number: "05",
    id: "destination-weddings",
    title: "Destination Weddings",
    desc: "Goa, Udaipur, Jaipur or abroad — we travel with your story.",
    img: "https://images.pexels.com/photos/20681078/pexels-photo-20681078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
    {
        number: "06",
    id: "birthdays-functions",
    title: "Birthdays & Functions",
    desc: "Roka, engagement, cake-smash, milestone birthdays — joy on film.",
    img: "https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];


export default function Services() {
    const [active, setActive] = useState(0);

    return (
        <section
            id="services"
    data-testid="services-section"
    className="py-24 md:py-32 lg:py-40 bg-[var(--gf-bg)] transition-colors duration-500"
        >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20 items-end">
                <div className="lg:col-span-7">
                    <span className="overline">What We Craft</span>
                        <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-[var(--gf-text)] mt-4 leading-[1.05]">
              A studio for the
        <br />
        <em className="italic text-[var(--gf-accent)]">once-in-a-lifetime</em>
              moments.
            </h2>
          </div>
        <p className="lg:col-span-4 text-[var(--gf-text-soft)] text-base md:text-lg leading-relaxed font-light">
            From the intimate roka at home to a week of destination rituals — we
            work across six disciplines, each with the same obsessive eye for
            composition, colour, and feeling.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Editorial list */}
          <ul className="lg:col-span-7 divide-y divide-[var(--gf-border)] border-y border-[var(--gf-border)]">
            {services.map((s, i) => (
              <li
                key={s.number}
                onMouseEnter={() => setActive(i)}
                data-testid={`service-item-${i}`}
                className={`group transition-colors ${
                  active === i ? "text-[var(--gf-text)]" : "text-[var(--gf-text-soft)]"
                }`}
              >
                <Link
                  to={`/service/${s.id}`}
                  className="grid grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center py-8 md:py-10"
                >
                  <span className="overline text-[var(--gf-accent)]">{s.number}</span>
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-none transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base font-light hidden md:block">
                      {s.desc}
                    </p>
                  </div>
                  <span
                    className={`overline transition-all ${
                      active === i
                        ? "text-[var(--gf-accent)] translate-x-0"
                        : "opacity-0 -translate-x-2"
                    }`}
                  >
                    View →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Preview panel */}
          <div className="lg:col-span-5 hidden lg:block sticky top-28 self-start">
            <Link to={`/service/${services[active].id}`}>
              <motion.div
                key={services[active].img}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] w-full overflow-hidden"
              >

              <img
                src={services[active].img}
                alt={services[active].title}
                className="w-full h-full object-cover"
                data-testid="service-preview-image"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent text-white">
                <span className="overline" style={{ color: "var(--gf-bg)" }}>
                  {services[active].number}
                </span>
                <h4 className="font-display text-2xl mt-1">{services[active].title}</h4>
              </div>
            </motion.div>
          </Link>
          </div>
        </div>
      </div>
    </section>

  );
}
