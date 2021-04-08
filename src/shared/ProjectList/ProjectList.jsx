import React from 'react';

import { ProjectItem } from '../ProjectItem/ProjectItem';


export function ProjectList(props) {
    console.log(props.showLess);

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



    return (
        

        <div className="list">

            {showLess && 
                <section className="project">
                    {lessProjects}
                </section>
            }
                <section className="project">
                    {projectItem}
                </section>
        </div>
    )
}