import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingCTA() {
    const phone="919876543210"; // placeholder — replace with real
    const text = encodeURIComponent(
    "Hi Gera Films! I'd like to enquire about a shoot."
  );
    return (
        <a
            href={`https://wa.me/${phone}?text=${text}`}
            target="_blank"
    rel="noreferrer"
    data-testid="floating-whatsapp"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
        >
        <MessageCircle size={22} />
    </a>
  );
}
