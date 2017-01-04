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
        <Header />
        <Jumbotron>
          <Grid>
            <h1>Examples</h1>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row>
            <Col xs={12} sm={6} md={4} lg={3}>
              <Thumbnail {...{
                  alt: 'hamburger menu example',
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
                  className: 'examples__thumbnail',
                  src: catalog,
                  href: '#/Catalog/Women/Clothing/Dresses/Work',
                  alt: 'category navigation example'
              }}>
                <h3>Category Navigation</h3>
                <p>Interactivity constrained to subclass nodes</p>
                <p>Deep linking</p>
              </Thumbnail>
            </Col>
            <Clearfix visibleSmBlock/>
            <Col xs={12} sm={6} md={4} lg={3}>
                <Thumbnail {...{
                    className: 'examples__thumbnail',
                    src: viewer,
                    href: '#/Viewer',
                    alt: 'tree viewer example'
                }}>
                    <h3>Tree Viewer</h3>
                    <p>Show all nodes</p>
                    <p>Interactivity suppressed</p>
                </Thumbnail>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
