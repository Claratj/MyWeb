import React from 'react';
import { NavLink } from 'react-router-dom';

export function Menu() {
    return (

        <nav className={"c-menu"}>
            <NavLink className={"c-menu_link"} activeClassName={"c-menu_link-active"} exact to={"/"}>Home</NavLink>
            <NavLink className={"c-menu_link"} activeClassName={"c-menu_link-active"} to={"/about"}>About</NavLink>
            <NavLink className={"c-menu_link"} activeClassName={"c-menu_link-active"} to={"/web"}>Web Developer</NavLink>
            <NavLink className={"c-menu_link"} activeClassName={"c-menu_link-active"} to={"/graphic"}>Graphic Designer</NavLink>
        </nav>

    )
}