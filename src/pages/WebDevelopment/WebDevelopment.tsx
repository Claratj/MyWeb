import React, { useState, useEffect } from "react";
import { ProjectList } from "../../shared/ProjectList/ProjectList";

import Button from "../../shared/Button/Button";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export function WebDevelopment() {
  const { inView, ref } = useInView();
  const controlContainer = useAnimation();

  useEffect(() => {
    inView
      ? controlContainer.start({
          x: 0,
          transition: { delay: 0.7 },
        })
      : controlContainer.set({ x: "100vw", transition: { delay: 0.3 } });
  }, [inView]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ x: "-100vw" }}
        animate={controlContainer}
        className="main"
      >
        <h2 className="section-title">Web Development</h2>
        <h3 className="section-subtitle">
          Technologies I have worked with or I am working
        </h3>
        <section className="technologies">
          <div>
            <span>HTML |</span>
            <span> Css3 |</span>
            <span> SaSS |</span>
            <span> TailwindCss |</span>
            <span> Bootstrap</span>
          </div>
          <div>
            <span>Javascript |</span>
            <span> Angular |</span>
            <span> React |</span>
            <span> Vue |</span>
            <span> Nuxt |</span>
            <span> servicios API </span>
          </div>
          <div>
            <span> PHP |</span>
            <span> NodeJS |</span>
            <span> Symfony |</span>
            <span> MongoDB |</span>
            <span> MySQL |</span>
          </div>
          <div>
            <span> Git |</span>
            <span> GitLab |</span>
            <span> Jira |</span>
            <span> Trello | </span>
          </div>
          <div>
            <span> Agile |</span>
            <span> Scrum</span>
          </div>
        </section>
        <div className="main-projects">
          <ProjectList />
        </div>

        <Button text={"More please!"} path={"/web"} />
      </motion.div>
    </div>
  );
}
