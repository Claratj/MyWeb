import React from 'react';

import { motion } from 'framer-motion';

import './Intro.scss';

export default function Intro() {

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    return (
        <div className="main intro" id="intro">
            <div className="intro-txt" >
                <h2 className="">Hola caracola</h2>
            </div>
            <motion.div drag="x"
                dragConstraints={{ left: -200, right: 100 }} whileHover={{ scale: 7 }} whileTap={{ scale: 1 }} className="circle" />

            <motion.div initial="hidden"
                animate="visible"
                variants={variants} className="triangle" whileHover={{ scale: 3 }} />

        </div>
    )
}
