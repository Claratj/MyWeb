import React, { useState, useEffect } from 'react';

import { Header } from '../../../core/Header/Header';
import { Footer } from '../../../core/Footer/Footer';

import CreativeGallery from '../CreativeGallery/CreativeGallery';

import GraphicDesign from '../../../data/GraphicDesign.json';




export default function GraphicPorfolio() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(GraphicDesign);
    }, []);

    let showLess = false;
    return (
        <div>
            <Header />
            <div className="main-creative">
                <div>
                    <h2 className="section-title">Graphic Design</h2>
                </div>
                <CreativeGallery projects={projects} showLess={showLess} />
            </div>
            <Footer />
        </div>
    )
}
