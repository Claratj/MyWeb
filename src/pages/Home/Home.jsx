import React, {useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';

// import AOS from 'aos';
import { motion } from 'framer-motion';
// import { Link } from 'react-scroll';


import { Header } from '../../core/Header/Header';
import Intro from '../Intro/Intro';
import { WebDevelopment } from '../WebDevelopment/WebDevelopment';
import { Creative } from '../Creative/Creative';
import { About } from '../About/About';
import { Footer } from '../../core/Footer/Footer';


import 'aos/dist/aos.css';
import './Home.scss';

export function Home() {
    const [lastYPos, setLastYPos] = useState(0);
    const [shouldShowActions, setShouldShowActions]= useState(false);
   
    // AOS.init(
    //     {
    //         offset: 400,
    //         duration: 1000,
    //     }
    // );

    useEffect(()=>{
        function handleScroll(e) {
            const yPos = window.scrollY;
            const isScrollingUp = yPos < lastYPos;
      
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
                duration: 1.3
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
            <header>
                <Header />
            </header>
            <main className="home-content">
                <motion.section variants={variants} initial="hidden" animate="visible" >
                    <Intro />
                </motion.section>
                <motion.section  initial={{x: "-100vw"}} animate={{x: shouldShowActions? 0: "-2000"}} transition={{duration: 0.5}}  id="about">
                    <About />
                </motion.section>
                <motion.section  id="web">
                    <WebDevelopment />
                </motion.section>
                <motion.section id="graphic">
                    <Creative />
                </motion.section>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}