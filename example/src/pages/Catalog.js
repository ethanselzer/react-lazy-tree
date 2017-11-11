import React, { Component } from 'react';
import {
  Col,
  Grid,
  Jumbotron,
  Row
} from 'react-bootstrap';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import solarized from 'react-syntax-highlighter/dist/styles/solarized-light';
import js from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import Helmet from 'react-helmet';

import Catalog from '../components/Catalog';
import Header from '../components/Header';
import codeString from '../code-examples/catalog';
import cssString from '../code-examples/catalog-css';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.css';

registerLanguage('javascript', js);
registerLanguage('css', css);

class  CatalogPage extends Component {
    render() {
        return (
            <div>
                <Helmet title="Category Menu | React Lazy Tree" />
                <Header {...this.props}/>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col sm={12}>
                                <h2>Category Menu Example</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={5}>
                                <ul className="examples__summary-list">
                                    <li>Sidebar category navigation use case</li>
                                    <li>Interactivity constrained to third level and below</li>
                                    <li>Hidden nodes lazily rendered when becoming visible</li>
                                </ul>
                            </Col>
                            <Col sm={5}>
                                <ul className="examples__summary-list">
                                    <li>Information relationship expressed through typography</li>
                                    <li>Initial node selection of deep links</li>
                                    <li>
                                        Code:&nbsp;
                                        <a href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/src/components/Catalog.js">
                                            JS
                                        </a>
                                        &nbsp;
                                        <a href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/styles/catalog.css">
                                            CSS
                                        </a>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col sm={6} md={4} lg={4}>
                            <Catalog {...this.props}/>
                        </Col>
                        <Col sm={6} md={8} lg={8}>
                            <a
                                className="highlighter"
                                href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/src/components/Catalog.js"
                            >
                                <SyntaxHighlighter language='javascript' style={solarized}>
                                    {codeString}
                                </SyntaxHighlighter>
                            </a>
                            <a
                                className="highligher"
                                href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/styles/catalog.css"
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

export default CatalogPage;
