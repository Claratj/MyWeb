import React from 'react';
import { ProjectItem } from '../ProjectItem/ProjectItem';

export function ProjectList(props) {
    return (

        <section className="projects-section">
            {/* {
                props.projects.map((project => {

                    <ProjectItem key={project.id}
                        photo={project.photo}
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        githubUrl={project.githubUrl}
                        webUrl={project.webUrl} />

                }))
            <div className="projects">{singleProject}</div>
            } */}
        </section>

    )
}