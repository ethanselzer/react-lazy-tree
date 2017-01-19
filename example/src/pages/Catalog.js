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

import Catalog from '../components/Catalog';
import Header from '../components/Header';
import codeString from '../code-examples/catalog';
import cssString from '../code-examples/catalog-css';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

registerLanguage('javascript', js);
registerLanguage('css', css);

class  CatalogPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Jumbotron>
                    <Grid>
                        <h2>Catalog Menu Example</h2>
                        <p className="examples__summary">
                            Information relationship expressed through typography.<br/>
                            Interactivity constrained to third level and below.<br/>
                            Supports initial selection of deep links.
                        </p>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col sm={6} md={4} lg={4}>
                            <Catalog {...this.props}/>
                        </Col>
                        <Col sm={6} md={8} lg={8}>
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

export default CatalogPage;
