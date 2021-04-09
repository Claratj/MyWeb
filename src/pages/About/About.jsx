import React from 'react';

import { Link } from 'react-router-dom';

import img from '../../assets/img/foto-linkedin.jpg';

import './About.scss';


export function About() {
    return (
        <div className="main">
            <div className="main-about">
                <span className="icon-quote-left" />
                <figure className="about-figure">
                    <img className="about-figure_img" src={img} />
                    <h2 className="about-figure_txt">Hi! <br /> I'm Clara</h2>
                </figure>
                <div className="about-description">
                    <p>Based in Madrid, I'm a Web Developer focused on both Front-end and Back-end technologies.</p>
                    <p>I don't know if I found coding or coding found me. I started my career in Graphic Design but I soon realised that the new platforms were not going to be in ink and paper.
                        I found in Web Development a field of infinite possibilities where the technical base is complemented with creativity and good practices.</p>
                    <p>My previous experience has been very useful tool when approaching any project, since I take into account the technical approach to development together with the user experience point of view.</p>
                </div>
                <span className="icon-quote-right" />
            </div>
            <Link to="/about" >
                <button className="btn-more">
                    <span>Ver más</span>
                </button>
            </Link>
        </div>
    );
}