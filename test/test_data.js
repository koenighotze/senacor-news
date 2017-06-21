const fs = require('fs')
module.exports = {
    homePage: fs.readFileSync(__dirname + '/home_page.html', 'utf8')
}