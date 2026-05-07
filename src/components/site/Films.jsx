import React, { useState } from "react";
import { Play, X, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Poster images live in: public/films/images/ ────────────────────────────
// Update the poster paths below whenever you add a new image.
const films = [
  {
    title: "Rishikesh Pre Wedding Shoot",
    place: "Rishikesh · 2025",
    poster: "/films/images/masoori-prewedding.png",
    videoUrl: "https://www.youtube.com/embed/UHYDYLc3YJo",
  },
  {
    title: "Wedding Night",
    place: "Ladwa · 2021",
    poster: "/films/images/ladwa-marriage.webp",
    videoUrl: "https://www.youtube.com/embed/YWh9f-_Kx5Q",
  },
  {
    title: "First Year",
    place: "Birthday · 2023",
    poster: "/films/images/birthday-shoot.webp",
    videoUrl: "https://www.youtube.com/embed/SALrYwaAZRw",
  },
];

export default function Films() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section id="films" data-testid="films-section" className="py-24 md:py-32 lg:py-40 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <span className="overline">Reels & Films</span>
            <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-[#2C2A29] mt-3 leading-[1.05]">
              Moving <em className="italic text-[#C88775]">pictures</em>.
            </h2>
          </div>
          <p className="text-[#595553] max-w-md font-light">
            Our films are edited like short cinema — paced to feeling, scored with care, and built to be re-watched on every anniversary.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {films.map((f, i) => (
            <button
              key={f.title}
              onClick={() => setSelectedVideo(f)}
              data-testid={`film-card-${i}`}
              className="group relative block aspect-[4/5] overflow-hidden text-left"
            >
              <img
                src={f.poster}
                alt={f.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#FDFBF7]/90 text-[#2C2A29] group-hover:bg-[#C88775] group-hover:text-white transition-all">
                  <Play fill="currentColor" size={20} />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="overline" style={{ color: "#FDFBF7" }}>{f.place}</span>
                <h3 className="font-display text-2xl mt-1">{f.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2C2A29]/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#C88775] transition-colors"
                aria-label="Close modal"
              >
                <X size={32} />
              </button>

              <iframe
                src={`${selectedVideo.videoUrl}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>

        )}
      </AnimatePresence>
    </section>
  );
}

