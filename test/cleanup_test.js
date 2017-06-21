const Lab = require('lab')
const lab = exports.lab = Lab.script()
const chai = require('chai')
const expect = chai.expect
const cleanup = require('../src/cleanup')

lab.experiment('cleanup should', () => {
  lab.test('return an empty string if text is undefined', (done) => {
    expect(cleanup()).to.be.eql('')
    done()
  })

  lab.test('remove pointers to the homepage', (done) => {
    expect(cleanup('Weitere Info gibt es hier.')).to.be.eql('Mehr Infos gibt es auf unserer Homepage.')
    expect(cleanup('Mehr Infos gibt es hier.')).to.be.eql('Mehr Infos gibt es auf unserer Homepage.')
    expect(cleanup('Blub blub gibt es hier.')).to.be.eql('Blub blub gibt es auf unserer Homepage.')
    done()
  })

  lab.test('remove pointers to registration', (done) => {
    expect(cleanup('Hier geht es zur Anmeldung.')).to.be.eql('Auf unserer Homepage kannst du dich registrieren.')
    done()
  })
})