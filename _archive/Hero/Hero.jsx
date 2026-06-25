import React, { useEffect, useRef } from 'react';

import lottie from 'lottie-web';
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import scrollAnimation from '../../assets/Animations/scroll.json';

import './Hero.scss';

export default function Intro() {

    const animation = useRef(null);

    useEffect(() => {
        const instance = lottie.loadAnimation({
            container: animation.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: scrollAnimation
        });

        return () => instance.destroy();
    }, []);


    return (
        <div className="main intro" id="intro">
            <div className="intro-txt" >
                <h1 className="intro-title">Hola Caracola!</h1>
                <p>Welcome to my website</p>
            </div>



            <div className="animation" data-tooltip-id="scroll-tip" data-tooltip-content="Scroll time!" ref={animation} ></div>

            <Tooltip id="scroll-tip" place="right" />

            <div className="circle">
            </div>
            <div className="waves">
            </div>
        </div>
    )
}
