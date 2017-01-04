import React from 'react';
import { Router, Route } from 'react-router';

import Examples from './pages/Examples';
import Catalog from './pages/Catalog';
import Hamburger from './pages/Hamburger';
import HamburgerTouch from './pages/HamburgerTouch';
import Viewer from './pages/Viewer';
import Home from './pages/Home';


const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Home} />
        <Route path="/Examples" component={Examples} />
        <Route path="/Catalog*" component={Catalog} />
        <Route path="/Hamburger" component={Hamburger} />
        <Route path="/Hamburger/Touch" component={HamburgerTouch} />
        <Route path="/Viewer" component={Viewer} />
    </Router>
);

export default Routes;
