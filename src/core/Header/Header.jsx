import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

export function Header() {
    return (

        <nav className="header">
            <NavLink className={"header__link"} activeClassName={"header__link-active"} exact to={"/home"}>Home</NavLink>
            <NavLink className={"header__link"} activeClassName={"header__link-active"} to={"/about"}>About</NavLink>
            <NavLink className={"header__link"} activeClassName={"header__link-active"} to={"/web"}>Web Developer</NavLink>
            <NavLink className={"header__link"} activeClassName={"header__link-active"} to={"/graphic"}>Graphic Designer</NavLink>
        </nav>

    )
}