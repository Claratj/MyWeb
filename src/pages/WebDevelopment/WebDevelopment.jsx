import React, { useState, useEffect } from 'react';
import { ProjectList } from '../../shared/ProjectList/ProjectList';

import Button from '../../shared/Button/Button';

import Projects from '../../data/Projects.json';



export function WebDevelopment() {

    const [projects, setProjects] = useState([])

    const showLess = true;

    useEffect(() => {
        setProjects(Projects);
    }, []);


    return (

        <div className="main">
            <h2 className="section-title">Web Development</h2>
            <h3 className="section-subtitle">Technologies I work with</h3>
            <section className="technologies">
                <div>
                    <span>HTML |</span>
                    <span> Css3 |</span>
                    <span> SaSS |</span>
                    <span> Flexbox |</span>
                    <span> Bootstrap</span>
                </div>
                <div>
                    <span>Javascript (ES6) |</span>
                    <span> Angular |</span>
                    <span> React |</span>
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
                    <span> Trello | </span>

                </div>
                <div>
                    <span> Agile |</span>
                    <span> Scrum</span>
                </div>
            </section>
            <div className="main-projects">
                <ProjectList projects={projects} showLess={showLess} />
            </div>

            <Button text={'More please!'} path={"/web"} />
        </div>
    );
}