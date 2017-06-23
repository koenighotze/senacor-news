const Lab = require('lab')
const lab = exports.lab = Lab.script()
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

const fetchCurrentEvents = require('../../src/handlers/fetchCurrentEvents').fetchCurrentEvents

lab.experiment('fetchCurrentEvents', () => {

    lab.test('should reply with an empty array on errors', (done) => {
        const reply = sinon.spy()
        const req = {
            server: {
                methods: {
                    fetchCurrentEvents(callback) {
                        callback("some error")
                    }
                }
            }
        }

        fetchCurrentEvents(req, reply)

        // verify reply called with empty error
        expect(reply.calledWith([])).to.be.true

        done()
    })

    lab.test('should reply the result if no error ', (done) => {
        const reply = sinon.spy()
        const req = {
            server: {
                methods: {
                    fetchCurrentEvents(callback) {
                        callback(null, "some result")
                    }
                }
            }
        }

        fetchCurrentEvents(req, reply)

        // verify reply called with empty error
        expect(reply.calledWith("some result")).to.be.true

        done()
    })
})