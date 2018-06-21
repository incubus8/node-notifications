'use strict';

const Queue = require('bull');

const REDIS_URL = 'redis://127.0.0.1:6379' || process.env.REDIS_URL;
const SmsQueue = new Queue('send sms', REDIS_URL);

module.exports = {
  SmsQueue
};
