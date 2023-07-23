const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();

const FILES_PATH = process.env.FILES_PATH;

function validateInput(input) {
    const regex = /^[a-zA-Z][a-zA-Z0-9_-]{4,}[a-zA-Z0-9]$/;
    return regex.test(input);
}

function isValidURL(url) {
    const urlPattern = /^(?:(?:https?|ftp):\/\/)?(?:(?:[\w-]+\.)+[a-z]{2,}|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::\d+)?(?:\/?|[/?]\S+)$/i;
    return urlPattern.test(url);
}

const getUrlById = (req, reply) => {
    const { id } = req.params
    if (id.trim().length === 0) {
        reply.code(400).send({ 
            status: 400,
            message: 'id is required'
        })
    }
    try {
        const fileFullPath = FILES_PATH + '/' + id.trim()
        const fileContent = fs.readFileSync(fileFullPath, 'utf8');

        reply.send({ 
            status: 200,
            message: 'Success',
            data: fileContent
        })
    } catch (err) {
        reply.code(404).send({ 
            status: 404,
            message: 'id not found'
        })
    }
}

const postUrl = (req, reply) => {
    const { id, url } = req.body
    
    let errors = []
    if (id === undefined || id.trim().length === 0) {
        errors.push('id is required')
    } else if (!validateInput(id)) {
        errors.push('invalid format. id only accept number, alphabets, dash, underscore, and minimum length is 6')
    }
    if (url === undefined || url.trim().length === 0) {
        errors.push('url is required')
    } else if (!isValidURL(url)) {
        errors.push('url is invalid')
    }

    if (errors.length > 0) {
        reply.code(400).send({ 
            status: 400,
            message: errors.join(', ')
        })
    } else {
        try {
            const fileFullPath = FILES_PATH + '/' + id.trim()
    
            if (!fs.existsSync(fileFullPath)) {
                fs.writeFileSync(fileFullPath, url.trim());
                reply.send({ 
                    status: 200,
                    message: 'url linked',
                    data: id
                })
            } else {
                reply.code(409).send({ 
                    status: 409,
                    message: 'id exist, please try again with another id'
                })
            }
        } catch (err) {
            reply.code(500).send({ 
                status: 500,
                message: 'something went wrong, please try again later'
            })
        }
    }
}

module.exports = {
    getUrlById,
    postUrl
}
