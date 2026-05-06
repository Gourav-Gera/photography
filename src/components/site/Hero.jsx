import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const easing = [0.16, 1, 0.3, 1];

export default function Hero() {
    return (
        <section
            id="top"
    data-testid="hero-section"
    className="relative min-h-screen w-full pt-24 pb-16 overflow-hidden"
        >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end min-h-[calc(100vh-6rem)]">
    {/* Image — left dominant */ }
    <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: easing }}
        className="lg:col-span-7 relative order-2 lg:order-1"
            >
            <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden grain">
                <img
    src="https://images.pexels.com/photos/19613670/pexels-photo-19613670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
    alt="Elegant Indian wedding couple portrait"
    className="w-full h-full object-cover"
    data-testid="hero-image"
        />
          </div>
        <div className="absolute -bottom-4 -left-4 hidden lg:flex flex-col gap-1 bg-[#FDFBF7] px-6 py-4 border border-[#E8E3DA]">
            <span className="overline">Est.</span>
                <span className="font-display text-3xl text-[#2C2A29]">2017</span>
          </div>
        </motion.div>

        {/* Typography — right */ }
        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-8">
            <motion.span
    initial={{ opacity: 0, y: 12 }
}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: easing }}
className="overline"
data-testid="hero-overline"
    >
    Wedding & Cinematic Studio
          </motion.span>

    <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easing, delay: 0.1 }}
        className="font-display font-light text-[#2C2A29] text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
data-testid="hero-title"
    >
    Love stories,
        <br />
told in <em className="italic text-[#C88775]">light</em>
    <br />
    and frame.
          </motion.h1>

    <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easing, delay: 0.25 }}
        className="text-[#595553] text-base md:text-lg leading-relaxed max-w-md font-light"
data-testid="hero-description"
    >
    Gera Films crafts heirloom photographs and cinematic films for
            weddings, pre-weddings, birthdays, and destination celebrations —
            across India and beyond.
          </motion.p>

    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easing, delay: 0.4 }}
        className="flex flex-wrap items-center gap-4"
            >
            <a href="#contact" className="gf-btn-primary" data-testid="hero-book-btn">
              Book a Shoot <ArrowRight size={ 14} />
            </a>
    <a
        href="#portfolio"
className="gf-btn-secondary"
data-testid="hero-portfolio-btn"
    >
    View Portfolio
            </a>
          </motion.div>

    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="flex items-center gap-8 pt-4 border-t border-[#E8E3DA] mt-4"
data-testid="hero-stats"
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

const Stat = ({ value, label }) => (
    <div className="flex flex-col">
        <span className="font-display text-2xl md:text-3xl text-[#2C2A29]">
{ value }
    </span>
    <span className="overline mt-1">{label}</span>
  </div>
);
