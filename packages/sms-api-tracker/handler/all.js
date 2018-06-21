'use strict';

const {
  models: {smsProviderTrackers}
} = require('@incubus8/sms-core');

async function all(req, reply) {
  const query = req.query;
  const data = await smsProviderTrackers.allPaginate(query);

  return reply.send(data);
}

module.exports = all;
