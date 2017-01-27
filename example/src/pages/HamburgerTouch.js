import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Hamburger from '../components/Hamburger';

class  HamburgerTouchPage extends Component {
    render() {
        return (
            <div style={{
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
                backgroundColor: '#333',
                overflow:'scroll'
            }}>
                <Helmet title="Hamburger Touch | React Lazy Tree" />
                <Hamburger/>
            </div>
        );
    }
}

export default HamburgerTouchPage;
