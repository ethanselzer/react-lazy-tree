export default `
<ReactLazyTree {...{
    data,

    mapInitialActiveNode: (node) => {
        const nodeParams = decodeURIComponent(getHalHref(node));
        const uriParams = this.props.params.splat;
        return uriParams === nodeParams;
    },

    mapListClassName: ({ depth }) => {
        const listDepth = \`catalog__list--depth-\${depth } \`;
        return \`catalog__list \${listDepth } \`;
    },

    mapListItemClassName: ({ depth }) => {
        return \`catalog__node--depth-\${depth } \`;
    },

    mapNodeContent: ({ depth, index, isActiveNode, node }) => {
        if (depth === 1 && index > 0) {
            return false;
        }

        return depth > 1 ? getLink(isActiveNode, node) : node.label;
    },

    interactiveStartDepth: 2
}}/>

function getLink(isActiveNode, node) {
    return (
        <Link {...{
            className: \`catalog__link \${isActiveNode ? 'catalog__link--active' : '' }\`,
            to: \`/Catalog\${getHalHref(node)}\`
        }}>
            {node.label}
        </Link>
    );
}

function getHalHref(node) {
    return node._links['http://example.com/rels/catalog'].href;
}
`
