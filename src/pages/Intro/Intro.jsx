import React from 'react';

import { motion } from 'framer-motion';

import './Intro.scss';

export default function Intro() {

    const introElements = {

    }



    return (
        <div className="main intro" id="intro">
            <div className="intro-txt" >
                <motion.h2 className="">Hola caracola</motion.h2>
            </div>
            <motion.div drag="x"
                dragConstraints={{ left: -200, right: 100 }}
                whileHover={{ scale: 12 }}
                whileTap={{ scale: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 300
                }}
                className="circle" />

            <motion.div className="triangle" whileHover={{
                scale: [1, 2, 10, 2, 1],
                rotate: [0, 0, 270, 270, 0]
            }} transition={{
                duration: 1.2,
                ease: "easeInOut",
            }}
                whileTap={{ scale: 1 }}
            />
            <motion.div whileHover={{ scale: 8, rotate: [0, 0, 20, 270, 0] }} transition={{
                duration: 1,
                ease: "easeInOut",

            }}
                whileTap={{ scale: 1 }}
                className="hex" />

        </div>
    )
}
