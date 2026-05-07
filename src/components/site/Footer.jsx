import React from "react";
import { Instagram, Youtube, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer
            data-testid="footer"
    className="bg-[#2C2A29] text-[#FDFBF7] pt-20 pb-10"
        >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
                <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl">Gera</span>
                        <span className="font-display italic text-3xl text-[#C88775]">
    Films
            </span>
          </div>
        <p className="mt-5 text-[#FDFBF7]/70 max-w-sm font-light leading-relaxed">
            A small wedding & cinematic studio from India, shooting love
            stories across the country and beyond since 2017.
          </p>
        </div>

        <div className="md:col-span-3">
            <span className="overline" style={{ color: "#C88775" }}>
    Explore
          </span>
        <ul className="mt-5 space-y-3">
    {
        ["Work", "Services", "Films", "About", "Pricing", "Contact"].map(
            (l) => (
            <li key={l}>
                <a
                    href={`#${l.toLowerCase()}`}
                    data-testid={`footer-link-${l.toLowerCase()}`}
                    className="text-[#FDFBF7]/70 hover:text-[#C88775] text-sm transition-colors"
                  >
                {l}
            </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="md:col-span-4">
            <span className="overline" style={{ color: "#C88775" }}>
    Studio
          </span>
        <ul className="mt-5 space-y-3 text-[#FDFBF7]/80 text-sm font-light">
            <li className="flex items-center gap-3">
                <Phone size={ 14} /> +91 7206875837
            </li>
        <li className="flex items-center gap-3">
            <Mail size={ 14} /> geraphotography5@gmail.com
            </li>
        <li>12, Indri Road, Ladwa, Haryana 132041</li>
          </ul>
        <div className="flex items-center gap-4 mt-6">
            <a
            href="https://www.instagram.com/gera_films_ladwa/"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-instagram"
            className="w-10 h-10 flex items-center justify-center border border-[#FDFBF7]/30 hover:bg-[#C88775] hover:border-[#C88775] transition-colors"
        >
        <Instagram size={16} />
            </a>
        <a
            href="https://www.youtube.com/@pankajgeraphotography1934"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-youtube"
            className="w-10 h-10 flex items-center justify-center border border-[#FDFBF7]/30 hover:bg-[#C88775] hover:border-[#C88775] transition-colors"
        >
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-6 border-t border-[#FDFBF7]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#FDFBF7]/50">
            <span >© { new Date().getFullYear() } Gera Films.All rights reserved.</span>
                <span className="overline" style={{ color: "#C88775" }}>
          Crafted with care
        </span>
      </div>
    </footer>
  );
}
