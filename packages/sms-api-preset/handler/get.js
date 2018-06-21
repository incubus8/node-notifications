'use strict';

const Boom = require('boom');

const {
  models: {smsProviderPresets}
} = require('@incubus8/sms-core');

async function get(req, reply) {
  const id = req.params.id;
  const data = await smsProviderPresets.findBy.id(id);
  if (!data) {
    return Boom.notFound('SMS Provider not found');
  }

  return reply.send(data);
}

module.exports = get;
