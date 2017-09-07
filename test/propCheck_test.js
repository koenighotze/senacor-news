const PropCheck = require('./propCheck');

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;

lab.experiment('PropCheck.hasAllProps should', () => {
    const obj = {
        'foo': 1,
        'bar': 1,
        'baz': 1,
    };

    lab.test('return true if an object has all props', (done) => {
        expect(PropCheck.hasAllProps(obj, ['foo', 'baz'])).to.be.true();

        done();
    });

    lab.test('return false if an object misses at least one prop', (done) => {
        expect(PropCheck.hasAllProps(obj, ['foo', 'qux'])).to.be.false();

        done();
    });
})

lab.experiment('PropCheck.allItemsHaveAllProps should', () => {
    const objs = [{
        'foo': 1,
        'bar': 1,
        'baz': 1,
    },
    {
        'foo': 1,
        'bar': 1,
        'fam': 1,
    }];


    lab.test('return true if all objects have all props', (done) => {
        expect(PropCheck.allItemsHaveAllProps(objs, ['foo', 'bar'])).to.be.true();

        done();
    });

    lab.test('return false if one object lacks a prop', (done) => {
        expect(PropCheck.allItemsHaveAllProps(objs, ['foo', 'baz'])).to.be.false();

        done();
    });
})