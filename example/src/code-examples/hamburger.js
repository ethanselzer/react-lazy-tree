export default `
<ReactLazyTree {...{
    data: nodes,

    mapInitialActiveNode: (node) => {
        return node.label === 'Dresses';
    },

    mapListClassName: () => 'hamburger',

    mapListItemClassName: ({ depth, isLeafNode, isOnActivePath }) => {
        const icon = isLeafNode
            ? 'hamburger__node--leaf'
            : \`hamburger__node--\${isOnActivePath ? 'expanded' : 'contracted'}\`;
        const leaf = \`\${isOnActivePath && isLeafNode ? 'hamburger__node--active' : ''}\`;
        const nodeDepth = \`hamburger__node--depth-\${depth}\`;

        return \`hamburger__node \${nodeDepth} \${leaf} \${icon}\`;
    },

    mapNodeContent: ({ depth, node }) => {
        const base = 'hamburger__label';
        const modifier = \`hamburger__label--depth-\${depth}\`;
        const deselect = 'hamburger__label--deselect';
        const className = \`\${base} \${modifier} \${deselect}\`;

        return (
            <Label className={className} text={node.label} />
        );
    }
}}/>`;
