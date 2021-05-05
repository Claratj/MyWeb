import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Photography from '../../data/Photography.json';
import GraphicDesign from '../../data/GraphicDesign.json';


import './Creative.scss';


export function Creative() {

    const [photography, setPhotography] = useState([]);
    const [graphicDesign, setGraphicDesign] = useState([]);




    useEffect(() => {
        setPhotography(Photography);
        setGraphicDesign(GraphicDesign);
    }, []);


    return (
            <div className="main">
                <h2 className="section-title">Creative</h2>
                <section className="technologies">
                    <div>
                        <span>Photoshop |</span>
                        <span> Illustrator |</span>
                        <span> InDesign |</span>
                        <span> Premiere Pro </span>
                    </div>
                </section>
                <section className="porfolio-creative">
                    <div className="creative">
                        <h3 className="creative-title">Photography</h3>
                        <div className="creative-grid">
                            {photography.slice(0, 3).map((project => {
                                return (
                                    <figure>
                                        <img src={project.photo} alt={project.title} className="img-grid" />
                                    </figure>
                                )

                            }))
                            }
                        </div>


                        <Link to="/photography">
                            <button className="btn-more">
                                <span>More please!</span>
                            </button>
                        </Link>
                    </div>


                    <div className="creative">
                        <h3 className="creative-title">Graphic Design</h3>
                        <div className="creative-grid">

                            {graphicDesign.slice(0, 3).map((project => {
                                return (
                                    <figure>
                                        <img src={project.photo} alt={project.title} className="img-grid" />
                                    </figure>
                                )
                            }))
                            }
                        </div>


                        <Link to="/graphic">
                            <button className="btn-more">
                                <span>More please!</span>
                            </button>
                        </Link>
                    </div>
                </section>

            </div>
    );
}