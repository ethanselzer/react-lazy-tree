import React, { Component } from 'react';

import Header from '../components/Header';

import hamburger from '../../images/hamburger.png';
import catalog from '../../images/catalog.png';
import qr from '../../images/hamburger-qr.png';
import viewer from '../../images/viewer.png';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

import {
    Clearfix,
    Col,
    Grid,
    Jumbotron,
    Row,
    Thumbnail
} from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <div>
                <Header {...this.props} />
                <Jumbotron>
                    <Grid>
                        <h1>Examples</h1>
                        <p className="examples__summary">
                            React Lazy Tree is a UI component that recursively renders tree data structures.<br/>
                            Control content, markup, and style using familiar patterns.<br/>
                            Specify vertical animation, initial active node, and more through
                            flexible <a href="https://github.com/ethanselzer/react-lazy-tree#props-api">
                                configuration options
                            </a>.
                        </p>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <Thumbnail {...{
                                alt: 'Hamburger menu example',
                                className: 'examples__thumbnail',
                                href: '#/Hamburger',
                                src: hamburger
                            }}>
                                <h3>Hamburger Menu</h3>
                                <p>Touch support</p>
                                <p>Branch and leaf icons</p>
                                <img className="examples__hamburger-qr" src={qr} alt="QR Code" />
                            </Thumbnail>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <Thumbnail {...{
                                alt: 'Category navigation example',
                                className: 'examples__thumbnail',
                                href: '#/Catalog/Women/Clothing/Dresses/Work',
                                src: catalog
                            }}>
                                <h3>Category Navigation</h3>
                                <p>Interactivity constrained to subclass nodes</p>
                                <p>Deep linking</p>
                            </Thumbnail>
                        </Col>
                        <Clearfix visibleSmBlock />
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <Thumbnail {...{
                                alt: 'Tree viewer example',
                                className: 'examples__thumbnail',
                                href: '#/Viewer',
                                src: viewer
                            }}>
                                <h3>Tree Viewer</h3>
                                <p>Show all nodes</p>
                                <p>Interactivity disabled</p>
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
