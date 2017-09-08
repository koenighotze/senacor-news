'use strict';

const Server = require('./server');

Server.init((err, server) => {
    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            throw err;
        }

        server.log('Running at: ' + server.info.uri);
    });
})