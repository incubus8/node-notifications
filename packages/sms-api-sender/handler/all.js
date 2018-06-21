'use strict';

const {
  models: {smsSenders}
} = require('@incubus8/sms-core');

async function all(req, reply) {
  const data = await smsSenders.allPaginate({}, 50, 1);
  return reply.send(data);
}

module.exports = all;
