import React, { useState, useEffect, useCallback } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % films.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + films.length) % films.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      id="films"
      data-testid="films-section"
      className="py-24 md:py-32 lg:py-40 bg-[var(--gf-bg)] transition-colors duration-500"
    >
      {/* Section header — inside the standard container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <span className="overline">Reels &amp; Films</span>
            <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-[var(--gf-text)] mt-3 leading-[1.05]">
              Moving <em className="italic text-[var(--gf-accent)]">pictures</em>.
            </h2>
          </div>
          <p className="text-[var(--gf-text-soft)] max-w-md font-light">
            Our films are edited like short cinema — paced to feeling, scored
            with care, and built to be re-watched on every anniversary.
          </p>
        </div>
      </div>

      {/* Carousel + indicators — inside the standard container to match other sections */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {[...films, ...films, ...films].map((f, i) => (
              <div key={i} className="w-full md:w-1/3 flex-shrink-0 px-2">
                <div
                  onClick={() => setSelectedVideo(f)}
                  className="group relative aspect-[4/5] overflow-hidden cursor-pointer grain"
                >
                  <img
                    src={f.poster}
                    alt={f.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-black">
                      <Play fill="currentColor" size={20} />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="overline text-[var(--gf-bg)] tracking-[0.2em]">{f.place}</span>
                    <h3 className="font-display text-2xl md:text-3xl text-white mt-2 leading-tight">
                      {f.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-2">
            <button
              onClick={prevSlide}
              className="p-4 text-white/60 hover:text-white transition-colors pointer-events-auto bg-black/20 backdrop-blur-sm hover:bg-black/40"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button
              onClick={nextSlide}
              className="p-4 text-white/60 hover:text-white transition-colors pointer-events-auto bg-black/20 backdrop-blur-sm hover:bg-black/40"
              aria-label="Next slide"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {films.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-[2px] transition-all duration-500 ${
                currentIndex === i
                  ? "w-12 bg-[var(--gf-accent)]"
                  : "w-6 bg-[var(--gf-border)]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
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
                className="absolute -top-12 right-0 text-white hover:text-[var(--gf-accent)] transition-colors"
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
