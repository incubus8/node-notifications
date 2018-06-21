'use strict';

module.exports = (fastify, opts, next) => {
  fastify.register(require('./routes'));

  return next();
};
