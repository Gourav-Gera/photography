import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const links = [
  { label: "Work", href: "/#portfolio" },
  { label: "Services", href: "/#services" },
  { label: "Films", href: "/#films" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    return (
        <header
            data-testid="main-nav"
    className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
            ?"bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8E3DA]/60"
          : "bg-transparent"
} `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <Link
          to="/"
          data-testid="brand-logo"
          className="flex items-baseline gap-2"
        >
          <span className="font-display text-2xl md:text-3xl tracking-tight text-[#2C2A29]">
            Gera
          </span>
          <span className="font-display italic text-2xl md:text-3xl text-[#C88775]">
            Films
          </span>
        </Link>


        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav - ${ l.label.toLowerCase() } `}
              className="text-[11px] uppercase tracking-[0.22em] text-[#595553] hover:text-[#C88775] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-testid="nav-book-cta"
          className="hidden md:inline-flex gf-btn-primary"
          style={{ padding: "0.75rem 1.5rem" }}
        >
          Book a Shoot
        </a>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#2C2A29]"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#FDFBF7] border-t border-[#E8E3DA] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav - ${ l.label.toLowerCase() } `}
                  className="text-sm uppercase tracking-[0.22em] text-[#595553]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                data-testid="mobile-book-cta"
                className="gf-btn-primary mt-2"
              >
                Book a Shoot
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
