import React, { Component } from 'react';

import Viewer from '../components/Viewer';
import Header from '../components/Header';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

import {
  Col,
  Grid,
  Jumbotron,
  Row
} from 'react-bootstrap';


class  ViewerPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Jumbotron>
                    <Grid>
                        <h2>Tree Viewer Example</h2>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col>
                            <Viewer {...this.props}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ViewerPage;
