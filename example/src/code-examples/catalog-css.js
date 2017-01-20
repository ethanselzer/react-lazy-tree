export default `
.catalog__list {
    width: 200px;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    color: #333;
}

.catalog__list--depth-0 {
    margin: -15px 20px 20px 20px;
}

.catalog__node--depth-0 {
    font: 28px/2 Arial;
}

.catalog__node--depth-1 {
    font: 18px/2 Arial;
    text-transform: uppercase;
}

.catalog__node--depth-2 {
    text-transform: none;
    font: 14px  Arial
}

.catalog__node--depth-3 {
    margin-left: 15px;
    font: 12px Arial;
}

.catalog__link:link, .catalog__link:visited, .catalog__link:active {
    padding: 6px 6px;
    display: block;
    color: #333;
    text-decoration: none;
}

.catalog__link:hover {
    color: #16829e;
    text-decoration: none;
}

.catalog__link--active, .catalog__link--active:hover {
    background-color: #eee;
    color: #333;
    cursor: default;
}
`;
