import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
