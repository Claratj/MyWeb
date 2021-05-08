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
            {/* <motion.div drag="x"
                dragConstraints={{ left: -200, right: 100 }}
                whileHover={{ scale: 12 }}
                whileTap={{ scale: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 300
                }}
                className="circle" /> */}


            <div className="waves">

            </div>
        </div>
    )
}
