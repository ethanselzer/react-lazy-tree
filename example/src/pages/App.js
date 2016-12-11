import React, { Component } from 'react';

import Header from '../components/Header';

import hamburger from '../../images/hamburger.png';
// import catalog from '../../public/catalog-150-crop.png';
import catalog from '../../images/catalog.png';
import qr from '../../images/hamburger-qr.png';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

import {
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
            <Col sm={6} md={6} lg={6}>
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
            <Col sm={6} md={6} lg={6}>
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
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
