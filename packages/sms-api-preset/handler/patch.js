'use strict';

const Boom = require('boom');
const {
  models: {smsProviderPresets}
} = require('@incubus8/sms-core');

async function patch(req, reply) {
  const {
    id,
    ...data
  } = req.body;

  if (!id) {
    return Boom.notFound();
  }

  const preset = await smsProviderPresets.update(id, data);
  return reply.send(preset[0]);
}

module.exports = patch;
