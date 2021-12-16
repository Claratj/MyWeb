import React, { useEffect } from "react";

import { motion, useAnimation } from "framer-motion";

import { Header } from "../../core/Header/Header";
import Hero from "../Hero/Hero";
import { WebDevelopment } from "../WebDevelopment/WebDevelopment";
import { Creative } from "../Creative/Creative";
import { About } from "../About/About";
import { Footer } from "../../core/Footer/Footer";
import { useInView } from "react-intersection-observer";

export function Home() {
  // const { inView, ref } = useInView();
  // const animationControl = useAnimation();

  // console.log(inView);

  // useEffect(() => {
  //   if (inView) {
  //     animationControl.start({ x: 0, transition: { delay: 0.7 } });
  //   }
  //   animationControl.set({ x: "-100vw", transition: { delay: 0.3 } });
  // }, [inView]);

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
    <motion.div variants={variants} initial="hidden" animate="visible">
      <Header />
      <main>
        <section>
          <Hero />
        </section>
        <section id="about" className="home-section">
          <About />
        </section>
        <section className="home-section" id="web">
          <WebDevelopment />
        </section>
        <section className="home-section" id="creative">
          <Creative />
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
