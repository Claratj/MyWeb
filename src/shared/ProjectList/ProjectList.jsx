import React from 'react';

import { motion } from 'framer-motion';

import { ProjectItem } from '../ProjectItem/ProjectItem';




export function ProjectList(props) {

    let showLess = props.showLess;
    let lessProjects = '';
    let projectItem = '';

    switch (showLess !== null) {
        case (showLess === true):
            lessProjects = props.projects.slice(0, 4).map((project => {
                return (<ProjectItem key={project.id}
                    photo={project.photo}
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    githubUrl={project.githubUrl}
                    webUrl={project.webUrl} />)
            }));
            break;
        case (showLess === false):
            projectItem = props.projects.map((project => {
                return (<ProjectItem key={project.id}
                    photo={project.photo}
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    githubUrl={project.githubUrl}
                    webUrl={project.webUrl} />)

            }));
            break;
        default: break;

    }

    const variants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5
            }
        },
        exit: {
            y: -"100vh",
            transition: {
                ease: 'easeInOut'
            }
        }
    }

    return (
        <>
            {showLess &&
                <section className="project">
                    {lessProjects}
                </section>
            }
            <motion.section className="project" variants={variants} initial="hidden" animate="visible" exit="exit">
                {projectItem}
            </motion.section>
        </>
    )
}