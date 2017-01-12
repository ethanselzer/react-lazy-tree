export default `
.hamburger {
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: hidden;
    font-size: 16px;
}

.hamburger__node {
    border-top: solid 1px #282828;
    position: relative;
    color: white;
    cursor: pointer;
}

.hamburger__node--active {
    color: #ab2121;
    cursor: default;
}

.hamburger__node--contracted::before {
    position: absolute;
    top: 9px;
    right: 12px;
    content: '+';
    font: 20px/1 Arial;
    color: white;
    z-index: 1;
}

.hamburger__node--expanded::before {
    position: absolute;
    top: 6px;
    right: 14px;
    content: '-';
    font: 24px/1 Arial;
    color: white;
    z-index: 1;
}

.hamburger__node--leaf::before {
    position: absolute;
    top: 13px;
    right: 6px;
    content: '〉';
    font: 13px/1 Arial;
    color: white;
}

.hamburger__node--depth-0 {
    background-color: #333;
}

.hamburger__node--depth-1 {
    background-color: #3e3e3e;
}

.hamburger__node--depth-2 {
    background-color: #575757;
}

.hamburger__node--depth-3 {
    background-color: #878787;
}

.hamburger__label {
    padding: 10px 0;
    display: inline-block;
}

.hamburger__label--depth-0 {
    padding-left: 12px;
}

.hamburger__label--depth-1 {
    padding-left: 28px;
}

.hamburger__label--depth-2 {
    padding-left: 56px;
}

.hamburger__label--depth-3 {
    padding-left: 84px;
}

.hamburger__label--deselect {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-touch-callout: none;
    user-select: none;
}
`
