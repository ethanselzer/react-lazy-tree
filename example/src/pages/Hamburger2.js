import React, { Component } from 'react';
import Hamburger from '../components/Hamburger';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

import { 
  Button, 
  Col,
  Grid,
  Jumbotron,
  ListGroup,
  ListGroupItem, 
  Navbar, 
  Row, 
  Thumbnail 
} from 'react-bootstrap';


class  HamburgerPage extends Component {
    render() {
        return (
            <div className="root">
                <Navbar inverse fixedTop>
                <Grid>
                    <Navbar.Header>
                    <Navbar.Brand>
                        <a className="logo" href="/">
                            &lt;ReactLazyTree/&gt;
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                </Grid>
                </Navbar>
                <Grid>
                    <Row>
                        <Col {...{
                            xsHidden: true
                            
                        }}>
                        <Jumbotron>
                            <h1>Hamburger Menu Example</h1>
                        </Jumbotron>
                        </Col>
                    </Row>
                </Grid>
                <Grid className="foo">
                    <Row>
                        <Col>
                            <Hamburger/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default HamburgerPage;
