'use strict';

const fetchCurrentEvents = function (req, reply) {

    req.server.methods.fetchCurrentEvents((error, result) => {
        if (error) {
            console.log(error);
        }

        reply(result || []);
    });
};

module.exports = { fetchCurrentEvents };
