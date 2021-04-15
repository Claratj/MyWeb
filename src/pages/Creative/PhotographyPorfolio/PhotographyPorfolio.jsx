import React, { useState, useEffect } from 'react';

import CreativeGallery from '../CreativeGallery/CreativeGallery';

import Photography from '../../../data/Photography.json';


export default function PhotographyPorfolio() {

    const [photography, setPhotography] = useState([]);

    useEffect(() => {
        setPhotography(Photography);
    }, []);

    const showLess = false;

    return (
        <div>
            <CreativeGallery photography={photography} showLess={showLess} />
        </div>
    )
}
