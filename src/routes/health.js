'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
    status: Joi.string().valid(['ok']).required()
});

module.exports = [
    {
        method: 'GET',
        path: '/health/',
        handler: require('../handlers/health').healthCheck,
        config: {
            security: true,
            tags: ['api'],
            description: 'Health check endpoint',
            response: {
                schema
            }
        }
    }
];
