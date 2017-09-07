'use strict';

const Fs = require('fs');
module.exports = {
    homePage: Fs.readFileSync(__dirname + '/home_page.html', 'utf8')
};
