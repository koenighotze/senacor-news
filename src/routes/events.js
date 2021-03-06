'use strict';

const Joi = require('joi');

const schema = Joi.array().items({
    date: Joi.string().required(),
    location: Joi.string().required(),
    title: Joi.string().required(),
    summary: Joi.string().required()
});

module.exports = [{
    method: 'GET',
    path: '/events/',
    handler: require('../handlers/fetchCurrentEvents').fetchCurrentEvents,
    config: {
        security: true,
        cache: {
            expiresIn: 60 * 60 * 24
        },
        response: {
            schema
        },
        tags: ['api'],
        description: 'Exposes events that happen @ senacor'
    }
}];
