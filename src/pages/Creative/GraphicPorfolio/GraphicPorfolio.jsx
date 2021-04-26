import React, { useState, useEffect } from 'react';

import { Header } from '../../../core/Header/Header';

import CreativeGallery from '../CreativeGallery/CreativeGallery';

import GraphicDesign from '../../../data/GraphicDesign.json';

export default function GraphicPorfolio() {
    const [graphicDesign, setGraphicDesign] = useState([]);

    useEffect(() => {
        setGraphicDesign(GraphicDesign);
    }, []);

    let showLess = false;
    return (
        <div>
            <Header />
            <div className="main-creative">
                <div>
                    <h2>Graphic Design</h2>
                </div>
                <CreativeGallery graphicDesign={graphicDesign} showLess={showLess} />
            </div>
        </div>
    )
}
