import React, { useState } from 'react';
import './Header.scss';
import Logo1 from '../../assets/img/logo1-01.svg';
export function Header() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);



    return (
        <nav className="header">
            <figure className="figure">
                <img src={Logo1} />
            </figure>
            <ul className={click ? "nav-options active" : "nav-options"}>
                <li className="option" onClick={closeMobileMenu}><a href="#about">About</a></li>
                <li className="option" onClick={closeMobileMenu}><a href="#web">Web Developer</a></li>
                <li className="option" onClick={closeMobileMenu}><a href="#graphic">Graphic Designer</a></li>
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