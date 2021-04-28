import React from 'react';

import './Footer.scss';

export function Footer() {
    return (
        <div className="">
            <nav className="rrss">
                <a href="https://twitter.com/cofclarividence"><span className="icon-twitter" /></a>
                <a href="https://gitlab.com/Claratj"><span className="icon-gitlab" /></a>
                <a href="https://www.linkedin.com/in/claratoloba"><span className="icon-in" /></a>
                <a href="mailto:clara@claratoloba.com"><span className="icon-mail" /></a>
            </nav>
            <p className="">Made by Clara <span className="icon-copy" /> 2021</p>
        </div>
    )
}
