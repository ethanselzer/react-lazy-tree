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
import Helmet from 'react-helmet';

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
                <Helmet title="Hamburger Menu | React Lazy Tree" />
                <Header {...this.props}/>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col sm={12}>
                                <h2>Hamburger Menu Example</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={5}>
                                <ul className="examples__summary-list">
                                    <li>Map content and style to tree nodes</li>
                                    <li>llustrates control and flexibility afforded by props API</li>
                                    <li>View  <a href="https://github.com/ethanselzer/react-lazy-tree#props-api">
                                        API docs
                                    </a> for more options</li>
                                    <li>Scan QR code for a mobile specific version of example</li>
                                    <li>
                                        Code:&nbsp;
                                        <a href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/src/components/Hamburger.js">
                                            JS
                                        </a>
                                        &nbsp;
                                        <a href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/styles/hamburger.css">
                                            CSS
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                            <Col sm={7}>
                                <a href="#/Hamburger/Touch">
                                    <img className="hamburger__qr" src={qr} alt="QR Code" />
                                </a>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col sm={6} md={4} lg={4}>
                            <Hamburger/>
                        </Col>
                        <Col sm={6} md={8} lg={8}>
                            <a
                                className="highlighter"
                                href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/src/components/Hamburger.js"
                            >
                                <SyntaxHighlighter language='javascript' style={solarized}>
                                    {codeString}
                                </SyntaxHighlighter>
                            </a>
                            <a
                                className="highlighter"
                                href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/styles/hamburger.css"
                            >
                                <SyntaxHighlighter language='css' style={solarized}>
                                    {cssString}
                                </SyntaxHighlighter>
                            </a>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default HamburgerPage;
