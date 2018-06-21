'use strict';

const {db, TABLES} = require('../db');

const findBy = {
  userRequestNumber: async userRequestNumber => {
    return db.first()
      .from(TABLES.SMS_INSIGHT_NUMBERS)
      .whereNull('deleted_at')
      .where('user_request_number', userRequestNumber);
  }
};

function insert(userNumber, response) {
  const values = {
    user_request_number: userNumber,
    request_id: response.request_id,
    international_format_number: response.international_format_number,
    national_format_number: response.national_format_number
  };

  return db.insert(values)
    .returning('international_format_number')
    .into(TABLES.SMS_INSIGHT_NUMBERS);
}

module.exports = {
  findBy,
  insert
};
