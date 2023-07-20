const success = {
    type: 'object',
    properties: {
        status: {type: 'number'},
        message: {type: 'string'},
        data: {type: 'string'}
    }
}

const error = {
    type: 'object',
    properties: {
        status: {type: 'number'},
        message: {type: 'string'}
    }
}

module.exports = {
    success,
    error
}