import React, { useState, useEffect } from 'react';

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
            <ProjectList projects={projects} showLess={showLess} />
        </div>
    )
}
