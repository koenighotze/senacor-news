module.exports = [
    {
        method: 'GET',
        path: '/senacor/',
        handler: require('../handlers/fetchCurrentEvents').fetchCurrentEvents,
        config: {
            cache: {
                expiresIn: 60 * 60 * 24
            }
        }
    }
]