import React from "react";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import Portfolio from "@/components/site/Portfolio";
import Films from "@/components/site/Films";
import About from "@/components/site/About";
import Pricing from "@/components/site/Pricing";
import Testimonials from "@/components/site/Testimonials";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingCTA from "@/components/site/FloatingCTA";

export default function Home() {
    return (
        <main data-testid="home-page">
            <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Films />
      <About />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
