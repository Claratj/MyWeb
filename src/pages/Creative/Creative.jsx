import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CreativeGallery from './CreativeGallery/CreativeGallery';


import Photography from '../../data/Photography.json';
// import GraphicDesign from '../../data/GraphicDesign.json';


import './Creative.scss';


export function Creative() {

    const [photography, setPhotography] = useState([]);
    // const [graphicDesign, setGraphicDesign] = useState([]);




    useEffect(() => {
        setPhotography(Photography);
        // setGraphicDesign(GraphicDesign);
    }, []);

    const showLess = true;




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

                        <CreativeGallery photography={photography} showLess={showLess} />

                        <Link to="/photography">
                            <button className="btn-more">
                                <span>More please!</span>
                            </button>
                        </Link>
                    </div>
                    <div className="creative">

                        {/* <CreativeGallery graphicDesign={graphicDesign} showLess={showLess} /> */}

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