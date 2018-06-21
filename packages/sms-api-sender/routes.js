'use strict';

const schema = require('./schema');
const handler = require('./handler');

module.exports = (fastify, opts, done) => {
  fastify.get('/senders', schema.all, handler.all);
  fastify.get('/senders/:id', schema.get, handler.get);
  fastify.options('/senders', {}, (req, reply) => reply);
  fastify.post('/senders', schema.create, handler.create);
  fastify.patch('/senders', schema.patch, handler.patch);
  fastify.delete('/senders', schema.delete, handler.delete);

  done();
};
