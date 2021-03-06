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

import Viewer from '../components/Viewer';
import Header from '../components/Header';
import codeString from '../code-examples/viewer';
import cssString from '../code-examples/viewer-css';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/app.css';

registerLanguage('javascript', js);
registerLanguage('css', css);

class  ViewerPage extends Component {
    render() {
        return (
            <div>
                <Helmet title="Viewer | React Lazy Tree" />
                <Header {...this.props}/>
                <Jumbotron>
                    <Grid>
                        <h2>Tree Viewer Example</h2>
                        <ul className="examples__summary-lsit">
                            <li>Tree visualization use case</li>
                            <li>Show all nodes</li>
                            <li>Suppress interactivity</li>
                            <li>
                                Code:&nbsp;
                                <a href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/src/components/Viewer.js">
                                    JS
                                </a>
                                &nbsp;
                                <a href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/styles/viewer.css">
                                    CSS
                                </a>
                            </li>
                        </ul>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col sm={6} md={4} lg={4}>
                            <Viewer {...this.props}/>
                        </Col>
                        <Col sm={6} md={8} lg={8}>
                                                        <a
                                className="highlighter"
                                href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/src/components/Viewer.js"
                            >
                                <SyntaxHighlighter language='javascript' style={solarized}>
                                    {codeString}
                                </SyntaxHighlighter>
                            </a>
                            <a
                                className="highlighter"
                                href="https://github.com/ethanselzer/react-lazy-tree/blob/master/example/styles/viewer.css"
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

export default ViewerPage;
