import React, { useState, useEffect } from 'react';

import Photography from '../../data/Photography.json';
import GraphicDesign from '../../data/GraphicDesign.json';


import './Creative.scss';
import Button from '../../shared/Button/Button';


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
            <h3 className="section-subtitle">Technologies I work with</h3>
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
                    <Button text={'More please!'} path={"/photography"} />
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
                    <Button text={'More please!'} path={"/graphic"} />
                </div>
            </section>

        </div>
    );
}