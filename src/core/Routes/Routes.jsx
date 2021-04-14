import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Home } from '../../pages/Home/Home';
import WebPorfolio from '../../pages/WebDevelopment/WebPorfolio/WebPorfolio';
import GraphicPorfolio from '../../pages/GraphicDesign/GraphicPorfolio/GraphicPorfolio';

export function Routes() {
    return (
        <Switch>
            <Route path="/web">
                <WebPorfolio />
            </Route>
            <Route path="/creative">
                <GraphicPorfolio />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}