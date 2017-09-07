'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const Wreck = require('wreck');
const fetchCurrentEvents = require('../src/fetch').fetchCurrentEvents;
const TestData = require('./test_data.js');

lab.experiment('fetch', () => {
    const originalGet = Wreck.get;

    lab.afterEach((done) => {
        Wreck.get = originalGet;

        done();
    });

    lab.test('should call next with list of events', (done) => {
        Wreck.get = function (url, options, callback) {
            callback(null, { statusCode: 200 }, TestData.homePage);
        };

        const next = function (error, result) {
            if (error) {
                throw error;
            }

            expect(result.length).to.be.above(0);

            done();
        };

        fetchCurrentEvents(next);
    });

    lab.test('should call next with the error if an error occured', (done) => {
        Wreck.get = function (url, options, callback) {
            callback('URGS');
        };

        const next = function (error, result) {
            expect(error).to.be.equal('URGS');

            done();
        };

        fetchCurrentEvents(next);
    });

    lab.test('should call next with an empty list if the status is not 200', (done) => {
        Wreck.get = function (url, options, callback) {
            callback(null, { statusCode: 404 });
        };

        const next = function (error, result) {
            expect(error).to.be.null();
            expect(result).to.be.equal([]);

            done();
        };

        fetchCurrentEvents(next);
    });
});
