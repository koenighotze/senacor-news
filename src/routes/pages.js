'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/view/',
        handler: require('../handlers/pages').home
    }
];
