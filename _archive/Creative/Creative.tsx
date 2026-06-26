import React, { useEffect } from "react";

import "./Creative.scss";
import DisplayIntro from "./components/DisplayIntro";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function Creative() {
  const controlContainer = useAnimation();
  const { inView, ref } = useInView();

  useEffect(() => {
    inView
      ? controlContainer.start({
          x: 0,
          transition: { delay: 0.7, delayChildren: 1 },
        })
      : controlContainer.set({ x: "-100vw", transition: { delay: 0.3 } });
  }, [inView]);
  return (
    <div ref={ref}>
      <motion.div
        initial={{
          x: "-1000vw",
        }}
        animate={controlContainer}
        className="main"
      >
        <h2 className="section-title">Creative</h2>
        <h3 className="section-subtitle">Technologies I work with</h3>
        <section className="technologies">
          <div>
            <span>Photoshop |</span>
            <span> Illustrator |</span>
            <span> InDesign |</span>
            <span> Premiere Pro </span>
          </div>
        </section>
        <section className="porfolio-creative">
          <DisplayIntro value="photo" />
          <DisplayIntro value="design" />
        </section>
      </motion.div>
    </div>
  );
}
