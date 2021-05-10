import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';


import { Header } from '../../core/Header/Header';
import Intro from '../Intro/Intro';
import { WebDevelopment } from '../WebDevelopment/WebDevelopment';
import { Creative } from '../Creative/Creative';
import { About } from '../About/About';
import { Footer } from '../../core/Footer/Footer';


// import './Home.scss';

export function Home() {
    const [lastYPos, setLastYPos] = useState(0);
    const [shouldShowActions, setShouldShowActions] = useState(false);



    useEffect(() => {
        function handleScroll(e) {
            const yPos = window.scrollY;
            const isScrollingUp = yPos > lastYPos;

            setShouldShowActions(isScrollingUp);
            setLastYPos(yPos);
        }

        window.addEventListener("scroll", handleScroll, false);

        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        };
    }, [[lastYPos]])


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
                <motion.section initial={{ x: "-1000vw" }} animate={{ x: shouldShowActions ? 0 : "-2000" }} transition={{ duration: 1.5, type: 'spring', stiffness: 500 }} id="about">
                    <About />
                </motion.section>
                <motion.section initial={{ x: "10000vw" }} animate={{ x: shouldShowActions ? 0 : "10000" }} transition={{ duration: 1.2 }} id="web">
                    <WebDevelopment />
                </motion.section>
                <motion.section id="graphic" initial={{  }} animate={{ y: shouldShowActions ? 0 : "1000" }} transition={{ duration: 1.2 }} id="creative">
                    <Creative />
                </motion.section>
            </main>
            <Footer />
        </div>
    );
}