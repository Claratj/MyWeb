import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="main-creative">
                <div>
                    <h2 className="section-title">Photography</h2>
                </div>
                <CreativeGallery projects={projects} showLess={showLess} />
            </div>
        </motion.div>
    )
}
