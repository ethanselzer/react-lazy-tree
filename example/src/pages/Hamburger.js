import React, { Component } from 'react';
import { 
  Col,
  Grid,
  Jumbotron,
  Row
} from 'react-bootstrap';

import Header from '../components/Header';
import Hamburger from '../components/Hamburger';

import qr from '../../images/hamburger-qr.png';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';


class  HamburgerPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Jumbotron>
                    <Grid style={{position: 'relative'}}>
                        <h2>Hamburger Menu Example</h2>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col sm={6} md={6} lg={6}>
                            <Hamburger/>
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                            <a 
                                className="hamburger__qr-container"
                                href="#/Hamburger/Touch"
                            >
                                <img className="hamburger__qr" src={qr} alt="QR Code" />
                                <div className="hamburger__qr-caption">Mobile Specific View</div>
                            </a>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default HamburgerPage;
