const Lab = require('lab')
const lab = exports.lab = Lab.script()
const chai = require('chai')
chai.should();
chai.use(require('chai-things'))
chai.use(require('chai-string'))
const expect = chai.expect
const sinon = require('sinon')

const fetch = require('../src/fetch')

lab.experiment('server', () => {
    let app,
        sandbox,
        fetchCurrentEventsStub;

    lab.beforeEach((done) => {
        sandbox = sinon.sandbox.create()
        fetchCurrentEventsStub = sandbox.stub(fetch, 'fetchCurrentEvents')

        fetchCurrentEventsStub.callsFake((next) => {
            next(null, require('./test_events').events)
        })

        app = require('../src/app')

        done()
    })

    lab.afterEach((done) => {
        sandbox.restore()

        done()
    })

    lab.test('should expose /events/', (done) => {
        const options = {
            method: "GET",
            url: "/events/"
        }

        app.inject(options, function (response) {
            const result = response.result

            expect(response.statusCode).to.be.eql(200)
            expect(result).to.be.instanceof(Array)
            expect(result).to.have.length(3)

            done()
        })
    })

    lab.test('should expose /senacor/', (done) => {
        const options = {
            method: "GET",
            url: "/senacor/"
        }

        app.inject(options, function (response) {
            const result = response.result

            expect(response.statusCode).to.be.eql(200)
            expect(result).to.be.instanceof(Array)
            expect(result).to.have.length(3)

            done()
        })
    })

    lab.test('should expose /health/', (done) => {
        const options = {
            method: "GET",
            url: "/health/"
        }

        app.inject(options, (response) => {
            expect(response.statusCode).to.be.eql(200)
            expect(JSON.parse(response.payload).status).to.be.eql("ok")

            done()
        })
    })

})