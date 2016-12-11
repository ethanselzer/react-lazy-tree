# react-lazy-tree

Recursively render tree data structures.

Control tree node markup, content and style.

Render lazily or greedily.

Specify vertical animation, CSS classes, initial active node, [and more](#props-api).

## Demo
Please see [demo site](https://ethanselzer.github.io/react-lazy-tree) and [example code](https://github.com/ethanselzer/react-lazy-tree/tree/master/example).

## Installation

```sh
npm install --save react-lazy-tree
```

## Usage

```JSX
import ReactLazyTree from 'react-lazy-tree'

...

<ReactLazyTree {...{
    data: tree,
    
    mapInitialActiveNode: (node) => {
        return node.label === 'Dresses';
    },

    mapListClassName: ({ depth }) => {
        const exampleDepth = `example--depth-${depth}`;

        return `example ${exampleDepth}`;
    },

    mapListItemClassName: ({ isOnActivePath }) => {
        const modifier = isOnActivePath ? 'expanded' : 'contracted';
        const nodeIcon = `example__node--${modifier}`;

        return `example__node ${nodeIcon}`;
    },

    mapNodeContent: ({ depth, isActiveNode }) => {
        const labelDepth = `example__label--${depth}`;
        const isActive = isActiveNode ? 'example__label--active' : '';
        const className = `example__label ${labelDepth} ${isActive}`;
        
        return (
            <Label {...{
                className,
                text: node.label
            }}/>
        );
    },

    onActiveNodeChanged: activeNodeChangedHandler
}}/>
```

### Props API

<table>
<tr>
<td style="color: red; font-weight: bold">foo</td><td>bar</td>
</tr>
</table>

`data` - Tree data structure, or a collection of tree data structures.
* Type: Object | array
* Required: Yes

`mapNodeContent` - Specify content, markup, and style for tree node presentation.
* Type: Function
* Required: Yes
* Parameters:
    * `depth`: Number
    * `index`: Number
    * `isActiveNode`: Boolean
    * `isLeafNode`: Boolean
    * `isOnActivePath`: Boolean
    * `node`: Object
* Return Type: String | JSX
* Notes: Parameters are [named](http://www.2ality.com/2011/11/keyword-parameters.html) (i.e. properties of an object). 

`childrenPropertyName` - Specify data node children property name.
* Type: String
* Required: No
* Default: `children`

`mapListClassName` - Specify HTML list (UL) class names.
* Type: Function
* Required: No
* Parameters:
    * `depth`: Number
    * `isOnActivePath`: Boolean
    * `node`: Object
* Return Type: String
* Notes: Parameters are [named](http://www.2ality.com/2011/11/keyword-parameters.html) (i.e. properties of an object).

`mapListItemClassName` - Specify HTML list-item (LI) class names.
* Type: Function
* Required: No
* Parameters:
    * `depth`: Number
    * `isActiveNode`: Boolean
    * `isLeafNode`: Boolean
    * `isOnActivePath`: Boolean
    * `node`: Object
* Return Type: String
* Notes: Parameters are [named](http://www.2ality.com/2011/11/keyword-parameters.html) (i.e. properties of an object).

`mapInitialActiveNode` - Specify a node that should be active initially.
* Type: Function
* Required: No
* Parameters:
    * `node`: Object
* Return Type: Boolean
* Notes: Returns first match. Multiple active nodes not yet supported.

`onActiveNodeChanged` - Handle active node changes as a result of user interaction.
* Type: Function
* Required: No
* Parameters:
    * `activePath`: String
    * `depth`: Number
    * `e`: Object
    * `index`: Number
    * `node`: Object
* Notes: Parameters are [named](http://www.2ality.com/2011/11/keyword-parameters.html) (i.e. properties of an object).

`interactiveStartDepth` - Specify at what depth the rendered tree should become interactive.
* Type: Number
* Required: No
* Default: 0

`shouldLazyRender` - Specify should tree nodes be rendered when becoming visible or at mount time.

* Type: Boolean
* Required: No
* Default: true

`shouldShowAllNodes` - Specify the entire tree should be rendered initially.
* Type: Boolean
* Required: No
* Default : false
* Notes: Overrides `shouldLazyRender`

`verticalAnimationConfig` - Specify CSS transition duration and timing.
* Type: Object
* Required: No
* Properties:
    * `durationInMs`: Number
    * `timing`: [Keyword | Function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)
* Default:
    * `durationInMs`: 300
    * `timing`: ease-in

## Support

Please [open an issue](https://github.com/ethanselzer/react-lazy-tree/issues).

## Development

```ssh
git clone https://github.com/ethanselzer/react-lazy-tree.git
cd react-lazy-tree
npm install
```
See available commands:
```ssh
npm run
```

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch,
add commits, and [open a pull request](https://github.com/ethanselzer/react-lazy-tree/compare/).
