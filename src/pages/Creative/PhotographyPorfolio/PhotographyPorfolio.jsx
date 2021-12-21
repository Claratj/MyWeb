import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import CreativeGallery from '../CreativeGallery/CreativeGallery';

import Photography from '../../../data/Photography.json';


export default function PhotographyPorfolio() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        setProjects(Photography);
    }, []);




    // setTimeout();

    const showLess = false;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.3 }} exit={{ opacity: 0 }}>
            <div className="main-creative">
                <div>
                    <h2 className="section-title">Photography</h2>
                </div>
                <CreativeGallery projects={projects} showLess={showLess} />
            </div>
        </motion.div>
    )
}
