'use strict';

module.exports = {
    home(request, reply) {
        request.server.methods.fetchCurrentEvents((error, result) => {
            if (error) {
                console.log(error);
            }
            reply.view('index', {
                news: result || []
            });
        });
    }
};
