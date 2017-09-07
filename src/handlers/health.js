'use strict';

const healthCheck = function (request, reply) {

    reply({ status: 'ok' });
};

module.exports = {
    healthCheck
};
