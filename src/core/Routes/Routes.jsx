import React from 'react';
import {
    Switch,
    Route,
    useLocation
} from "react-router-dom";


import { Home } from '../../pages/Home/Home';
import GraphicPorfolio from '../../pages/Creative/GraphicPorfolio/GraphicPorfolio';
import PhotographyPorfolio from '../../pages/Creative/PhotographyPorfolio/PhotographyPorfolio';
import WebPorfolio from '../../pages/WebDevelopment/WebPorfolio/WebPorfolio';
import PorfolioNavigation from '../../shared/PorfolioNavigation/PorfolioNavigation';

export function Routes() {
    const location = useLocation();

    return (
        <Switch location={location} key={location.key}>
            <Route path="/web">
                <PorfolioNavigation />
            </Route>
            <Route path="/photography">
                <PorfolioNavigation />
            </Route>
            <Route path="/graphic">
                <PorfolioNavigation />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}