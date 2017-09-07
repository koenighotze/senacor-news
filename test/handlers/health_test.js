'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const Sinon = require('sinon');

const healthCheck = require('../../src/handlers/health').healthCheck;
lab.experiment('healthCheck', () => {
    lab.test('should reply with ok', (done) => {
        const reply = Sinon.spy();
        const request = {};

        healthCheck(request, reply);

        expect(reply.calledWith({ status: 'ok' })).to.be.true;

        done();
    });
});
