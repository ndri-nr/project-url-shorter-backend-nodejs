const fs = require('fs')
const dotenv = require('dotenv');
const fastify = require('fastify')({ logger: true })
const cors = require('fastify-cors');
const fastifySwagger = require('fastify-swagger')
const baseRoutes = require('./src/routes/base')
const urlRoutes = require('./src/routes/urls')

dotenv.config();

const ENV = process.env.ENV;
const PORT = process.env.PORT;
const SWAGGER_PREFIX = process.env.SWAGGER_PREFIX;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const FILES_PATH = process.env.FILES_PATH;

fastify.register(cors, {
    origin: ALLOWED_ORIGIN // Replace with the allowed origin(s)
});

if (ENV === "dev") {
    fastify.register(fastifySwagger, {
        exposeRoute: true,
        routePrefix: SWAGGER_PREFIX,
        swagger: {
            info: {title: 'url-shorter-api'}
        }
    })
}
fastify.register(baseRoutes)
fastify.register(urlRoutes)

const start = async () => {
    if (!fs.existsSync(FILES_PATH)) {
        fs.mkdirSync(FILES_PATH, { recursive: true });
        fastify.log.info(`Directory "${FILES_PATH}" created successfully.`);
    } else {
        fastify.log.info(`Directory "${FILES_PATH}" already exists.`);
    }
    try {
        await fastify.listen({
            port: PORT
        })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()