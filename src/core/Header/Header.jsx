import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';

import { motion } from 'framer-motion';



import './Header.scss';
import Logo1 from '../../assets/img/logo1-01.svg';


export function Header() {
    const [scrollNav, setScrollNav] = useState(false);
    const [click, setClick] = useState(false);
    const location = useLocation();

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

    const containerVariants = {
        hidden: {
            opacity: 0,
            y: '100vh'
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 800
            }
        }
    }


    return (
        <motion.nav className={scrollNav ? 'header active' : 'header'}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.figure className="figure"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 200 }}>
                {location.pathname === "/photography" || location.pathname === "/web" || location.pathname === "/graphic" ? (<Link to="/"><img src={Logo1} alt="logo" /></Link>) : (<LinkScroll to="intro" smooth={true} duration={1000}><img src={Logo1} alt="logo" /></LinkScroll>)
                }
            </motion.figure>

            <ul className={click ? "nav-options active" : "nav-options"}>

                {location.pathname === "/" &&

                    <motion.li className="option" onClick={closeMobileMenu}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 500 }}>
                        <LinkScroll to="about" spy={true} smooth={true} offset={50} duration={500}>About</LinkScroll>
                    </motion.li>
                }



                {location.pathname !== "/web" &&
                    <motion.li className="option" onClick={closeMobileMenu}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 500 }}>
                        {location.pathname === "/photography" || location.pathname === "/graphic" ? <Link to="/web">Web Development</Link> :
                            <LinkScroll to="web" spy={true} smooth={true} offset={50} duration={500}>Web Development</LinkScroll>}
                    </motion.li>
                }

                {location.pathname === "/" &&
                    <motion.li className="option" onClick={closeMobileMenu}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 500 }}>
                        <LinkScroll to="creative"spy={true} smooth={true} offset={50} duration={500}>Creative</LinkScroll>
                    </motion.li>
                }

                {(location.pathname === "/graphic" || location.pathname === "/web") && <motion.li className="option" onClick={closeMobileMenu}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 500 }}>
                    <Link to="/photography">Photography</Link>
                </motion.li>}



                {(location.pathname === "/photography" || location.pathname === "/web") &&
                    <motion.li className="option" onClick={closeMobileMenu}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 500 }}>
                        <Link to="/graphic">Graphic Design</Link>
                    </motion.li>}

            </ul>



            <motion.div className="mobile-menu" onClick={handleClick}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {click ? (
                    <motion.span className="icon-up"

                    />
                ) : (
                    <motion.span className="icon-menu" />
                )}
            </motion.div>
        </motion.nav>

    )
}