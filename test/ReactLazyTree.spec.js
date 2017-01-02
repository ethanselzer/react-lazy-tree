import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ReactLazyTree from '../src/ReactLazyTree';
import {women, men, kids} from './fixtures/tree';
import collection from './fixtures/collection';
import Label from './support/Label';
import TreeNode from '../src/TreeNode';

describe('React Lazy Tree', () => {
    let rlt;

    beforeEach(() => {
        rlt  = renderRlt({
            data: women,
            shouldLazyRender: false
        });
    });

    it('renders an unordered list', () => {
        expect(rlt[0].children[0].name).to.equal('ul');
    });

    it('renders list items', () => {
        expect(rlt.find('ul').eq(0).children()[0].name).to.equal('li');
        expect(rlt.find('ul').eq(1).children()[0].name).to.equal('li');
        expect(rlt.find('ul').eq(2).children()[0].name).to.equal('li');
    });

    it('renders recursively', () => {
        expect(rlt.find('ul').length).to.equal(3);
        expect(rlt.find('li').length).to.equal(3);
    });

    it('supports a single root node', () => {
        expect(rlt.find('ul').first().children().length).to.equal(1);
    });

    it('supports multiple root nodes', () => {
        rlt = renderRlt({
            data: [women, men]
        });

        expect(rlt.find('ul').first().children().length).to.equal(2);
    });

    describe('Active Path', () => {
        it('matches double-digit active and current paths', () => {
            rlt = mountRlt({
                data: collection[0],
                mapInitialActiveNode: (node) => {
                    return node.label === 'Jumpsuits & Rompers';
                },
                mapListClassName: ({ isOnActivePath }) => {
                    return isOnActivePath && 'list--active';
                }
            });

            expect(rlt.state('activePath')).to.equal('0,0,10');
            expect(rlt.find('ul.list--active').length).to.equal(3);
        });

        it('sets single-digit activePath', () => {
            rlt = mountRlt({
                data: collection[0],
                mapInitialActiveNode: (node) => {
                    return node.label === 'Dresses';
                },
                mapNodeContent: ({ node }) => {
                    return <Label text={node.label}/>;
                }
            });
            
            expect(rlt.state('activePath')).to.equal('0,0,1');
            rlt.find('ul').at(2).childAt(5).simulate('click');
            expect(rlt.state('activePath')).to.equal('0,0,5');

            rlt.find('ul').at(2).childAt(2).simulate('click');
            expect(rlt.state('activePath')).to.equal('0,0,2');
        });

        it('sets double-digit activePath correctly', () => {
            rlt = mountRlt({
                data: collection[0],
                mapInitialActiveNode: (node) => {
                    return node.label === 'Jumpsuits & Rompers';
                }
            });
            expect(rlt.state('activePath')).to.equal('0,0,10');

            rlt.find('ul').at(2).childAt(1).simulate('click');
            expect(rlt.state('activePath')).to.equal('0,0,1');

            rlt.find('ul').at(2).childAt(10).simulate('click');
            expect(rlt.state('activePath')).to.equal('0,0,10');
        });
    });

    describe('Toggling Node state', () => {
        it('toggles active branch node', () => {
            rlt = mountRlt({
                data: collection[0],
                mapInitialActiveNode: (node) => {
                    return node.label === 'Dresses';
                }
            });
            expect(rlt.state('activePath')).to.equal('0,0,1');
            
            rlt.find('ul').at(2).childAt(1).simulate('click');
            expect(rlt.state('activePath')).to.equal('0,0');
            
            rlt.find('ul').at(1).childAt(0).simulate('click');
            expect(rlt.state('activePath')).to.equal('0');
            
            rlt.find('ul').at(0).childAt(0).simulate('click');
            expect(rlt.state('activePath')).to.equal('');
        });

        it('toggles branch node when it is on the active path', () => {
            rlt = mountRlt({
                data: collection[0],
                mapInitialActiveNode: (node) => {
                    return node.label === 'Casual';
                }
            });
            
            expect(rlt.state('activePath')).to.equal('0,0,1,0');
            rlt.find('ul').at(2).childAt(1).simulate('click');
            expect(rlt.state('activePath')).to.equal('0,0');

            rlt.setState({activePath: '0,0,10'})
            rlt.find('ul').at(1).childAt(0).simulate('click');
            expect(rlt.state('activePath')).to.equal('0');

            rlt.setState({activePath: '0,0,0,0'})
            rlt.find('ul').at(0).childAt(0).simulate('click');
            expect(rlt.state('activePath')).to.equal('');
        });
    });

    describe('Vertical Animation', () => {
        it('sets children container height to 0px by default', () => {
            expect(rlt.find('div').eq(0).attr('style').indexOf('height:0px;')).to.be.greaterThan(-1);
        });

        it('sets children container overflow to hidden', () => {
            expect(rlt.find('div').eq(0).attr('style')).to.contain('overflow:hidden;');
        });

        it('applys vender prefixes to transition style', () => {
            const style = rlt.find('div').eq(0).attr('style');
            expect(style).to.contain('-webkit-transition:height 300ms ease-in;');
            expect(style).to.contain('transition:height 300ms ease-in;');
        });

        it('sets children container height to auto when component mounts, if node is on the active path', () => {
            rlt = mountRlt({
                data: women,
                mapInitialActiveNode: (node) => {
                    return node.label === 'Women';
                }
            });
            
            expect(rlt.find(TreeNode).at(0).render().find('div').eq(0).attr('style')).to.contain('height: auto;');
        });

        it('eventually sets children container height to auto, when node is on the active path', (done) => {
            rlt = mountRlt({
                data: women,
                shouldLazyRender: false,
                verticalAnimationConfig: {
                    durationInMs: 0
                }
            });
            expect(rlt.find(TreeNode).at(0).render().find('div').eq(0).attr('style')).to.contain('height: 0px;');

            rlt.find('li').at(0).simulate('click');
            
            setTimeout(() => {
                //Before reaching this state, it is expected the container style will
                //have transitioned to the height of the sublist'.
                expect(rlt.find(TreeNode).at(0).render().find('div').eq(0).attr('style')).to.contain('height: auto;');
                done();
            }, 10);
        });

        it('eventually sets height of children container to 0px, when node becomes inactive', (done) => {
            rlt = mountRlt({
                data: women,
                mapInitialActiveNode: (node) => {
                    return node.label === 'Clothing';
                }
            });
            expect(rlt.find(TreeNode).at(0).render().find('div').eq(0).attr('style')).to.contain('height: auto;');

            rlt.find('li').at(0).simulate('click');
            
            setTimeout(() => {
                //Before reaching this state, it is expected the container style will
                //have transitioned to the height of the sublist'.
                expect(rlt.find(TreeNode).at(0).render().find('div').eq(0).attr('style')).to.contain('height: 0px;');
                done();
            }, 100);
        });
    });

    describe('Props API', () => {
        describe('childrenPropertyName', () => {
            it('defaults to `children`', () => {
                expect(rlt.find('ul').length).to.equal(3);
                expect(rlt.find('li').length).to.equal(3);
            });

            it('can be specified', () => {
                rlt = renderRlt({
                    data: kids,
                    shouldLazyRender: false,
                    childrenPropertyName: 'embedded'
                });
                
                expect(rlt.find('ul').length).to.equal(3);
                expect(rlt.find('li').length).to.equal(3);
            });            
        });

        describe('interactiveStartDepth', () => {
            it('is interactive for nodes at a depth of 1 or greater', () => {
                rlt = mountRlt({
                    data: women,
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Dresses';
                    },
                    interactiveStartDepth: 1
                });
                expect(rlt.state().activePath).to.equal('0,0,0');

                rlt.find('li').at(0).simulate('click');
                expect(rlt.state().activePath).to.equal('0,0,0');

                //toggling to invisible
                rlt.find('li').at(1).simulate('click');
                expect(rlt.state().activePath).to.equal('0');

                rlt.find('li').at(2).simulate('click');
                expect(rlt.state().activePath).to.equal('0,0,0');
            });
           
            it('defaults to the root', () => {
                rlt = mountRlt({
                    data: women,
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Dresses';
                    }
                });
                expect(rlt.state().activePath).to.equal('0,0,0');

                //toggling to invisible
                rlt.find('li').at(0).simulate('click');
                expect(rlt.state().activePath).to.equal('');

                //toggling to visible
                rlt.find('li').at(0).simulate('click');
                expect(rlt.state().activePath).to.equal('0');

                rlt.find('li').at(1).simulate('click');
                expect(rlt.state().activePath).to.equal('0,0');
            });

            it('can disable interactivity', () => {
                rlt = mountRlt({
                    data: women,
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Dresses';
                    },
                    interactiveStartDepth: -1
                });
                expect(rlt.state().activePath).to.equal('0,0,0');

                rlt.find('li').at(1).simulate('click');

                expect(rlt.state().activePath).to.equal('0,0,0');
            });
        });

        describe('mapInitialActiveNode', () => {
            it('sets activePath prop', () => {
                rlt = shallowRlt({
                    data: [women, men],
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Dress Shirts';
                    }
                });

                expect(rlt.prop('activePath')).to.equal('1,0,0');
            });

            it('defaults to empty activePath', () => {
                rlt = shallowRlt({
                    data: [women, men]
                });

                expect(rlt.prop('activePath')).to.equal('');
            });

            it('is safe', () => {
                rlt = shallowRlt({
                    data: women,
                    mapInitialActiveNode: () => {
                        return false
                    }
                });

                expect(rlt.prop('activePath')).to.equal('');
            });
        });

        describe('mapListClassName', () => {
            it('supports node parameter', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapListClassName: ({ node }) => {
                        return `list--${node.label}`;
                    }
                });

                expect(rlt.find('ul.list--Women').length).to.equal(1);
            });

            it('supports depth parameter', () => {
                rlt = renderRlt({
                    data: [collection[0]],
                    shouldLazyRender: false,
                    mapListClassName: ({ depth }) => {
                        return `list--depth-${depth}`;
                    }
                });

                expect(rlt.find('ul.list--depth-0').length).to.equal(1);
                expect(rlt.find('ul.list--depth-1').length).to.equal(1);
                expect(rlt.find('ul.list--depth-2').length).to.equal(8);
            });

            it('supports isOnActivePath', () => {
                rlt = renderRlt({
                    data: [women, men],
                    shouldLazyRender: false,
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Dress Shirts';
                    },
                    mapListClassName: ({ isOnActivePath }) => {
                        return `${isOnActivePath ? 'list--active' : ''}`;
                    },
                });

                expect(rlt.find('ul').length).to.equal(5);
                expect(rlt.find('ul.list--active').length).to.equal(3)
            });
        });

        describe('mapListItemClassName', () => {
            it('supports node parameter', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapListItemClassName: ({ node }) => {
                        return `node--${node.label}`;
                    }
                });

                expect(rlt.find('li.node--Women').length).to.equal(1);
            });

            it('supports depth parameter', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapListItemClassName: ({ depth }) => {
                        return `node--${depth}`;
                    },
                });

                expect(rlt.find('li.node--0').length).to.equal(1);
                expect(rlt.find('li.node--1').length).to.equal(1);
                expect(rlt.find('li.node--2').length).to.equal(1);
            });

            it('supports isLeafNode parameter', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapListItemClassName: ({ isLeafNode }) => {
                        return `node${isLeafNode ? '--leaf' : ''}`;
                    },
                });

                expect(rlt.find('li.node--leaf').length).to.equal(1);
            });

            it('supports isOnActivePath parameter', () => {
                rlt = renderRlt({
                    data: women,
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Dresses';
                    },
                    mapListItemClassName: ({ isOnActivePath }) => {
                        return `node${isOnActivePath ? '--active' : ''}`;
                    }
                });

                expect(rlt.find('li.node--active').length).to.equal(3);
            });

            it('supports isActiveNode', () => {
                rlt = renderRlt({
                    data: [women, men],
                    shouldLazyRender: false,
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Dress Shirts';
                    },
                    mapListItemClassName: ({ isActiveNode }) => {
                        return `${isActiveNode ? 'list--active' : ''}`;
                    },
                });

                expect(rlt.find('li').length).to.equal(6);
                expect(rlt.find('li.list--active').length).to.equal(1)
            })
        });

        describe('mapNodeContent', () => {
            it('renders content for each list item', () => {
                rlt = mountRlt({
                    data: [women, men],
                    shouldLazyRender: false,
                    mapNodeContent: () => {
                        return <Label />;
                    }
                });

                expect(rlt.find(Label).length).to.equal(6);
            });

            it('supports node parameter', () => {
                rlt = mountRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapNodeContent: ({ node }) => {
                        return <Label text={node.label}/>;
                    }
                });

                expect(rlt.find(Label).at(0).prop('text')).to.equal('Women');
                expect(rlt.find(Label).at(1).prop('text')).to.equal('Clothing');
                expect(rlt.find(Label).at(2).prop('text')).to.equal('Dresses');
            });

            it('supports depth parameter', () => {
                rlt = mountRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapNodeContent: ({ depth }) => {
                        return <Label className={`label--depth-${depth}`}/>;
                    }
                });

                expect(rlt.find(Label).at(0).prop('className')).to.equal('label--depth-0');
                expect(rlt.find(Label).at(1).prop('className')).to.equal('label--depth-1');
                expect(rlt.find(Label).at(2).prop('className')).to.equal('label--depth-2');
            });

            it('supports isLeafNode parameter', () => {
                rlt = mountRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapNodeContent: ({ depth, isLeafNode }) => {
                        return isLeafNode && <Label className={`label--depth-${depth}`}/>;
                    }
                });

                expect(rlt.find(Label).length).to.equal(1);
                expect(rlt.find(Label).prop('className')).to.equal('label--depth-2');
            });

            it('supports isOnActivePath parameter', () => {
                rlt = mountRlt({
                    data: women,
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Clothing';
                    },
                    mapNodeContent: ({ isOnActivePath, node }) => {
                        return isOnActivePath && <Label {...{ text: node.label }}/>;
                    }
                });

                expect(rlt.find(Label).length).to.equal(2);
                expect(rlt.find(Label).at(0).prop('text')).to.equal('Women');
                expect(rlt.find(Label).at(1).prop('text')).to.equal('Clothing');
            });

            it('supports index parameter', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapNodeContent: ({ depth, index, node}) => {
                        const tabIndex = (depth + 1) * 100 + index;
                        return <a {...{tabIndex}} href="#">{node.label}</a>
                    }
                });

                expect(rlt.find('a').eq(0).attr('tabindex')).to.equal('100');
                expect(rlt.find('a').eq(1).attr('tabindex')).to.equal('200');
            });

            it('supports isActiveNode parameter', () => {
                rlt = renderRlt({
                    data: women,
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Clothing';
                    },
                    mapNodeContent: ({ isActiveNode, node}) => {
                        return <a className={isActiveNode ? 'link--active' : ''} href="#">{node.label}</a>
                    }
                });

                expect(rlt.find('a').length).to.equal(3);
                expect(rlt.find('a.link--active').length).to.equal(1);
            });

            it('supports returning a component', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapNodeContent: ({ node }) => {
                        return <Label text={node.label}/>
                    }
                });

                expect(rlt.find('li').eq(2).text()).to.equal('Dresses');
            });

            it('supports returning an HTML element', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapNodeContent: ({ node }) => {
                        return <span>{node.label}</span>;
                    }
                });

                expect(rlt.find('li').eq(2).text()).to.equal('Dresses');
            });

            it('supports returning a string', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    mapNodeContent: ({ node }) => {
                        return node.label;
                    }
                });

                expect(rlt.find('li').eq(2).text()).to.equal('Dresses');
            });
        });

        describe('onActiveNodeChanged', () => {
            it('is triggered when a node is clicked', () => {
                const onActiveNodeChanged = sinon.spy();
                rlt = mountRlt({
                    data: women,
                    onActiveNodeChanged
                });

                rlt.find('li').at(0).simulate('click');
                rlt.find('li').at(1).simulate('click');
                rlt.find('li').at(2).simulate('click');

                expect(onActiveNodeChanged.calledThrice).to.equal(true);
            });

            it('supports event parameter', () => {
                const onActiveNodeChanged = sinon.spy();
                rlt = mountRlt({
                    data: women,
                    onActiveNodeChanged
                });

                rlt.find('li').at(0).simulate('click');

                expect(onActiveNodeChanged.args[0][0].e.type).to.equal('click');
            });

            it('supports node parameter', () => {
                const onActiveNodeChanged = sinon.spy();
                rlt = mountRlt({
                    data: women,
                    onActiveNodeChanged
                });

                rlt.find('li').at(0).simulate('click');
                rlt.find('li').at(1).simulate('click');
                rlt.find('li').at(2).simulate('click');

                expect(onActiveNodeChanged.args[0][0].node.label).to.equal('Women');
                expect(onActiveNodeChanged.args[1][0].node.label).to.equal('Clothing')
                expect(onActiveNodeChanged.args[2][0].node.label).to.equal('Dresses')
            });

            it('supports depth parameter', () => {
                const onActiveNodeChanged = sinon.spy();
                rlt = mountRlt({
                    data: women,
                    onActiveNodeChanged
                });

                rlt.find('li').at(0).simulate('click');
                rlt.find('li').at(1).simulate('click');
                rlt.find('li').at(2).simulate('click');

                expect(onActiveNodeChanged.args[0][0].depth).to.equal(0);
                expect(onActiveNodeChanged.args[1][0].depth).to.equal(1);
                expect(onActiveNodeChanged.args[2][0].depth).to.equal(2);
            });

            it('supports index parameter', () => {
                const onActiveNodeChanged = sinon.spy();
                rlt = mountRlt({
                    data: women,
                    onActiveNodeChanged
                });

                rlt.find('li').at(0).simulate('click');
                rlt.find('li').at(1).simulate('click');
                rlt.find('li').at(2).simulate('click');

                expect(onActiveNodeChanged.args[0][0].index).to.equal(0);
                expect(onActiveNodeChanged.args[1][0].index).to.equal(0);
                expect(onActiveNodeChanged.args[2][0].index).to.equal(0);
            });

            it('supports activePath parameter', () => {
                const onActiveNodeChanged = sinon.spy();
                rlt = mountRlt({
                    data: women,
                    onActiveNodeChanged
                });

                rlt.find('li').at(0).simulate('click');
                rlt.find('li').at(1).simulate('click');
                rlt.find('li').at(2).simulate('click');

                expect(onActiveNodeChanged.args[0][0].activePath).to.equal('0');
                expect(onActiveNodeChanged.args[1][0].activePath).to.equal('0,0');
                expect(onActiveNodeChanged.args[2][0].activePath).to.equal('0,0,0');
            });

            it('defaults to noop', () => {
                rlt = mountRlt({
                    data: women
                });

                expect(() => {
                    rlt.find('li').at(0).simulate('click');
                }).not.to.throw();
            });
        });

        describe('shouldLazyRender', () => {
            it('defaults to true', () => {
                rlt = renderRlt({
                    data: [women, men]
                });

                expect(rlt.find('ul').length).to.equal(1);
                expect(rlt.find('li').length).to.equal(2);
            });

            it('works with mapInitialActiveNode', () => {
                rlt = renderRlt({
                    data: women,
                    mapInitialActiveNode: (node) => {
                        return node.label === 'Dresses';
                    },
                    mapNodeContent: ({node}) => {
                        return <Label text={node.label}/>;
                    }
                });

                expect(rlt.find('ul').eq(2).find('li').text()).to.equal('Dresses');
            })

            it('it can be disabled', () => {
                rlt = renderRlt({
                    data: [women, men],
                    shouldLazyRender: false
                });

                expect(rlt.find('ul').length).to.equal(5);
                expect(rlt.find('li').length).to.equal(6);
            });
        });

        describe('shouldShowAllNodes', () => {
            it('renders all nodes', () => {
                rlt = renderRlt({
                    data: collection[0],
                    shouldLazyRender: false,
                    shouldShowAllNodes: true
                });

                expect(rlt.find('ul').length).to.equal(32);
            });

            it('defaults to false', () => {
                rlt = renderRlt({
                    data: collection[0]
                });

                expect(rlt.find('ul').length).to.equal(1);
            });
        });

        describe('verticalAnimationConfig', () => {
            it('sets children container transition duration to user specified value', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    verticalAnimationConfig: {
                        durationInMs: 500
                    }
                });

                const style = rlt.find('div').eq(0).attr('style');
                expect(style).to.contain('-webkit-transition:height 500ms ease-in;');
                expect(style).to.contain('transition:height 500ms ease-in;');
            });

            it('sets children container transition timing to user specified value', () => {
                rlt = renderRlt({
                    data: women,
                    shouldLazyRender: false,
                    verticalAnimationConfig: {
                        timing: 'ease-out'
                    }
                });

                const style = rlt.find('div').eq(0).attr('style');
                expect(style).to.contain('-webkit-transition:height 300ms ease-out;');
                expect(style).to.contain('transition:height 300ms ease-out;');
            });

            it('sets children container transition duration to 300ms by default', () => {
                const style = rlt.find('div').eq(0).attr('style');
                expect(style).to.contain('-webkit-transition:height 300ms');
                expect(style).to.contain('transition:height 300ms');
            });

            it('sets children container transition timing to ease-in by default', () => {
                const style = rlt.find('div').eq(0).attr('style');
                expect(style).to.contain('-webkit-transition:height 300ms ease-in;');
                expect(style).to.contain('transition:height 300ms ease-in;');
            });
        });
    });

    function shallowRlt(props = {}) {
        return shallow(<ReactLazyTree {...props}/>);
    }

    function mountRlt(props = {}) {
        return mount(<ReactLazyTree {...props}/>);
    }

    function renderRlt(props = {}) {
        return render(<ReactLazyTree {...props}/>);
    }
});
