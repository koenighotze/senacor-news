const cheerio = require('cheerio')
const compareDates = require('./dates').compareDates
const cleanup = require('./cleanup')

const parseSenacorAktuelles = function (body) {
    const $ = cheerio.load(body)
    const collected = []

    $('div.news').filter(function (i, el) {
        const $element = $(el)
        const elem = $($element[0])
        const title = $(elem.find('div.titel')[0]).text().trim()

        if (!collected.find(e => e.title === title)) {
            const [location, date] = $(elem.find('div.date')[0]).text().trim().split(", ")

            collected.push({
                location,
                date,
                title,
                "summary": cleanup($(elem.find('div.text')[0]).text().trim())
            })
        }


    });
    return collected.sort(compareDates).reverse()
}

module.exports = { parseSenacorAktuelles }