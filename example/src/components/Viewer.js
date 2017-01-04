import React, { Component } from 'react';
import ReactLazyTree from 'react-lazy-tree';
import data from '../../data/tree';
import '../../styles/viewer.css';

class Viewer extends Component {
    render() {

        return (
            <ReactLazyTree {...{
                data: data.nodes[1],

                mapListClassName: () => 'viewer__list',

                mapListItemClassName: ({ depth }) => {
                    return `viewer__node--depth-${depth}`;
                },

                mapNodeContent: ({ node }) => {
                    return node.label;
                },

                interactiveStartDepth: -1,

                shouldShowAllNodes: true,
            }}/>
        );
    }
}

export default Viewer;
