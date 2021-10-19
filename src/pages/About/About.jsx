import React, { useEffect } from 'react';

import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import img from '../../assets/img/foto-linkedin.jpg';
import Button from '../../shared/Button/Button';

import './About.scss';


export function About() {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        triggerOnce: false,
        rootMargin: '-100px 0px',
    });
    
    const quotes = {
        hidden: {
            x: '-100vw'
        },
        visible: {
            x: 0,
            transition: {
                duration: 1.5,
                type: 'spring',
                stiffness: 120
            }
        }
    }
    useEffect(() => {
        if (inView) {
            controls.start("visible");
            console.log('estoy visible');
        }
        else if (!inView) {
            controls.start('hidden');
            console.log('me he escondido');
        }
    }, [controls, inView]);

    return (
        <div className="main">
            <div className="main-about">
                <span className="icon-quote-left"
                    ref={ref} 
                    animate={controls}
                    initial="hidden" 
                    variants={quotes} />

                <figure className="about-figure">
                    <div className="about-figure-img_container">
                        <img src={img} alt="About me portrait" />
                    </div>
                    <h2 className="about-figure_txt">
                        <span className="">Hi!</span>
                        <br />
                        <span className="">I'm Clara</span> </h2>
                </figure>
                <div className="about-description">
                    <p>Based in Madrid, I'm a Web Developer focused on Front-end technologies.</p>
                    <p>I don't know if I found coding or coding found me. I started my career in Graphic Design but I soon realised that the new platforms were not going to be in ink and paper.
                        I found in Web Development a field of infinite possibilities where the technical base is complemented with creativity and good practices.</p>
                    <p>My previous experience has been very useful tool when approaching any project, since I take into account the technical approach to development together with the user experience point of view.</p>
                </div>
                <span ref={ref} className="icon-quote-right" variants={quotes} initial="hidden" animate={controls} />
            </div>
            <Button cv={true} text={'CV Download'} />
        </div>
    );
}
