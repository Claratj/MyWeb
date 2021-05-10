import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';


import { ProjectList } from '../../../shared/ProjectList/ProjectList';

import Projects from '../../../data/Projects.json';

export default function WebPorfolio() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        setProjects(Projects);
    }, []);
    let showLess = false;


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} exit={{ opacity: 0 }}>
            <div className="main-creative">
                <div>
                    <h2 className="section-title">Web Development</h2>
                </div>
                <ProjectList projects={projects} showLess={showLess} />
            </div>
        </motion.div>
    )
}
