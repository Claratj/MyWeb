import React, { useState, useEffect } from 'react';

import { Header } from '../../../core/Header/Header';

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
            <Header />
            <div className="main-creative">
                <div>
                    <h2>Photography</h2>
                </div>
                <CreativeGallery photography={photography} showLess={showLess} />
            </div>
        </div>
    )
}
