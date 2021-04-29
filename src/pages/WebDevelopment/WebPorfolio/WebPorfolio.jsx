import React, { useState, useEffect } from 'react';

import { Header } from '../../../core/Header/Header';

import { ProjectList } from '../../../shared/ProjectList/ProjectList';

import Projects from '../../../data/Projects.json';

export default function WebPorfolio() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        setProjects(Projects);
    }, []);
    let showLess = false;

    return (
        <div>
            <Header />
            <div className="main-creative">
                <div>
                    <h2>Web Development</h2>
                </div>
                <ProjectList projects={projects} showLess={showLess} />
            </div>
        </div>
    )
}
