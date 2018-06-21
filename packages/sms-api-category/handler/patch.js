'use strict';

const Boom = require('boom');

const {
  models: {smsCategories}
} = require('@incubus8/sms-core');

async function patch(req, reply) {
  const {
    id,
    ...data
  } = req.body;

  if (!id) {
    return Boom.notFound('Category ID not specified');
  }

  const category = await smsCategories.update(id, data);
  return reply.send(category[0]);
}

module.exports = patch;
