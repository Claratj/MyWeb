import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { Link as LinkScroll } from 'react-scroll';

import { motion, useMotionValue } from 'framer-motion';



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
                stiffness: 500
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
                <motion.li className="option" onClick={closeMobileMenu}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 500 }}>
                    {location.pathname === "/photography" || location.pathname === "/web" || location.pathname === "/graphic" ? <Link to="/">About</Link> :
                        <LinkScroll to="about" smooth={true} duration={1000}>About</LinkScroll>}
                </motion.li>

                {location.pathname !== "/web" &&
                    <motion.li className="option" onClick={closeMobileMenu}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 500 }}>
                        {location.pathname === "/photography" || location.pathname === "/graphic" ? <Link to="/web">Web Developer</Link> :
                            <LinkScroll to="web" smooth={true} duration={1000}>Web Developer</LinkScroll>}
                    </motion.li>
                }

                {location.pathname === "/" &&
                    <motion.li className="option" onClick={closeMobileMenu}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 500 }}>
                        <LinkScroll to="creative" smooth={true} duration={1000}>Creative</LinkScroll>
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