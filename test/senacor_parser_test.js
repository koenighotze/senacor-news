const Lab = require('lab')
const lab = exports.lab = Lab.script()
const chai = require('chai')
const expect = chai.expect

chai.should();
chai.use(require('chai-things'))
chai.use(require('chai-string'))

const test_data = require('./test_data.js')
const parseSenacorAktuelles = require('../src/senacor_parser').parseSenacorAktuelles

lab.experiment('parseSenacorAktuelles', () => {
    lab.test('should return the list of news items', (done) => {
        const result = parseSenacorAktuelles(test_data.homePage)

        expect(result.length).to.be.eql(4)
        result.should.all.have.property('date')
        result.should.all.have.property('title')
        result.should.all.have.property('summary')

        done()
    })

    lab.test('should return an empty list if the content is not parsable', (done) => {
        const result = parseSenacorAktuelles("some garbage")

        expect(result).to.be.eql([])

        done()
    })

    lab.test('should remove the Weitere Infos section from all items', (done) => {
        const result = parseSenacorAktuelles(test_data.homePage)

        result.forEach(({summary}) => {
            expect(summary).to.not.contain('Weitere Infos')
            expect(summary).to.not.contain('gibt es hier.')
        })

        done()
    })

    lab.test('should sort the events by date', (done) => {
        const result = parseSenacorAktuelles(test_data.homePage)

        for (let i = 1; i < result.length; i++) {
            const [a_day, a_month, a_year] = result[i].date.split(".")
            const next = new Date(a_year, a_month - 1, a_day)

            const [b_day, b_month, b_year] = result[i - 1].date.split(".")
            const previous = new Date(b_year, b_month - 1, b_day)

            expect(next.getTime()).to.be.lte(previous.getTime())
        }

        done()
    })
})
