import React from 'react';
import {
    Switch,
    Route,
    useLocation
} from "react-router-dom";


import { Home } from '../../pages/Home/Home';
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