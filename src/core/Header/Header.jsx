import React from 'react';
import './Header.scss';

export function Header() {
    return (
        <nav className="header">
            <ul>
                <li><a className={"header__link"} activeClassName={"header__link-active"} href="#home">Home</a></li>
                <li><a className={"header__link"} activeClassName={"header__link-active"} href="#about">About</a></li>
                <li><a className={"header__link"} activeClassName={"header__link-active"} href="#web">Web Developer</a></li>
                <li><a className={"header__link"} activeClassName={"header__link-active"} href="#graphic">Graphic Designer</a></li>
            </ul>
        </nav>

    )
}