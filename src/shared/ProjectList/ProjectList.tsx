import React from "react";

import { motion } from "framer-motion";

import { ProjectItem } from "../ProjectItem/ProjectItem";
import useWebDev from "../../pages/WebDevelopment/useWebDev";
import { useLocation } from "react-router-dom";

export function ProjectList() {
  const { projects } = useWebDev();
  const location = useLocation();

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      y: -"100vh",
      transition: {
        ease: "easeInOut",
      },
    },
  };

  switch (location.pathname) {
    case "/":
      return (
        <section className="project">
          {projects.slice(0, 4).map((project) => (
            <ProjectItem
              key={project.id}
              photo={project.photo}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              webUrl={project.webUrl}
            />
          ))}
        </section>
      );

    case "/web":
      return (
        <motion.section
          className="project"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              photo={project.photo}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              webUrl={project.webUrl}
            />
          ))}
        </motion.section>
      );
    default:
      return <></>;
  }
}
