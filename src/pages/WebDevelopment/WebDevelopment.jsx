import React, { useState, useEffect } from 'react';
import { ProjectList } from '../../shared/ProjectList/ProjectList';
import { Header } from '../../core/Header/Header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './WebDevelopment.scss';
import Projects from '../../data/Projects.json';

library.add(fab);
library.add(fas);

export function WebDevelopment() {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        setProjects(Projects);
    }, []);

    return (
        <>
            <Header />
            <div>
                <h2>Technologies I work with</h2>
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
                        <span> GitLab</span>
                        <span> Trello |</span>
              
                    </div>
                    <div>
                        <span> Agile |</span>
                        <span> Scrum</span>
                    </div>
                </section>
                <ProjectList projects={projects} />
            </div>

        </>
    );
}