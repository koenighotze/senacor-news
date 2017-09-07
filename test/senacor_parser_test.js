'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;

const Testdata = require('./test_data')
const PropCheck = require('./propCheck');
const parseSenacorAktuelles = require('../src/senacor_parser').parseSenacorAktuelles;

lab.experiment('parseSenacorAktuelles', () => {
    lab.test('should return the list of news items', (done) => {
        const result = parseSenacorAktuelles(Testdata.homePage);

        expect(result.length).to.be.equal(4);

        const propsFound = PropCheck.allItemsHaveAllProps(result, ['date', 'title', 'summary']);

        expect(propsFound).to.be.true();

        done();
    });

    lab.test('should return an empty list if the content is not parsable', (done) => {
        const result = parseSenacorAktuelles('some garbage');

        expect(result).to.be.equal([]);

        done();
    });

    lab.test('should remove the Weitere Infos section from all items', (done) => {
        const result = parseSenacorAktuelles(Testdata.homePage);

        result.forEach(({ summary }) => {
            expect(summary).to.not.contain('Weitere Infos');
            expect(summary).to.not.contain('gibt es hier.');
        });

        done();
    });

    lab.test('should sort the events by date', (done) => {
        const result = parseSenacorAktuelles(Testdata.homePage);

        for (let i = 1; i < result.length; ++i) {
            const [aday, amonth, ayear] = result[i].date.split('.');
            const next = new Date(ayear, amonth - 1, aday);

            const [bday, bmonth, byear] = result[i - 1].date.split('.');
            const previous = new Date(byear, bmonth - 1, bday);

            expect(next.getTime()).to.be.at.most(previous.getTime());
        }

        done();
    });
});
