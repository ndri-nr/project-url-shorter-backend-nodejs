const { success, error } = require('../schemas/base')
const { getUrlById, postUrl } = require('../controllers/urls')

const getUrlByIdOpts = {
    schema: {
        params: {
            id : {type: 'string'}
        },
        response: {
            200: success,
            400: error,
            404: error
        }
    },
    handler: getUrlById
}

const postUrlOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                id: {type: 'string'},
                url: {type: 'string'}
            }
        },
        response: {
            200: success,
            400: error,
            409: error,
            500: error
        }
    },
    handler: postUrl
}

function urlRoutes (fastify, options, done) {

    fastify.get('/api/url/:id', getUrlByIdOpts)
    fastify.post('/api/url', postUrlOpts)

    done()

}

module.exports = urlRoutes
