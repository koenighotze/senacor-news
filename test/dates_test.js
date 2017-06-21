const Lab = require('lab')
const lab = exports.lab = Lab.script()
const chai = require('chai')
const expect = chai.expect


const compareDates = require('../src/dates').compareDates

const buildEvent = function (date) {
    return {
        date: date
    }
}

lab.experiment('compareDates should return a negative value if', () => {

    lab.test('if the first year is before the second year', (done) => {
        expect(compareDates(buildEvent('3.2.2000'), buildEvent('1.1.2001'))).to.be.lt(0)

        done()
    })

    lab.test('if the first month is before the second month in the same year', (done) => {
        expect(compareDates(buildEvent('1.1.2000'), buildEvent('1.2.2000'))).to.be.lt(0)

        done()
    })

    lab.test('if the first day is before the second day in the same month of the same year', (done) => {
        expect(compareDates(buildEvent('10.1.2000'), buildEvent('11.1.2000'))).to.be.lt(0)

        done()
    })
})

