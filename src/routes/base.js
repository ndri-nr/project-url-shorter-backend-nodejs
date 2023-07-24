const { getBase } = require('../controllers/base')

const getBaseByIdOpts = {
    schema: {
        response: {
            200: {type: 'string'}
        }
    },
    handler: getBase
}

function baseRoutes (fastify, options, done) {

    fastify.get('/', getBaseByIdOpts)

    done()

}

module.exports = baseRoutes
