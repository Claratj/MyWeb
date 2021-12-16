import React, { useEffect } from "react";

import { motion, useAnimation } from "framer-motion";

import "./Footer.scss";
import { useInView } from "react-intersection-observer";

export function Footer() {
  const controlContainer = useAnimation();
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      controlContainer.start({
        opacity: 1,
        transition: { delay: 0.5, delayChildren: 1 },
      });
    }
    controlContainer.set({ opacity: 0, transition: { delay: 0.3 } });
  }, [inView]);

  return (
    <div ref={ref}>
      <motion.footer
        initial={{
          opacity: 0,
        }}
        animate={controlContainer}
      >
        <nav className="rrss">
          <a href="https://twitter.com/cofclarividence">
            <span className="icon-twitter" />
          </a>
          <a href="https://gitlab.com/Claratj">
            <span className="icon-git" />
          </a>
          <a href="https://www.linkedin.com/in/claratoloba">
            <span className="icon-in" />
          </a>
          <a href="mailto:clara@claratoloba.com">
            <span className="icon-paper-plane" />
          </a>
        </nav>
        <p className="">
          Made by Clara <span className="icon-copy" /> 2021
        </p>
      </motion.footer>
    </div>
  );
}
