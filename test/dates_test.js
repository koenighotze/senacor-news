'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;

const compareDates = require('../src/dates').compareDates;

const buildEvent = function (date) {
    return {
        date
    };
};

lab.experiment('compareDates should return a negative value if', () => {

    lab.test('if the first year is before the second year', (done) => {
        expect(compareDates(buildEvent('3.2.2000'), buildEvent('1.1.2001'))).to.be.below(0);

        done();
    });

    lab.test('if the first month is before the second month in the same year', (done) => {
        expect(compareDates(buildEvent('1.1.2000'), buildEvent('1.2.2000'))).to.be.below(0);

        done();
    });

    lab.test('if the first day is before the second day in the same month of the same year', (done) => {
        expect(compareDates(buildEvent('10.1.2000'), buildEvent('11.1.2000'))).to.be.below(0);

        done();
    });
});

