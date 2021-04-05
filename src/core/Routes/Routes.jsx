import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Home } from '../../pages/Home/Home';
import AboutDetail from '../../pages/About/AboutDetail/AboutDetail';
import WebPorfolio from '../../pages/WebDevelopment/WebPorfolio/WebPorfolio';
import GraphicPorfolio from '../../pages/GraphicDesign/GraphicPorfolio/GraphicPorfolio';

export function Routes() {
    return (
        <Switch>
            <Route path="/about">
                <AboutDetail />
            </Route>
            <Route path="/web">
                <WebPorfolio />
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