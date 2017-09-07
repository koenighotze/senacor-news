'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('Code');
const expect = Code.expect;
const Sinon = require('sinon');

const Fetch = require('../src/fetch');

lab.experiment('server', () => {
    let app;
    let sandbox;
    let fetchCurrentEventsStub;

    lab.beforeEach((done) => {
        sandbox = Sinon.sandbox.create();
        fetchCurrentEventsStub = sandbox.stub(Fetch, 'fetchCurrentEvents');

        fetchCurrentEventsStub.callsFake((next) => {
            next(null, require('./test_events').events);
        });

        app = require('../src/app');

        done();
    });

    lab.afterEach((done) => {
        sandbox.restore();

        done();
    });

    lab.test('should expose /events/', (done) => {
        const options = {
            method: 'GET',
            url: '/events/'
        };

        app.inject(options, (response) => {
            const result = response.result;

            expect(response.statusCode).to.be.equal(200);
            expect(result).to.be.instanceof(Array);
            expect(result).to.have.length(3);

            done();
        });
    });

    lab.test('should expose /senacor/', (done) => {
        const options = {
            method: 'GET',
            url: '/senacor/'
        };

        app.inject(options, (response) => {
            const result = response.result;

            expect(response.statusCode).to.be.equal(200);
            expect(result).to.be.instanceof(Array);
            expect(result).to.have.length(3);

            done();
        });
    });

    lab.test('should expose /health/', (done) => {
        const options = {
            method: 'GET',
            url: '/health/'
        };

        app.inject(options, (response) => {
            expect(response.statusCode).to.be.equal(200);
            expect(JSON.parse(response.payload).status).to.be.equal('ok');

            done();
        });
    });

});
