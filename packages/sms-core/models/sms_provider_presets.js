'use strict';

const {db, TABLES} = require('../db');

const orderByPriority = `
(case priority 
  when 'high' then 3
  when 'medium' then 2
  when 'low' then 1
end) DESC
`;

const findBy = {
  highestPriority: async () => {
    return db.first()
      .from(TABLES.SMS_PROVIDER_PRESETS)
      .whereNotNull('json_request_template')
      .whereNull('deleted_at')
      .orderByRaw(orderByPriority);
  },
  id: id => {
    return db.first()
      .from(TABLES.SMS_PROVIDER_PRESETS)
      .where('id', id)
      .whereNull('deleted_at');
  }
};

function allPaginate(search, perPage, currentPage) {
  return db.from(TABLES.SMS_PROVIDER_PRESETS)
    .whereNull('deleted_at')
    .orderBy('updated_at', 'desc')
    .groupBy('id')
    .paginate(perPage, currentPage);
}

function update(id, data) {
  const values = {
    updated_at: new Date()
  };

  if (data.sender_id) {
    Object.assign(values, {sender_id: data.sender_id});
  }
  if (data.timeout_in_second) {
    Object.assign(values, {timeout_in_second: data.timeout_in_second});
  }
  if (data.retried) {
    Object.assign(values, {retried: data.retried});
  }
  if (data.priority) {
    Object.assign(values, {priority: data.priority});
  }
  if (data.error_check_xpath) {
    Object.assign(values, {error_check_xpath: data.error_check_xpath});
  }
  if (data.request_type) {
    Object.assign(values, {request_type: data.request_type});
  }
  if (data.name) {
    Object.assign(values, {name: data.name});
  }
  if (data.json_request_template) {
    Object.assign(values, {json_request_template: data.json_request_template});
  }

  return db.table(TABLES.SMS_PROVIDER_PRESETS)
    .where('id', id)
    .update(values, '*');
}

module.exports = {
  findBy,
  allPaginate,
  update
};
