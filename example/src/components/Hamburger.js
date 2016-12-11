import React, { Component } from 'react';
import data from '../../data/tree';
import ReactLazyTree from '../../../dist/ReactLazyTree';
import Label from '../components/Label';
import '../../styles/hamburger.css';

class Hamburger extends Component {
    render() {
        return (
            <ReactLazyTree {...{
                data: data.nodes,
                
                mapInitialActiveNode: (node) => {
                    return node.label === 'Dresses';
                },

                mapListItemClassName: ({ depth, isLeafNode, isOnActivePath }) => {
                    const icon = isLeafNode
                        ? 'hamburger__node--leaf' 
                        : `hamburger__node--${isOnActivePath ? 'expanded' : 'contracted'}`;
                    const leaf = `${isOnActivePath && isLeafNode ? 'hamburger__node--active' : ''}`;
                    const nodeDepth = `hamburger__node--depth-${depth}`;

                    return `hamburger__node ${nodeDepth} ${leaf} ${icon}`;
                },

                mapListClassName: ({ depth }) => {
                    const hamburgerDepth = `hamburger--depth-${depth}`;

                    return `hamburger ${hamburgerDepth}`;
                },

                mapNodeContent: ({ depth, node }) => {
                    const className = `hamburger__label hamburger__label--depth-${depth} hamburger--deselect`;
                    
                    return (
                        <Label className={className} text={node.label}/>
                    );
                }
            }}/>
        );
    }
}

export default Hamburger;
