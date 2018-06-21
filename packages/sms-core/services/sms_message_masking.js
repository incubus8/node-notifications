'use strict';

const template = require('string-template');

function applyMessageMasking(message, messageMaskingRules, messageMaskingString) {
  if (!messageMaskingString) {
    return message;
  }

  return message.replace(new RegExp(messageMaskingRules, 'g'), messageMaskingString);
}

function applyJsonRequestTemplate(jsonStringRequestTemplate, maskedMessage, from, to) {
  const data = {
    SenderId: from,
    MobileNumber: to,
    SmsMessage: maskedMessage
  };

  return JSON.parse(template(jsonStringRequestTemplate, data));
}

module.exports = {
  applyMessageMasking,
  applyJsonRequestTemplate
};
