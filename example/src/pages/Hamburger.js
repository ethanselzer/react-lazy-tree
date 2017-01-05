import React, { Component } from 'react';
import {
  Col,
  Grid,
  Jumbotron,
  Row
} from 'react-bootstrap';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import js from 'highlight.js/lib/languages/javascript';
import solarized from 'react-syntax-highlighter/dist/styles/solarized-light';
import css from 'highlight.js/lib/languages/css';

import Header from '../components/Header';
import Hamburger from '../components/Hamburger';
import codeString from '../code-examples/hamburger';
import cssString from '../code-examples/hamburger-css';

import qr from '../../images/hamburger-qr.png';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

registerLanguage('javascript', js);
registerLanguage('css', css);

class  HamburgerPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Jumbotron>
                    <Grid style={{position: 'relative'}}>
                        <h2>Hamburger Menu Example</h2>
                        <p className="examples__summary">
                            Showcases mapping content and style to tree nodes.
                            Code sample below illustrates the power and
                            flexibility afforded by this simple API.
                            View the  <a href="https://github.com/ethanselzer/react-lazy-tree#props-api">
                                API docs
                            </a> for more options. Scan the QR code for a mobile specific version of this example.
                        </p>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col sm={6} md={4} lg={4}>
                            <Hamburger/>
                        </Col>
                        <Col sm={6} md={8} lg={8}>
                            <a
                                className="hamburger__qr-container"
                                href="#/Hamburger/Touch"
                            >
                                <img className="hamburger__qr" src={qr} alt="QR Code" />
                                <div className="hamburger__qr-caption">Mobile Specific View</div>
                            </a>
                            <SyntaxHighlighter language='javascript' style={solarized}>
                                {codeString}
                            </SyntaxHighlighter>
                            <SyntaxHighlighter language='css' style={solarized}>
                                {cssString}
                            </SyntaxHighlighter>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default HamburgerPage;
