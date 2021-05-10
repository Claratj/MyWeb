import React from 'react';

import { useLocation } from 'react-router-dom';

import { Header } from '../../core/Header/Header';
import { Footer } from '../../core/Footer/Footer';

import WebPorfolio from '../../pages/WebDevelopment/WebPorfolio/WebPorfolio';
import PhotographyPorfolio from '../../pages/Creative/PhotographyPorfolio/PhotographyPorfolio';
import GraphicPorfolio from '../../pages/Creative/GraphicPorfolio/GraphicPorfolio';



export default function PorfolioNavigation() {

    const location = useLocation();

    return (
        <div>
            <Header />
            {location.pathname === "/web" &&
                <WebPorfolio />
            }
            {location.pathname === "/photography" &&
                <PhotographyPorfolio />
            }
            {location.pathname === "/graphic" &&
                <GraphicPorfolio />
            }

            <Footer />
        </div>
    )
}
