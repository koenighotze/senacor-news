'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Code = require('code');
const expect = Code.expect;
const Cleanup = require('../src/cleanup');

lab.experiment('cleanup should', () => {
    lab.test('return an empty string if text is undefined', (done) => {
        expect(Cleanup()).to.be.equal('');
        done();
    });

    lab.test('remove pointers to the homepage', (done) => {
        expect(Cleanup('Weitere Info gibt es hier.')).to.be.equal('Mehr Infos gibt es auf unserer Homepage.');
        expect(Cleanup('Mehr Infos gibt es hier.')).to.be.equal('Mehr Infos gibt es auf unserer Homepage.');
        expect(Cleanup('Blub blub gibt es hier.')).to.be.equal('Blub blub gibt es auf unserer Homepage.');
        done();
    });

    lab.test('remove pointers to registration', (done) => {
        expect(Cleanup('Hier geht es zur Anmeldung.')).to.be.equal('Auf unserer Homepage kannst du dich registrieren.');
        done();
    });
});
