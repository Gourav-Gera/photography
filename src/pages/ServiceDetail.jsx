import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Contact from "@/components/site/Contact";
import FloatingCTA from "@/components/site/FloatingCTA";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const servicesData = {
  "wedding-photography": {
    title: "Wedding Photography",
    desc: "Full-day coverage crafted like a timeless photo essay. We focus on the raw emotions, the stolen glances, and the grand rituals that define your union.",
    images: [
      "https://images.pexels.com/photos/8621982/pexels-photo-8621982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920",
      "https://images.pexels.com/photos/19613670/pexels-photo-19613670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920",
      "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
    ]
  },
  "pre-wedding-shoots": {
    title: "Pre-Wedding Shoots",
    desc: "Cinematic portraits that hold the spark of the very first look. A day for just the two of you, away from the hustle of the wedding days.",
    images: [
      "https://images.unsplash.com/photo-1722952934661-dde241aeb591?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920",
      "https://images.pexels.com/photos/19613671/pexels-photo-19613671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
    ]
  },
  "cinematic-films": {
    title: "Cinematic Films",
    desc: "Long-form wedding films edited like a feature — rhythm, score, soul. We capture sound, movement, and the voices that matter.",
    images: [
      "https://images.pexels.com/photos/34607172/pexels-photo-34607172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
    ]
  },
  "drone-cinematography": {
    title: "Drone Cinematography",
    desc: "Sweeping aerials that give your day a sense of landscape and scale. Perfect for destination weddings and grand outdoor venues.",
    images: [
      "https://images.pexels.com/photos/31841629/pexels-photo-31841629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
    ]
  },
  "destination-weddings": {
    title: "Destination Weddings",
    desc: "Goa, Udaipur, Jaipur or abroad — we travel with your story. Specializing in multi-day cross-cultural unions.",
    images: [
      "https://images.pexels.com/photos/20681078/pexels-photo-20681078.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
    ]
  },
  "birthdays-functions": {
    title: "Birthdays & Functions",
    desc: "Roka, engagement, cake-smash, milestone birthdays — joy on film. Every small celebration deserves big memories.",
    images: [
      "https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920"
    ]
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = servicesData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--gf-bg)] transition-colors duration-500">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Service not found</h1>
          <Link to="/" className="gf-btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[var(--gf-bg)] transition-colors duration-500">
      <Navbar />
      
      {/* Detail Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 overline text-[var(--gf-accent)] hover:gap-4 transition-all mb-8">
          <ArrowLeft size={14} /> Back to studio
        </Link>
        
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="overline">Our Expertise</span>
            <h1 className="font-display font-light text-5xl md:text-6xl lg:text-8xl text-[var(--gf-text)] mt-4 leading-[1.05]">
              {service.title.split(' ')[0]} <em className="italic text-[var(--gf-accent)]">{service.title.split(' ').slice(1).join(' ')}</em>
            </h1>
          </div>
          <p className="lg:col-span-4 text-[var(--gf-text-soft)] text-lg font-light leading-relaxed">
            {service.desc}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {service.images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden ${idx === 0 && service.images.length > 1 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'}`}
            >
              <img src={img} alt={`${service.title} ${idx + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
