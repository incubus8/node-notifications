'use strict';

const schema = require('./schema');
const handler = require('./handler');

module.exports = (fastify, opts, done) => {
  fastify.get('/categories', schema.all, handler.all);
  fastify.options('/categories', {}, (req, reply) => reply);
  fastify.get('/categories/:id', schema.get, handler.get);
  fastify.post('/categories', schema.create, handler.create);
  fastify.patch('/categories', schema.patch, handler.patch);
  fastify.delete('/categories', schema.delete, handler.delete);

  done();
};
