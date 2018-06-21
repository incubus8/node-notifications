'use strict';

const {smsInsightNumbers} = require('../models');
const request = require('./http_request');

/**
 * Check and validate number
 * @param {String} number Recipient number
 * @return {String|null} international number
 */
async function getInternationalNumber(number) {
  const dbInsight = await smsInsightNumbers.findBy.userRequestNumber(number);
  if (dbInsight) {
    return dbInsight.international_format_number;
  }

  const insight = await getInsightFromNexmo(number);
  const ifn = insight.body.international_format_number;
  if (/^2/.test(insight.statusCode) && insight.body.status === 0 && ifn) {
    await smsInsightNumbers.insert(number, insight.body);
    return ifn;
  }

  return null;
}

/**
 * Get insight from given number.
 * This should correct us from mistakes prefixes input like: +62, 62, 8, or 08.
 * This will validate against foreign number also.
 * This nexmo API call is free / $0 cost.
 * @param {String} number Phone number
 * @return {Object} basic insight response
 * @see https://developer.nexmo.com/api/number-insight
 */
function getInsightFromNexmo(number) {
  // TODO: Consider to make this configurable from admin
  const opts = {
    url: 'https://api.nexmo.com/ni/basic/json',
    method: 'POST',
    form: {
      api_key: process.env.NEXMO_API_KEY,
      api_secret: process.env.NEXMO_API_SECRET,
      country: 'ID',
      number
    },
    json: true
  };

  return request(opts);
}

module.exports = {
  getInternationalNumber
};
