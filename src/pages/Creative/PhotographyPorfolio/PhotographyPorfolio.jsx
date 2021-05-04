import React, { useState, useEffect } from 'react';

import { Header } from '../../../core/Header/Header';
import { Footer } from '../../../core/Footer/Footer';

import CreativeGallery from '../CreativeGallery/CreativeGallery';

import Photography from '../../../data/Photography.json';


export default function PhotographyPorfolio() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(Photography);
    }, []);

    const showLess = false;

    return (
        <div>
            <Header />
            <div className="main-creative">
                <div>
                    <h2>Photography</h2>
                </div>
                <CreativeGallery projects={projects} showLess={showLess} />
            </div>
            <Footer />
        </div>
    )
}
