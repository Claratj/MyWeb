import React, { useState, useEffect } from 'react';
import CreativeGallery from '../CreativeGallery/CreativeGallery';

import { PhotoProjects as ProjectsP } from '../../../data/PhotoProjects.json';


export default function PhotographyPorfolio() {

    const [projectsP, setProjectsP] = useState([])

    useEffect(() => {
        setProjectsP(ProjectsP);
    }, []);

    let showLess = false;

    return (
        <div>
            <CreativeGallery projectsP={projectsP} showLess={showLess}/>
        </div>
    )
}
