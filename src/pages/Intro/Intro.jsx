import React, { useEffect, useRef } from 'react';

import lottie from 'lottie-web';
import { motion } from 'framer-motion';

import './Intro.scss';

export default function Intro() {

    const animation = useRef();

    useEffect(() => {
        lottie.loadAnimation({
            container: animation.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/Animations/scroll.json')
        })
    }, [])


    return (
        <div className="main intro" id="intro">
            <div className="intro-txt" >
                <h1 className="intro-title">Hola Caracola!</h1>
                <p>Welcome to my website.</p>
            </div>
            <div className="animation" ref={animation}></div>
            <div className="circle">
            </div>
            <div className="waves">
            </div>
        </div>
    )
}
