import React from 'react';
import { Router, Route } from 'react-router';

import App from './pages/App';
import Catalog from './pages/Catalog';
import Hamburger from './pages/Hamburger';
import HamburgerTouch from './pages/HamburgerTouch';
import Viewer from './pages/Viewer';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App} />
        <Route path="/Catalog*" component={Catalog} />
        <Route path="/Hamburger" component={Hamburger} />
        <Route path="/Hamburger/Touch" component={HamburgerTouch} />
        <Route path="/Viewer" component={Viewer} />
    </Router>
);

export default Routes;
