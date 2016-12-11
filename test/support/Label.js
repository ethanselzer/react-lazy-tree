import React from 'react';

class Label extends React.Component {
    render() {
        const {className, text} = this.props;

        return <span className={className}>{text}</span>;
    }
}

Label.defaultProps = {
    text: 'default label',
    className: 'deault-class'
}

export default Label;
