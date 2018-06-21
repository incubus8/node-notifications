'use strict';

const {
  models: {smsCategories}
} = require('@incubus8/sms-core');

async function all(req, reply) {
  const data = await smsCategories.allPaginate(8, 1);
  return reply.send(data);
}

module.exports = all;
