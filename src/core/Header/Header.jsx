import React, { useState, useEffect } from 'react';
import { Link as LinkScroll } from 'react-scroll';


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
        <nav className={scrollNav ?  'header active' : 'header'}>
            <figure className="figure">
                <LinkScroll to="intro" smooth={true} duration={1000}><img src={Logo1} /></LinkScroll>
            </figure>
            <ul className={click ? "nav-options active" : "nav-options"}>
                <li className="option" onClick={closeMobileMenu}><LinkScroll to="about" smooth={true} duration={1000}>About</LinkScroll></li>
                <li className="option" onClick={closeMobileMenu}><LinkScroll to="web" smooth={true} duration={1000}>Web Developer</LinkScroll></li>
                <li className="option" onClick={closeMobileMenu}><LinkScroll to="graphic" smooth={true} duration={1000}>Graphic Designer</LinkScroll></li>
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