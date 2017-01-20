export default `
<ReactLazyTree {...{
    data,

    mapListClassName: () => 'viewer',

    mapListItemClassName: ({ depth }) => {
        return \`viewer__node--depth-\${depth}\`;
    },

    mapNodeContent: ({ node }) => node.label,

    interactiveStartDepth: -1,

    shouldShowAllNodes: true,
}}/>
`;
