import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import MiniGallery from './CreativeGallery/MiniGallery/MiniGallery';

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

    const showLessPhotography = photography.slice(0, 3).map((project, i) => {
        return (
            <Grid key={i} style={{ height: 150, width: 250 }}>
                <figure className="img-container" >
                    <img src={project.photo} alt={project.title} />
                </figure>
            </Grid>
        )
    });

    const showLessGraphic = graphicDesign.slice(0, 3).map((project, j) => {
        return (
            <Grid key={j} style={{ height: 200, width: 200 }}>
                <figure className="img-container" >
                    <img src={project.photo} alt={project.title} />
                </figure>
            </Grid>
        )
    });



    return (
        <>
            <div className="main">
                <h2>Photography & Graphic Design</h2>
                <section className="technologies">
                    <div>
                        <span>Photoshop |</span>
                        <span> Illustrator |</span>
                        <span> InDesign |</span>
                        <span> Premiere Pro |</span>
                        <span> After Effects</span>
                    </div>
                </section>
                <section className="porfolio-creative">
                    <div className="creative">

                        <MiniGallery showLessPhotography={showLessPhotography} />

                        <Link to="/photography">
                            <button className="btn-more">
                                <span>More please!</span>
                            </button>
                        </Link>
                    </div>
                    <div className="creative">

                        <MiniGallery showLessGraphic={showLessGraphic} />

                        <Link to="/graphic">
                            <button className="btn-more">
                                <span>More please!</span>
                            </button>
                        </Link>
                    </div>
                </section>

            </div>
        </>
    );
}