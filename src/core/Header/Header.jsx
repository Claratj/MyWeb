import React, { useState, useEffect } from 'react';
import { Link as LinkScroll } from 'react-scroll';

import { motion } from 'framer-motion';



import './Header.scss';
import Logo1 from '../../assets/img/logo1-01.svg';
export function Header() {
    const [scrollNav, setScrollNav] = useState(false);
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const changeNav = () => {

        if (window.scrollY >= 80) {
            setScrollNav(true);

        } else {
            setScrollNav(false);

        }
    }
    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])

    return (
        <nav className={scrollNav ? 'header active' : 'header'}>
            <motion.figure className="figure"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 500 }}>
                <LinkScroll to="intro" smooth={true} duration={1000}><img src={Logo1} /></LinkScroll>
            </motion.figure>
            <ul className={click ? "nav-options active" : "nav-options"}>
                <motion.li className="option" onClick={closeMobileMenu}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 500 }}>
                    <LinkScroll to="about" smooth={true} duration={1000}>About</LinkScroll>
                </motion.li>
                <motion.li className="option" onClick={closeMobileMenu}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 500 }}>
                    <LinkScroll to="web" smooth={true} duration={1000}>Web Developer</LinkScroll>
                </motion.li>
                <motion.li className="option" onClick={closeMobileMenu}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 500 }}>
                    <LinkScroll to="graphic" smooth={true} duration={1000}>Graphic Designer</LinkScroll>
                </motion.li>
            </ul>
            <div className="mobile-menu" onClick={handleClick}>
                {click ? (
                    <span className="icon-up" />
                ) : (
                    <span className="icon-menu" />
                )}
            </div>
        </nav>

    )
}