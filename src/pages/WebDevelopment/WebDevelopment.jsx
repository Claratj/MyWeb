import React, { useState, useEffect } from 'react';
import { ProjectList } from '../../shared/ProjectList/ProjectList';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../core/Header/Header';
import './WebDevelopment.scss';
library.add(fab);
library.add(fas);

export function WebDevelopment() {

    // const [projects, setProjects] = useState([])

    // useEffect(() => {
    //     setProjects(projectsData);
    // }, []);
    return (
        <>
            <Header />
            <div>
                <h1>Technologies I work with</h1>
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
                        <span> Figma |</span>
                        <span> Zeplin</span>
                    </div>
                    <div>
                        <span> Agile |</span>
                        <span> Scrum</span>
                    </div>
                </section>
                <ProjectList />
            </div>

        </>
    );
}