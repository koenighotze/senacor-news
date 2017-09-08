'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const Sinon = require('sinon');
const Proxyquire = require('proxyquire');

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

        require('../src/server').init( (err, server) => {
            app = server;
            done();
        });
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

lab.experiment('server', () => {
    let originalPort;

    lab.beforeEach((done) => {
        originalPort = process.env.PORT;
        done();
    })

    lab.afterEach((done) => {
        if (originalPort) {
            process.env.PORT = originalPort;
        }
        else {
            delete process.env.PORT;
        }


        done();
    })

    lab.test('should set the port from env', (done) => {
        process.env.PORT = 1234;

        require('../src/server').init( (err, server) => {
            expect(server.info.port).to.be.equal(1234);
            done();
        });
    });
});

lab.experiment('a failing server', () => {
    lab.test('should call the callback with the error', (done) => {
        const Server = Proxyquire('../src/server', {
            lout: require('./mocks/failingLout')
        });

        Server.init( (err) => {
            expect(err).to.not.be.null();
            done()
        })
    });
});