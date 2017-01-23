import React from 'react';
import noop from 'lodash.noop';
import omit from 'lodash.omit';

class TreeNode extends React.Component {
    /* istanbul ignore next */
    constructor(props) {
        super(props);

        this.state = this._getInitialState();

        this.onActiveNodeChanged = this.onActiveNodeChanged.bind(this);

        this.deferAnimateChildrenInvisibleDuration = 100;
    }

    _getInitialState() {
        const {
            verticalAnimationConfig,
            shouldShowAllNodes
        } = this.props;
        const defaultConfig = TreeNode.defaultProps.verticalAnimationConfig;
        const config = Object.assign({}, defaultConfig, verticalAnimationConfig);
        const transitionValue = `height ${config.durationInMs}ms ${config.timing}`;
        const height = shouldShowAllNodes ? 'auto' : '0px';

        return {
            childrenContainerStyle: {
                height,
                overflow: 'hidden',
                transition: transitionValue,
                WebkitTransition: transitionValue
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const hasActiveNodeChanged = nextProps.activePath !== this.props.activePath;

        if (!hasActiveNodeChanged || !this.isBranchNode()) {
            return;
        }

        if (this.isActiveNode(nextProps) && !this.areChildrenVisbile()) {
            this.animateChildrenVisible();
        } else if (!this.isOnActivePath(nextProps) && this.areChildrenVisbile()) {
            this.animateChildrenInvisible();
        }
    }

    componentDidMount() {
        if (!this.isBranchNode()) {
            return;
        }

        if (this.isOnActivePath(this.props)) {
            this.setChildrenVisible();
        }
    }

    onActiveNodeChanged(e) {
        e.stopPropagation();

        const { currentPath, depth, index, node } = this.props;
        this.props.onActiveNodeChanged(e, node, depth, index, currentPath);
    }

    render() {
        if (this.isRootNode()) {
            return this.getRootNode();
        }

        if (this.isBranchNode()) {
            return this.getBranchNode();
        }

        return this.getLeafNode();
    }

    getRootNode() {
        const {
            depth,
            mapListClassName,
            node
        } = this.props;

        return (
            <ul className={mapListClassName({ depth, isOnActivePath: true, node })}>
                {this.getChildNodes(Object.assign({}, omit(this.props, 'node'), { nodes: node }))}
            </ul>
        );
    }

    getBranchNode() {
        const {
            childrenPropertyName,
            depth,
            index,
            mapListClassName,
            mapListItemClassName,
            mapNodeContent,
            node,
            shouldLazyRender,
            shouldShowAllNodes
        } = this.props;

        const isOnActivePath = this.isOnActivePath(this.props);
        const isActiveNode = this.isActiveNode(this.props);
        const shouldRenderChildren = (
            isOnActivePath ||
            !shouldLazyRender ||
            this.hasRenderedChildren() ||
            shouldShowAllNodes
        );

        return (
            <li {...{
                className: mapListItemClassName({
                    depth,
                    isActiveNode,
                    isLeafNode: false,
                    isOnActivePath,
                    node
                }),
                onClick: this.onActiveNodeChanged
            }}>
                {mapNodeContent({
                    depth,
                    index,
                    isActiveNode,
                    isLeafNode: false,
                    isOnActivePath,
                    node
                })}
                {shouldRenderChildren && (
                    <div style={this.state.childrenContainerStyle}>
                        <ul {...{
                            className: mapListClassName({
                                depth: depth + 1,
                                isOnActivePath,
                                node
                            }),
                            ref: (el) => {
                                this.el = el;
                            }
                        }}>
                            {this.getChildNodes(Object.assign({}, this.props, {
                                depth: depth + 1,
                                nodes: node[childrenPropertyName]
                            }))}
                        </ul>
                    </div>
                )}
            </li>
        );
    }

    getLeafNode() {
        const {
            depth,
            index,
            mapListItemClassName,
            mapNodeContent,
            node,
        } = this.props;

        const isActiveNode = this.isActiveNode(this.props);
        const isOnActivePath = isActiveNode;
        const isLeafNode = true;

        return (
            <li {...{
                className: mapListItemClassName({
                    depth,
                    isActiveNode,
                    isLeafNode,
                    isOnActivePath,
                    node
                }),
                onClick: this.onActiveNodeChanged
            }}>
                {mapNodeContent({
                    depth,
                    index,
                    isActiveNode,
                    isLeafNode,
                    isOnActivePath,
                    node
                })}
            </li>
        );
    }

    getChildNodes(props) {
        const { currentPath, nodes } = props;
        return nodes.map((node, index) => {
            const newPath = this.getNewPath(currentPath, index);
            return (
                <TreeNode {...props} {...{
                    index,
                    node,
                    currentPath: newPath,
                    key: index
                }} />
            );
        });
    }

    setChildrenContainerHeight(height, cb) {
        this.setState({
            childrenContainerStyle: Object.assign({}, this.state.childrenContainerStyle, { height: `${height}` })
        }, cb);
    }

    setChildrenVisible() {
        this.setChildrenContainerHeight('auto');
    }

    animateChildrenVisible() {
        setTimeout(() => {
            this.setChildrenContainerHeight(`${this.el.clientHeight}px`);
            setTimeout(() => {
                this.setChildrenContainerHeight('auto');
            }, this.props.verticalAnimationConfig.durationInMs);
        }, 0);
    }

    animateChildrenInvisible() {
        this.setChildrenContainerHeight(`${this.el.clientHeight}px`);
        setTimeout(() => {
            this.setChildrenContainerHeight('0px');
        }, this.deferAnimateChildrenInvisibleDuration);
    }

    isOnActivePath(props) {
        const { activePath, currentPath, depth } = props;
        const ap = this.getPathAtDepth(activePath, depth);
        const cp = this.getPathAtDepth(currentPath, depth);

        return ap === cp;
    }

    getNewPath(currentPath, index) {
        return `${currentPath}${currentPath ? ',' : ''}${index}`;
    }

    getPathAtDepth(path, depth) {
        return path.split(',').slice(0, depth + 1).join();
    }

    isRootNode() {
        return Array.isArray(this.props.node);
    }

    isBranchNode() {
        const { node, childrenPropertyName } = this.props;
        return this.hasChildren(node, childrenPropertyName);
    }

    isActiveNode(props) {
        const { activePath, currentPath } = props;

        return activePath === currentPath;
    }

    hasChildren(node, childrenPropertyName) {
        return !!(node[childrenPropertyName] && node[childrenPropertyName].length);
    }

    hasRenderedChildren() {
        return !!this.el;
    }

    areChildrenVisbile() {
        return this.state.childrenContainerStyle.height !== '0px';
    }
}

TreeNode.displayName = 'TreeNode';

TreeNode.defaultProps = {
    depth: 0,
    childrenPropertyName: 'children',
    currentPath: '',
    mapListClassName: noop,
    mapListItemClassName: noop,
    mapNodeContent: noop,
    onActiveNodeChanged: noop,
    shouldLazyRender: true,
    shouldShowAllNodes: false,
    verticalAnimationConfig: {
        durationInMs: 300,
        timing: 'ease-in'
    }
};

export default TreeNode;
