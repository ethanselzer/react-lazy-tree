import React from 'react';

export default class Label extends React.Component {
    render() {
        const { className, text } = this.props;
        return <span className={className}>{text}</span>;
    }
}