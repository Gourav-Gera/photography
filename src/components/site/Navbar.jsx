import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
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
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark" || !theme) {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    return (
        <header
            data-testid="main-nav"
    className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-[var(--gf-bg)]/95 backdrop-blur-md border-b border-[var(--gf-border)]"
            : "bg-transparent"
} `}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <Link
          to="/"
          data-testid="brand-logo"
          className="flex items-baseline gap-2"
        >
          <span className="font-display text-2xl md:text-3xl tracking-tight text-[var(--gf-text)]">
            Gera
          </span>
          <span className="font-display italic text-2xl md:text-3xl text-[var(--gf-accent)]">
            Films
          </span>
        </Link>


        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav - ${ l.label.toLowerCase() } `}
              className="text-[11px] uppercase tracking-[0.22em] text-[var(--gf-text-soft)] hover:text-[var(--gf-accent)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
            <button
                onClick={toggleTheme}
                className="p-2 text-[var(--gf-text-soft)] hover:text-[var(--gf-text)] transition-colors"
                aria-label="Toggle theme"
            >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
            href="#contact"
            data-testid="nav-book-cta"
            className="gf-btn-primary"
            style={{ padding: "0.75rem 1.5rem" }}
            >
            Book a Shoot
            </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
            <button
                onClick={toggleTheme}
                className="p-2 text-[var(--gf-text-soft)] hover:text-[var(--gf-text)] transition-colors"
                aria-label="Toggle theme"
            >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="p-2 text-[var(--gf-text)]"
            aria-label="Menu"
            >
            {open ? <X size={22} /> : <Menu size={22} />}
            </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[var(--gf-bg)] border-t border-[var(--gf-border)] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav - ${ l.label.toLowerCase() } `}
                  className="text-sm uppercase tracking-[0.22em] text-[var(--gf-text-soft)]"
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
