module.exports = [
    {
        method: 'GET',
        path: '/health/',
        handler: require('../handlers/health').healthCheck,
        config: {
          tags: ['api']
        }
    }
]