import React, { Component } from 'react';

import Catalog from '../components/Catalog';
import Header from '../components/Header';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

import { 
  Col,
  Grid,
  Jumbotron,
  Row
} from 'react-bootstrap';


class  CatalogPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Jumbotron>
                    <Grid>
                        <h2>Catalog Menu Example</h2>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col>
                            <Catalog {...this.props}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default CatalogPage;
