module.exports = [
    {
        method: 'GET',
        path: '/senacor/',
        handler: require('../handlers/fetchCurrentEvents').fetchCurrentEvents,
        config: {
            tags: ['api'],
            cache: {
                expiresIn: 60 * 60 * 24
            },
            description: 'Deprecated endpoint. See /events/ for the actual route'
        }
    }
]