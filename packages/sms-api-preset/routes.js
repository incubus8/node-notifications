'use strict';

const schema = require('./schema');
const handler = require('./handler');

module.exports = (fastify, opts, done) => {
  fastify.get('/presets', schema.all, handler.all);
  fastify.get('/presets/:id', schema.get, handler.get);
  fastify.options('/presets', {}, (req, reply) => reply);
  fastify.post('/presets', schema.create, handler.create);
  fastify.patch('/presets', schema.patch, handler.patch);
  fastify.delete('/presets', schema.delete, handler.delete);

  done();
};
