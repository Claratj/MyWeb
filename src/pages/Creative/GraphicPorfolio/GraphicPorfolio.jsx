import React, { useState, useEffect } from 'react';

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
            <CreativeGallery graphicDesign={graphicDesign} showLess={showLess} />
        </div>
    )
}
