const Hapi = require('hapi')
const fetchCurrentEvents = require('./fetch').fetchCurrentEvents

const server = new Hapi.Server();

server.method('fetchCurrentEvents', fetchCurrentEvents, {
    cache: {
        expiresIn: 60000,
        generateTimeout: 5000
    }
})

server.connection({
    port: process.env.PORT || 8000,
    routes: {
        cors: true
    }
})

// route will be removed in the future
server.route(require('./routes/senacor'))

server.route(require('./routes/events'))

server.route(require('./routes/health'))

// only start if we are not required by other scripts
if (!module.parent) {
    server.register([
        require('inert'),
        require('vision'),
        require('lout'), {
            register: require('good'),
            options: {
                wreck: true,
                reporters: {
                    console: [{
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{
                            wreck: '*',
                            log: '*',
                            response: '*'
                        }]
                    }, {
                        module: 'good-console'
                    }, 'stdout'],
                }
            }
        }
    ], (err) => {
        if (err) {
            throw err
        }

        server.start((err) => {
            if (err) {
                throw err
            }

            server.log('Running at: ' + server.info.uri)
        })
    })
}

module.exports = server;