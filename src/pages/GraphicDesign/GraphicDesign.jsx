import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProjectList } from '../../shared/ProjectList/ProjectList';
// import ProjectsGaphic from '../../data/ProjectsGraphic.json';


export function GraphicDesign() {

    const [projectsG, setProjectsG] = useState([])

    // useEffect(() => {
    //     setProjectsG(ProjectsGaphic);
    // }, []);
    return (
        <>
            <div className="main">
                <h2>Photography & Graphic Design</h2>
                <section className="technologies">
                    <div>
                        <span>Photoshop |</span>
                        <span> Illustrator |</span>
                        <span> InDesign |</span>
                        <span> Premiere Pro |</span>
                        <span> After Effects</span>
                    </div>
                </section>
                {/* <ProjectList projects={projectsG} /> */}
                <Link to="/graphic">
                    <button className="btn-more">
                        <span>More please!</span>
                    </button>
                </Link>
            </div>
        </>
    );
}