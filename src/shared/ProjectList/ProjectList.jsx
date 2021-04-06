import React from 'react';
import { ProjectItem } from '../ProjectItem/ProjectItem';

import Got from '../../assets/img/got.png';

export function ProjectList(props) {

    console.log(props.projects);

    const projectItem = props.projects.map((project => {
        return (<ProjectItem key={project.id}
            photo={project.photo}
            // photo={Got}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            githubUrl={project.githubUrl}
            webUrl={project.webUrl} />)

    }))


    return (
        <section className="project">
            {projectItem}
        </section>

    )
}