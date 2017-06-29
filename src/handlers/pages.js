module.exports = {
    home(request, reply) {
      request.server.methods.fetchCurrentEvents(function (error, result) {
        reply.view('index', {
          news: result || []
        });
      })
    }
}