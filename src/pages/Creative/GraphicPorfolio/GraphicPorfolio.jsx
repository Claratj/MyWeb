import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import CreativeGallery from '../CreativeGallery/CreativeGallery';

import GraphicDesign from '../../../data/GraphicDesign.json';




export default function GraphicPorfolio() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(GraphicDesign);
    }, []);

    let showLess = false;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.3 }} exit={{ opacity: 0 }}>
            <div className="main-creative">
                <div>
                    <h2 className="section-title">Graphic Design</h2>
                </div>
                <CreativeGallery projects={projects} showLess={showLess} />
            </div>
        </motion.div>
    )
}
