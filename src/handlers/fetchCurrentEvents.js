const fetchCurrentEvents = function (req, reply) {
    req.server.methods.fetchCurrentEvents(function (error, result) {
        reply(result || [])
    })
}

module.exports = {fetchCurrentEvents}