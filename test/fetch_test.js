const Lab = require('lab')
const lab = exports.lab = Lab.script()

const chai = require('chai')
const expect = chai.expect
const Wreck = require('wreck')
const fetchCurrentEvents = require('../src/fetch').fetchCurrentEvents
const test_data = require('./test_data.js')

lab.experiment('fetch', () => {
    const originalGet = Wreck.get

    lab.afterEach((done) => {
        Wreck.get = originalGet

        done()
    })

    lab.test('should call next with list of events', (done) => {
        Wreck.get = function (url, options, callback) {
            callback(null, {statusCode: 200}, test_data.homePage)
        }

        const next = function (error, result) {
            expect(result.length).to.be.gt(0)

            done()
        }

        fetchCurrentEvents(next)
    })

    lab.test('should call next with the error if an error occured', (done) => {
        Wreck.get = function (url, options, callback) {
            callback("URGS")
        }

        const next = function (error, result) {
            expect(error).to.be.eql("URGS")

            done()
        }

        fetchCurrentEvents(next)
    })

    lab.test('should call next with an empty list if the status is not 200', (done) => {
        Wreck.get = function (url, options, callback) {
            callback(null, {statusCode: 404})
        }

        const next = function (error, result) {
            expect(error).to.be.null
            expect(result).to.be.eql([])

            done()
        }

        fetchCurrentEvents(next)
    })
})