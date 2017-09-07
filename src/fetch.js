'use strict';

const Wreck = require('wreck');
const Config = require('config');
const parseSenacorAktuelles = require('./senacor_parser').parseSenacorAktuelles;

const fetchCurrentEvents = function (next) {

    console.log('Fetching data from Senacor...');

    Wreck.get(Config.newsServer.url, {
        timeout: Config.newsServer.timeout,
        maxBytes: Config.newsServer.maxBytes
    }, (error, response, body) => {
        if (error) {
            next(error);
        }
        else {
            if (response.statusCode === 200) {
                const collected = parseSenacorAktuelles(body);
                next(null, collected);
            }
            else {
                console.log('Could not retrieve news from senacor');
                next(null, []);
            }
        }
    });
};

module.exports = { fetchCurrentEvents };
