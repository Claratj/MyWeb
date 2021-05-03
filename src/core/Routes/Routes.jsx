import React from 'react';
import {
    Switch,
    Route,
    useLocation
} from "react-router-dom";

import { AnimatePresence } from 'framer-motion';

import { Home } from '../../pages/Home/Home';
import GraphicPorfolio from '../../pages/Creative/GraphicPorfolio/GraphicPorfolio';
import PhotographyPorfolio from '../../pages/Creative/PhotographyPorfolio/PhotographyPorfolio';
import WebPorfolio from '../../pages/WebDevelopment/WebPorfolio/WebPorfolio';

export function Routes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Switch location={location} key={location.key}>
                <Route path="/web">
                    <WebPorfolio />
                </Route>
                <Route path="/photography">
                    <PhotographyPorfolio />
                </Route>
                <Route path="/graphic">
                    <GraphicPorfolio />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </AnimatePresence>
    )
}