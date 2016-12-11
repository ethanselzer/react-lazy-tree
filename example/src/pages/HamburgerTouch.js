import React, { Component } from 'react';
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
                <Hamburger/>
            </div>
        );
    }
}

export default HamburgerTouchPage;
