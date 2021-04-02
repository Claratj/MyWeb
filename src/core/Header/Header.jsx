import React, { useState } from 'react';
import './Header.scss';

export function Header() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);



    return (
        <nav className="header">
            <ul className={click ? "nav-options active" : "nav-options"}>
                <li className="option" onClick={closeMobileMenu}><a href="#home">Home</a></li>
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