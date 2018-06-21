'use strict';

const _request = require('request');

function handler(resolve) {
  return (err, response, body) => {
    const data = {
      timings: response.timings,
      timingPhases: response.timingPhases,
      statusCode: response.statusCode,
      body
    };

    // Ignored error
    if (err) {
      resolve(data);
    }

    return resolve(data);
  };
}

async function request(jsonRequest) {
  Object.assign(jsonRequest, {simple: false, time: true, timing: true});

  return new Promise(resolve => _request(jsonRequest, handler(resolve)));
}

module.exports = request;
