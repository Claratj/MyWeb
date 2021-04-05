import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';
import img from '../../assets/img/foto-linkedin.jpg';
import Chronology from './Chronology/Chronology';


export function About() {
    return (
        <>
            <div className="main-about">
                <figure className="about-image">
                    <img className="about-image_img" src={img} />
                    <h2 className="about-image_txt">Hi! I'm Clara</h2>
                    <div className="about-description">
                        <h2 className="">Full Stack Developer Jr</h2>
                        <p>Based in Madrid, I'm focused on mainly Front-end but Back-end technologies too.</p>
                        <p>I don't know if I found coding or coding found me. I started my career in Graphic Design but I soon realised that the new platforms were not going to be in ink and paper.
                        I found in Web Development a field of infinite possibilities where the technical base is complemented with creativity and good practices.</p>
                        <p>My previous experience has been very useful tool when approaching any project, since I take into account the technical approach to development together with the user experience point of view.</p>
                    </div>
                </figure>
                <Link to="/about" >
                    <button className="btn-more">Ver más</button>
                </Link>
                {/* <div className=" c-chronology">
                    <Chronology />
                </div> */}
            </div>
        </>
    );
}