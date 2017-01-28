import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactLazyTree from 'react-lazy-tree';

import data from '../../data/tree';

import '../../styles/catalog.css';

class Catalog extends Component {
    render() {
        const uriParams = this.props.params.splat || '/Women/Clothing';

        return (
            <ReactLazyTree {...{
                data: data.nodes[0],

                mapInitialActiveNode: (node) => {
                    const nodeParams = decodeURIComponent(getHalHref(node));
                    return  uriParams === nodeParams;
                },

                mapListClassName: ({ depth }) => {
                    const listDepth = `catalog__list--depth-${depth}`;
                    return `catalog__list ${listDepth}`;
                },

                mapListItemClassName: ({ depth }) => {
                    return `catalog__node--depth-${depth}`;
                },

                mapNodeContent: ({ depth, index, isActiveNode, node }) => {
                    if (depth === 1 && index > 0) {
                        return false;
                    }

                    return depth > 1 ? getLink(isActiveNode, node) : node.label;
                },

                interactiveStartDepth: 2
            }}/>
        );
    }
}

function getLink(isActiveNode, node) {
    return (
        <Link {...{
            className: `catalog__link ${isActiveNode ? 'catalog__link--active' : ''}`,
            to: `/Catalog${getHalHref(node)}`
        }}>
            {node.label}
        </Link>
    );
}

function getHalHref(node) {
    return node._links['http://example.com/rels/catalog'].href;
}

export default Catalog;
