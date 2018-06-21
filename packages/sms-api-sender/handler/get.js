'use strict';

const Boom = require('boom');

const {
  models: {smsSenders}
} = require('@incubus8/sms-core');

async function get(req, reply) {
  const id = req.params.id;
  const data = await smsSenders.findBy.idAndSecurityToken(id);
  if (!data) {
    return Boom.notFound('Sender not found');
  }

  return reply.send(data);
}

module.exports = get;
