const Lab = require('lab')
const lab = exports.lab = Lab.script()
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

const healthCheck = require('../../src/handlers/health').healthCheck
lab.experiment('healthCheck', () => {
    lab.test('should reply with ok', (done) => {
        const reply = sinon.spy()
        const request = {}

        healthCheck(request, reply)

        expect(reply.calledWith({ status: "ok" })).to.be.true

        done()
    })
})