// const parse5 = require('parse5')
const cheerio = require('cheerio');
const Wreck = require('wreck');
const jsonfile = require('jsonfile');

Wreck.get('https://www.senacor.com/unternehmen/aktuelles/', {
    timeout: 2000,
    maxBytes: 50000
}, (error, response, body) => {
    if (error) {
        throw error;
    }
    console.log(response.statusCode);

    if (!error && response.statusCode === 200) {
        console.log('Parsing ' + body);
        const $ = cheerio.load(body);
        const collected = [];

        $('div.single-news-el').filter((i, el) => {
            const $element = $(el);
            const title = $($($element[0]).find('p')[0]).text();
            const date = $($($element[0]).find('p')[1]).text();
            const summary = $($($element[0]).find('div.news-content')[0]).text().replace(/Weitere Info.*/, '');

            collected.push({
                date,
                title,
                summary
            });
        });

        jsonfile.writeFileSync('out.json', collected);
        console.log(collected);
    }
});
