import React, { useEffect } from 'react';

import lottie from 'lottie-web';
import { motion } from 'framer-motion';

import './Intro.scss';

export default function Intro() {

    useEffect(() => {
        
    }, [])


    return (
        <div className="main intro" id="intro">
            <div className="intro-txt" >
                <h1 className="intro-title">Hola Caracola!</h1>
                <p>Welcome to my website. </p>
                {/* <h2>
                    <span className="">Clara</span><br /><span>Toloba</span>
                </h2> */}
            </div>
            <div className="triangle">
            </div>
            <div className="waves">
            </div>
        </div>
    )
}
