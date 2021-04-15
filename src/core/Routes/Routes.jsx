import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import GraphicPorfolio from '../../pages/Creative/GraphicPorfolio/GraphicPorfolio';
import { Home } from '../../pages/Home/Home';
import WebPorfolio from '../../pages/WebDevelopment/WebPorfolio/WebPorfolio';

export function Routes() {
    return (
        <Switch>
            <Route path="/web">
                <WebPorfolio />
            </Route>
            <Route path="/photography">
                <GraphicPorfolio />
            </Route>
            {/* <Route path="/graphic">
                <GraphicGallery />
            </Route> */}
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}