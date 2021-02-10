import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { EntryPage } from '../../pages/EntryPage/EntryPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { ContactPage } from '../../pages/ContactPage/ContactPage';
import { WebDevelopment } from '../../pages/WebDevelopment/WebDevelopment';
import { GraphicDesign } from '../../pages/GraphicDesign/GraphicDesign';

export function Routes() {
    return (
        <Switch>
            <Route path="/home">
                <HomePage />
            </Route>
            <Route path="/about">
                <ContactPage />
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