
import { expect } from 'chai';
import collection from './fixtures/collection';
import { mapPathToData } from '../src/search';

describe('Search', () => {
    describe('mapPathToData', () => {
        function predicate(node) {
            return node.label;
        }

        it('finds a path at depth 0', () => {
            const out = mapPathToData(collection, 'children', '2', predicate);

            expect(out[0]).to.equal('Kids');
        });

        it('finds a path at depth 1', () => {
            const out = mapPathToData(collection, 'children', '0,5', predicate);

            expect(out[0]).to.equal('Women');
            expect(out[1]).to.equal('Intimate Apparel');
        });

        it('finds a path at depth 2', () => {
            const out = mapPathToData(collection, 'children', '0,3,1', predicate);

            expect(out[0]).to.equal('Women');
            expect(out[1]).to.equal('Accessories');
            expect(out[2]).to.equal('Sunglasses');
        });

        it('finds a path at depth 3', () => {
            const out = mapPathToData(collection, 'children', '0,0,1,2', predicate);

            expect(out[0]).to.equal('Women');
            expect(out[1]).to.equal('Clothing');
            expect(out[2]).to.equal('Dresses');
            expect(out[3]).to.equal('Work');
        });

        it('throws if children property name is not found', () => {
            function shouldThrow() {
                mapPathToData(collection, 'foo', '2', predicate);
            }

            expect(shouldThrow).to.throw('Supplied value for prop `childrenPropertyName`, foo, was not found in at least one node of your data!');
        });

        it('normalizes a single root node data source into a collection', () => {
            const out = mapPathToData(collection[0], 'children', '0', predicate);

            expect(out[0]).to.equal('Women');
        });
    });
});
