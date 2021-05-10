import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import AOS from 'aos';


import { Header } from '../../core/Header/Header';
import Intro from '../Intro/Intro';
import { WebDevelopment } from '../WebDevelopment/WebDevelopment';
import { Creative } from '../Creative/Creative';
import { About } from '../About/About';
import { Footer } from '../../core/Footer/Footer';


import 'aos/dist/aos.css';
import './Home.scss';


export function Home() {
    // const [lastYPos, setLastYPos] = useState(0);
    // const [shouldShowActions, setShouldShowActions] = useState(false);

    AOS.init(
        {
            offset: 400,
            duration: 1000,
        }
    );


    // useEffect(() => {
    //     function handleScroll(e) {
    //         const yPos = window.scrollY;
    //         const isScrollingUp = yPos > lastYPos;

    //         console.log(isScrollingUp);

    //         setShouldShowActions(isScrollingUp);
    //         setLastYPos(yPos);

    //         console.log(shouldShowActions);
    //     }

    //     window.addEventListener("scroll", handleScroll, false);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll, false);
    //     };
    // }, [[lastYPos]])


    const variants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 1.5
            },
            exit: {
                y: '-100vh',
                transition: {
                    ease: 'easeInOut'
                }
            }
        }
    }


    return (
        <div>
            <Header />
            <main className="home-content">
                <motion.section variants={variants} initial="hidden" animate="visible" >
                    <Intro />
                </motion.section>
                <section data-aos="zoom-out-up" id="about">
                    <About />
                </section>
                <section data-aos="fade-up-right" id="web">
                    <WebDevelopment />
                </section>
                <section data-aos="fade-up-left" id="creative">
                    <Creative />
                </section>
            </main>
            <Footer />

        </div>
    );
}