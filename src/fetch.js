const Wreck = require('wreck')
const config = require('config')
const parseSenacorAktuelles = require('./senacor_parser').parseSenacorAktuelles

const fetchCurrentEvents = function (next) {
    console.log("Fetching data from Senacor...")

    Wreck.get(config.newsServer.url, {
        timeout: config.newsServer.timeout,
        maxBytes: config.newsServer.maxBytes
    }, function (error, response, body) {
        if (error) {
            next(error)
        }
        else {
            if (response.statusCode === 200) {
                const collected = parseSenacorAktuelles(body)
                next(null, collected)
            }
            else {
                console.log("Could not retrieve news from senacor")
                next(null, [])
            }
        }
    })
}

module.exports = { fetchCurrentEvents }
