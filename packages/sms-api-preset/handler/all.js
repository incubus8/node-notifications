'use strict';

const {
  models: {smsProviderPresets}
} = require('@incubus8/sms-core');

async function all(req, reply) {
  const data = await smsProviderPresets.allPaginate({}, 50, 1);
  return reply.send(data);
}

module.exports = all;
