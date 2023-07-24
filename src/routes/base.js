const { getBase } = require('../controllers/base')

const getBaseOpts = {
    schema: {
        response: {
            200: {type: 'string'}
        }
    },
    handler: getBase
}

function baseRoutes (fastify, options, done) {

    fastify.get('/', getBaseOpts)

    done()

}

module.exports = baseRoutes
