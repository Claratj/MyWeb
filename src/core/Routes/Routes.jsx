import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { EntryPage } from '../../pages/EntryPage/EntryPage';
import { About } from '../../pages/About/About';
import { WebDevelopment } from '../../pages/WebDevelopment/WebDevelopment';
import { GraphicDesign } from '../../pages/GraphicDesign/GraphicDesign';

export function Routes() {
    return (
        <Switch>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/web">
                <WebDevelopment />
            </Route>
            <Route path="/graphic">
                <GraphicDesign />
            </Route>
            <Route path="/">
                <EntryPage />
            </Route>
        </Switch>
    )
}