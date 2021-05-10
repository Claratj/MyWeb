import React from 'react';

import { motion } from 'framer-motion';
import AOS from 'aos';


import { Header } from '../../core/Header/Header';
import Intro from '../Intro/Intro';
import { WebDevelopment } from '../WebDevelopment/WebDevelopment';
import { Creative } from '../Creative/Creative';
import { About } from '../About/About';
import { Footer } from '../../core/Footer/Footer';


import 'aos/dist/aos.css';
// import './Home.scss';


export function Home() {

    AOS.init(
        {
            offset: 600,
            duration: 800,
        }
    );


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