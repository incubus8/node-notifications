'use strict';

const newrelic = require('newrelic');
const cors = require('cors');
const helmet = require('fastify-helmet');

const swaggerOption = {
  exposeRoute: true,
  swagger: {
    info: {
      title: 'SMS Gateway swagger',
      description: 'SMS Gateway Swagger API',
      version: '0.1.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json', 'application/xml']
  }
};

module.exports = function (fastify, opts, next) {
  fastify.use(cors());
  fastify.register(helmet);

  fastify.register(require('fastify-swagger'), swaggerOption, next);

  fastify.register(require('@incubus8/sms-api-category'), {prefix: '/api/v1'}, next);
  fastify.register(require('@incubus8/sms-api-preset'), {prefix: '/api/v1'}, next);
  fastify.register(require('@incubus8/sms-api-sender'), {prefix: '/api/v1'}, next);
  fastify.register(require('@incubus8/sms-api-tracker'), {prefix: '/api/v1'}, next);

  fastify.addHook('onClose', (instance, done) => {
    // Gracefully stop newrelic
    newrelic.shutdown({collectPendingData: true}, () => {
      process.exit();
    });
    done();
  });

  next();
};
