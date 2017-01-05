import React, { Component } from 'react';
import {
  Col,
  Grid,
  Jumbotron,
  Row
} from 'react-bootstrap';

import Header from '../components/Header';
import Hamburger from '../components/Hamburger';

import qr from '../../images/hamburger-qr.png';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/app.css';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import js from 'highlight.js/lib/languages/javascript';
import solarized from 'react-syntax-highlighter/dist/styles/solarized-light';

registerLanguage('javascript', js);

const codeString = `
<ReactLazyTree {...{
    data: data.nodes,

    mapInitialActiveNode: (node) => {
        return node.label === 'Dresses';
    },

    mapListItemClassName: ({ depth, isLeafNode, isOnActivePath }) => {
        const icon = isLeafNode
            ? 'hamburger__node--leaf'
            : \`hamburger__node--\${isOnActivePath ? 'expanded' : 'contracted'}\`;
        const leaf = \`\${isOnActivePath && isLeafNode ? 'hamburger__node--active' : ''}\`;
        const nodeDepth = \`hamburger__node--depth-\${depth}\`;

        return \`hamburger__node \${nodeDepth} \${leaf} \${icon}\`;
    },

    mapListClassName: ({ depth }) => {
        const hamburgerDepth = \`hamburger--depth-\${depth}\`;

        return \`hamburger \${hamburgerDepth}\`;
    },

    mapNodeContent: ({ depth, node }) => {
        const base = 'hamburger__label';
        const modifier = \`hamburger__label--depth-\${depth}\`;
        const deselect = 'hamburger--deselect';
        const className = \`\${base} \${modifier} \${deselect}\`;

        return (
            <Label className={className} text={node.label} />
        );
    }
}} />`;



class  HamburgerPage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Jumbotron>
                    <Grid style={{position: 'relative'}}>
                        <h2>Hamburger Menu Example</h2>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col sm={6} md={4} lg={4}>
                            <Hamburger/>
                        </Col>
                        <Col sm={6} md={8} lg={8}>
                            <a
                                className="hamburger__qr-container"
                                href="#/Hamburger/Touch"
                            >
                                <img className="hamburger__qr" src={qr} alt="QR Code" />
                                <div className="hamburger__qr-caption">Mobile Specific View</div>
                            </a>

                            <SyntaxHighlighter language='javascript' style={solarized}>
                                {codeString}
                            </SyntaxHighlighter>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default HamburgerPage;
