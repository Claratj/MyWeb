import React, { useEffect } from "react";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import img from "../../assets/img/foto-linkedin.jpg";
import Button from "../../shared/Button/Button";

import "./About.scss";

export function About() {
  const controls = useAnimation();

  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, transition: { delay: 0.7 } });
    }
    controls.set({ x: "-100vw", transition: { delay: 0.3 } });
  }, [inView]);

  //   No está funcionando quotes:
  //   const { ref, inView } = useInView({
  //     triggerOnce: false,
  //     rootMargin: "-100px 0px",
  //   });
  //   const quotes = {
  //     hidden: {
  //       x: "-100vw",
  //     },
  //     visible: {
  //       x: 0,
  //       transition: {
  //         duration: 1.5,
  //         type: "spring",
  //         stiffness: 120,
  //       },
  //     },
  //   };
  //   useEffect(() => {
  //     if (inView) {
  //       controls.start("visible");
  //     } else if (!inView) {
  //       controls.start("hidden");
  //     }
  //   }, [controls, inView]);

  return (
    <div className="main" ref={ref}>
      <motion.div
        initial={{
          x: "100vw",
        }}
        animate={controls}
      >
        <motion.div className="main-about">
          <span className="icon-quote-left" />

          <figure className="about-figure">
            <div className="about-figure-img_container">
              <img src={img} alt="About me portrait" />
            </div>
            <h2 className="about-figure_txt">
              <span className="">Hi!</span>
              <br />
              <span className="">I'm Clara</span>{" "}
            </h2>
          </figure>
          <div className="about-description">
            <p>
              Based in Madrid, I'm a Web Developer focused on Front-end
              technologies.
            </p>
            <p>
              I don't know if I found coding or coding found me. I started my
              career in Graphic Design but I soon realised that the new
              platforms were not going to be in ink and paper. I found in Web
              Development a field of infinite possibilities where the technical
              base is complemented with creativity and good practices.
            </p>
            <p>
              My previous experience has been very useful tool when approaching
              any project, since I take into account the technical approach to
              development together with the user experience point of view.
            </p>
          </div>
          <span className="icon-quote-right" />
        </motion.div>
        <Button text={"CV Download"} />
      </motion.div>
    </div>
  );
}
