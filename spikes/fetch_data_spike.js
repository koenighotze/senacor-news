// const parse5 = require('parse5')
const cheerio = require('cheerio')
const request = require('request')
const jsonfile = require('jsonfile')

request.get('https://www.senacor.com/unternehmen/aktuelles', function (error, response, body) {
    if (error) {
      throw error
    }

    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body)
        const collected = []

        $('div.single-news-el').filter(function(i, el) {
          const $element = $(el)
          const title   = $($($element[0]).find('p')[0]).text()
          const date    = $($($element[0]).find('p')[1]).text()
          const summary = $($($element[0]).find('div.news-content')[0]).text().replace(/Weitere Info.*/, "")

          collected.push({
            "date": date,
            "title": title,
            "summary": summary
          });
        });

        jsonfile.writeFileSync('out.json', collected)
        console.log(collected)
    }
});
