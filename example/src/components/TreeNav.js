import React from 'react';

export default class TreeNav extends React.Component {
    componentDidMount() {
        if (this.isActiveNode()) {
            this.el.focus();
        }
    }

    isActiveNode() {
        const { isLeafNode, isOnActivePath } = this.props;
        return isLeafNode && isOnActivePath;
    }

    getButtonStyle() {
        return {
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0px',
            color: '#fff',
            font: '16px Arial'
        };
    }

    getAnchorStyle() {
        return {
            color: '#fff'
        };
    }

    render() {
        const { depth, index, isLeafNode, label } = this.props;
        const tabIndex = (depth + 1) * 100 + index;
        const button = <button {...{tabIndex, style: this.getButtonStyle()}}>{label}</button>;
        const anchor = (
            <a {...{
                tabIndex, 
                href: 'http://example.com', 
                ref: (el) => this.el = el,
                style: this.getAnchorStyle()
            }}>{label}</a>
        );

        return isLeafNode ? anchor : button;
    }
}