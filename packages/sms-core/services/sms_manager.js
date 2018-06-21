'use strict';

const stringify = require('fast-safe-stringify');
const {applyJsonRequestTemplate, applyMessageMasking} = require('./sms_message_masking');
const {smsProviderTrackers} = require('../models');
const request = require('./http_request');

async function send(params, smsCategory, smsPreset, smsSender) {
  const jsonRequest = applyJsonRequestTemplate(
    stringify(smsPreset.json_request_template),
    params.message,
    smsSender.value,
    params.to);

  const maskedMessage = applyMessageMasking(
    params.message,
    smsCategory.message_masking_rules,
    smsCategory.message_masking_string);

  // Start tracking sms
  const data = {
    reqId: params.reqId,
    to: params.to,
    message: maskedMessage,
    smsSender,
    smsPreset,
    json_cmd: jsonRequest
  };

  const tracker = await smsProviderTrackers.insert(data);
  const response = await request(jsonRequest);
  await smsProviderTrackers.updateWithResponse(tracker[0], response);

  return response;
}

module.exports = {
  send
};
