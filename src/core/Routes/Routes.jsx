import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import { Home } from '../../pages/Home/Home';
import GraphicPorfolio from '../../pages/Creative/GraphicPorfolio/GraphicPorfolio';
import PhotographyPorfolio from '../../pages/Creative/PhotographyPorfolio/PhotographyPorfolio';
import WebPorfolio from '../../pages/WebDevelopment/WebPorfolio/WebPorfolio';

export function Routes() {
    return (
        <Switch>
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
    )
}