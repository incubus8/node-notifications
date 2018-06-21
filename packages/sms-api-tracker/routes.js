'use strict';

const schema = require('./schema');
const handler = require('./handler');

module.exports = (fastify, opts, done) => {
  fastify.get('/trackers', schema.all, handler.all);
  fastify.get('/trackers/{id}', schema.get, handler.get);
  fastify.post('/trackers', schema.create, handler.create);
  fastify.patch('/trackers', schema.patch, handler.patch);
  fastify.delete('/trackers', schema.delete, handler.delete);

  done();
};
