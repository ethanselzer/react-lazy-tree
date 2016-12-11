import React from 'react';
import { Navbar } from 'react-bootstrap';

export default () => (
    <Navbar inverse fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
                <a className="logo" href="/react-lazy-tree">
                    &lt;ReactLazyTree/&gt;
                </a>
            </Navbar.Brand>
        </Navbar.Header>
    </Navbar>
);
