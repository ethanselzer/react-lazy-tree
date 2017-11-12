import React, { Component } from 'react';
import ReactLazyTree from 'react-lazy-tree';

import data from '../data/tree.json';

import '../styles/viewer.css';

class Viewer extends Component {
    render() {

        return (
            <ReactLazyTree {...{
                data: data.nodes[1],

                mapListClassName: () => 'viewer',

                mapListItemClassName: ({ depth }) => {
                    return `viewer__node--depth-${depth}`;
                },

                mapNodeContent: ({ node }) => node.label,

                interactiveStartDepth: -1,

                shouldShowAllNodes: true,
            }}/>
        );
    }
}

export default Viewer;
