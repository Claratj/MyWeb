import React from 'react';
import { Header } from '../../core/Header/Header';
import './About.scss';
import img from '../../assets/img/foto-linkedin.jpg';


export function About() {
    return (


        <div>
            <Header />
            <div className="contact-container">
                <div className="col-4">
                    <figure className="about-image">
                        <img className="about-image__img" src={img} />
                        <h2 className="about-image__txt">Clara</h2>
                    </figure>

                </div>
                <div className="col-8">
            
                        Formación y skills
                </div>
                
            </div>
        </div>
    );
}