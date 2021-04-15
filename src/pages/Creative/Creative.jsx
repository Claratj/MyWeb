import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CreativeGallery from './CreativeGallery/CreativeGallery';


import PhotoProjects from '../../data/PhotoProjects.json';
import GraphicsProjects from '../../data/GraphicsProjects.json';


import './Creative.scss';


export function Creative() {

    const [projectsP, setProjectsP] = useState([])
    const [projectsG, setProjectsG] = useState([])
    const showLess = true;


    useEffect(() => {
        setProjectsP(PhotoProjects);
        setProjectsG(GraphicsProjects);
    }, []);




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
                {/* <ProjectList projects={projectsG} showLess={showLess} /> */}
                <section className="porfolio-creative">
                    <div className="creative">

                        <CreativeGallery projectsP={projectsP} showLess={showLess} />

                        <Link to="/photography">
                            <button className="btn-more">
                                <span>More please!</span>
                            </button>
                        </Link>
                    </div>
                    <div className="creative">

                        <CreativeGallery projectsG={projectsG} showLess={showLess} />

                        <Link to="/graphic">
                            <button className="btn-more">
                                <span>More please!</span>
                            </button>
                        </Link>
                    </div>
                </section>

            </div>
        </>
    );
}