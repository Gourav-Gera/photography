import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
"All",
"Wedding",
"Pre-Wedding",
"Cinematic",
"Drone",
"Destination",
"Birthdays & Roka",
];

const work = [
  {
    cat: "Wedding",
    img: "https://images.pexels.com/photos/8621982/pexels-photo-8621982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700",
    title: "Riya & Arjun",
    place: "Udaipur",
  },
  {
    cat: "Pre-Wedding",
    img: "https://images.unsplash.com/photo-1722952934661-dde241aeb591?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY291cGxlfGVufDB8fHx8MTc3Njk1Mzk1MXww&ixlib=rb-4.1.0&q=85",
    title: "Meher & Aadi",
    place: "Jaipur",
  },
  {
    cat: "Cinematic",
    img: "https://images.pexels.com/photos/34607172/pexels-photo-34607172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700",
    title: "Golden Hour",
    place: "Delhi",
  },
  {
    cat: "Drone",
    img: "https://images.pexels.com/photos/31841629/pexels-photo-31841629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=700",
    title: "Sky of Manali",
    place: "Himachal",
  },
  {
    cat: "Destination",
    img: "https://images.pexels.com/photos/20681078/pexels-photo-20681078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700",
    title: "By The Sea",
    place: "Goa",
  },
  {
    cat: "Birthdays & Roka",
    img: "https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=700",
    title: "First Year",
    place: "Mumbai",
  },
  {
    cat: "Wedding",
    img: "https://images.pexels.com/photos/9801096/pexels-photo-9801096.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700",
    title: "Sonu & Preet",
    place: "Amritsar",
  },
  {
    cat: "Drone",
    img: "https://images.unsplash.com/photo-1669307502695-d1487616609e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHBob3RvZ3JhcGh5JTIwbGFuZHNjYXBlfGVufDB8fHx8MTc3Njk1Mzk1MXww&ixlib=rb-4.1.0&q=85",
    title: "Above Goa",
    place: "Aerial",
  },
  {
    cat: "Cinematic",
    img: "https://images.pexels.com/photos/20681078/pexels-photo-20681078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700",
    title: "Mehendi Light",
    place: "Jaipur",
  },
];

export default function Portfolio() {
    const [filter, setFilter] = useState("All");
  const items = useMemo(
        () => (filter === "All" ? work : work.filter((w) => w.cat === filter)),
    [filter]
    );

    return (
        <section
            id="portfolio"
    data-testid="portfolio-section"
    className="py-24 md:py-32 lg:py-40 bg-[var(--gf-surface)] transition-colors duration-500"
        >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
                <div >
                <span className="overline">Selected Work</span>
                    <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-[var(--gf-text)] mt-3 leading-[1.05]">
    The <em className="italic text-[var(--gf-accent)]">archive</em>
            </h2>
          </div>
        <p className="text-[var(--gf-text-soft)] max-w-md font-light">
            A curated glimpse from weddings, pre-weddings, and cinematic shoots
            we've been trusted with.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 border-b border-[var(--gf-border)] pb-4" data-testid="portfolio-filters">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`filter-${c.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className="relative py-2 group"
            >
              <span className={`text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                filter === c ? "text-[var(--gf-accent)]" : "text-[var(--gf-text-soft)] group-hover:text-[var(--gf-text)]"
              }`}>
                {c}
              </span>
              {filter === c && (
                <motion.div
                  layoutId="active-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gf-accent)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                <AnimatePresence mode="popLayout">
    {
            items.map((item, i) => (
            <motion.figure
                layout
                key={`${item.title}-${item.cat}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden aspect-[3/4]"
                data-testid={`portfolio-item-${i}`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-7 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-white">
                  <span className="overline" style={{ color: "var(--gf-bg)" }}>
                    {item.cat}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl mt-1">
                    {item.title}
                  </h3>
                  <span className="text-sm font-light opacity-80">{item.place}</span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
