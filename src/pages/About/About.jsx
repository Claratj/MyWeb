import React from 'react';
import { Header } from '../../core/Header/Header';
import './About.scss';
import img from '../../assets/img/foto-linkedin.jpg';
import Chronology from './Chronology/Chronology';


export function About() {
    return (
        <>
            <Header />
            <div className="contact-container">
                <figure className="about-image">
                    <img className="about-image_img" src={img} />
                    <h2 className="about-image_txt">Hi! I'm Clara</h2>
                    <h3 className="">Full Stack Developer Jr</h3>
                    <p>Based in Madrid, I'm focused on mainly Front-end but Back-end technologies too. Art&Design lover, blablabla</p>
                </figure>
                <div className=" c-chronology">
                    <Chronology />
                </div>
            </div>
        </>
    );
}