import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--gf-bg)]"
    >
      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* ── Left: Full-bleed image ── */}
        <motion.div
          className="relative order-2 lg:order-1 min-h-[50vh] lg:min-h-screen overflow-hidden"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease }}
        >
          <img
            src="https://images.pexels.com/photos/19613670/pexels-photo-19613670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
            alt="Elegant Indian wedding couple portrait"
            className="absolute inset-0 w-full h-full object-cover"
            data-testid="hero-image"
          />
          {/* Top gradient — keeps navbar logo readable over any photo */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/65 to-transparent pointer-events-none" />
          {/* Right-edge vignette to blend into dark content panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 hidden lg:block pointer-events-none" />

          {/* Est. badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="absolute bottom-8 left-8 bg-[var(--gf-bg)]/90 backdrop-blur-sm px-5 py-3 border border-[var(--gf-border)]"
          >
            <span className="overline block">Est.</span>
            <span className="font-display text-2xl text-[var(--gf-text)] leading-none">2017</span>
          </motion.div>
        </motion.div>

        {/* ── Right: Content ── */}
        <div className="order-1 lg:order-2 flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 pt-32 pb-16 lg:pt-0 lg:pb-0">
          <motion.span
            className="overline"
            data-testid="hero-overline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            Wedding &amp; Cinematic Studio
          </motion.span>

          <motion.h1
            className="font-display font-light text-[var(--gf-text)] text-5xl md:text-6xl xl:text-7xl leading-[1.0] tracking-tight mt-5"
            data-testid="hero-title"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.12 }}
          >
            Love stories,
            <br />
            told in{" "}
            <em className="italic text-[var(--gf-accent)]">light</em>
            <br />
            and frame.
          </motion.h1>

          <motion.p
            className="mt-7 text-[var(--gf-text-soft)] text-base md:text-lg leading-relaxed font-light max-w-sm"
            data-testid="hero-description"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.26 }}
          >
            Gera Films crafts heirloom photographs and cinematic films for
            weddings, pre-weddings, birthdays, and destination celebrations —
            across India and beyond.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
          >
            <a href="#contact" className="gf-btn-primary" data-testid="hero-book-btn">
              Book a Shoot <ArrowRight size={14} />
            </a>
            <a href="#portfolio" className="gf-btn-secondary" data-testid="hero-portfolio-btn">
              View Portfolio
            </a>
          </motion.div>

          <motion.div
            className="mt-12 flex items-center gap-10 pt-8 border-t border-[var(--gf-border)]"
            data-testid="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <Stat value="400+" label="Weddings" />
            <Stat value="8 Yrs" label="Experience" />
            <Stat value="50+" label="Cities" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-2xl md:text-3xl text-[var(--gf-text)]">
        {value}
      </span>
      <span className="overline">{label}</span>
    </div>
  );
}
