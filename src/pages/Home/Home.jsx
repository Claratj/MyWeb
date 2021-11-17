import React, { useEffect } from "react";

import { motion } from "framer-motion";
import AOS from "aos";

import Hero from "../Hero/Hero";
import { WebDevelopment } from "../WebDevelopment/WebDevelopment";
import { Creative } from "../Creative/Creative";
import { About } from "../About/About";

import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
    });
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.3,
      },
      exit: {
        y: "-100vh",
        transition: {
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <main>
      <motion.section variants={variants} initial="hidden" animate="visible">
        <Hero />
      </motion.section>
      <section className="home-section" data-aos="zoom-out-up" id="about">
        <About />
      </section>
      <section className="home-section" data-aos="zoom-in-up" id="web">
        <WebDevelopment />
      </section>
      <section className="home-section" data-aos="zoom-in-down" id="creative">
        <Creative />
      </section>
    </main>
  );
}
