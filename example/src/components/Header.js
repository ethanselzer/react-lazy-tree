import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import npmLogo from '../images/npm-logo.png';
import githubLogo from '../images/github-logo.png';

import '../styles/header.css';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedNavKey: 0
        };
    }

    componentDidMount() {
        const path = this.props.route.path;

        this.setState({
            selectedNavKey: this.getNavKeyByRoutePath(path)
        })
    }

    getNavKeyByRoutePath(path) {
        switch (path) {
            case '/' :
                return 1;
            case '/Hamburger' :
                return 2;
            case '/Catalog*' :
                return 3;
            case '/Viewer' :
                return 4;
            default :
                return 1;
        }
    }

    render() {
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a className="logo" href="#/">
                            &lt;ReactLazyTree/&gt;
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav {...{activeKey: this.state.selectedNavKey}}>
                        <NavItem eventKey={1} href="#/">Home</NavItem>
                        <NavItem eventKey={2} href="#/Hamburger">Hamburger</NavItem>
                        <NavItem eventKey={3} href="#/Catalog/Women/Clothing/Dresses/Work">Category</NavItem>
                        <NavItem eventKey={4} href="#/Viewer">Viewer</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem
                            eventKey={1}
                            className="github-link"
                            href="https://github.com/ethanselzer/react-lazy-tree"
                        >
                            <img src={githubLogo} alt="GitHub Logo" />
                        </NavItem>
                        <NavItem
                            eventKey={2}
                            href="https://www.npmjs.com/package/react-lazy-tree"
                            className="npm-link"
                        >
                            <img src={npmLogo} alt="NPM Logo" />
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
