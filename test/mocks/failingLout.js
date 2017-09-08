'use strict';

exports.register = function (server, options, next) {
    next(new Error('BOOM'));
};

exports.register.attributes = { name: 'lout' };