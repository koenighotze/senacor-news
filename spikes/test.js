const request = require('request');
const cheerio = require('cheerio');

request.get('http://senacor-aktuelles.eu-west-1.elasticbeanstalk.com/senacor/', (error, response, body) => {
    if (error) {
        throw error;
    }

    if (!error && response.statusCode === 200) {
        const res = JSON.parse(response.body).sort((a, b) => {
            const adate_tmp = a.date.split('.');
            const adate = new Date(adate_tmp[2], adate_tmp[1] - 1, adate_tmp[0]);

            const bdate_tmp = b.date.split('.');
            const bdate = new Date(bdate_tmp[2], bdate_tmp[1] - 1, bdate_tmp[0]);

            return adate < bdate;
        });


        console.log(res);
    }
});
