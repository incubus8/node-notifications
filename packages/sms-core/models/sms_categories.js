'use strict';

const {db, TABLES} = require('../db');

const findBy = {
  id: id => {
    return db.first()
      .from(TABLES.SMS_CATEGORIES)
      .where('id', id);
  }
};

function allPaginate(perPage, currentPage) {
  return db.from(TABLES.SMS_CATEGORIES)
    .orderBy('updated_at', 'desc')
    .groupBy('created_at')
    .groupBy('id')
    .whereNull('deleted_at')
    .paginate(perPage, currentPage);
}

function update(id, data) {
  const returning = ['id', 'name', 'message_masking_rules', 'message_masking_string', 'updated_at', 'created_at'];
  const values = {
    updated_at: new Date()
  };

  if (data.name) {
    Object.assign(values, {name: data.name});
  }
  if (data.message_masking_rules) {
    Object.assign(values, {message_masking_rules: data.message_masking_rules});
  }
  if (data.message_masking_string) {
    Object.assign(values, {message_masking_string: data.message_masking_string});
  }

  return db.table(TABLES.SMS_CATEGORIES)
    .where('id', id)
    .update(values, returning);
}

module.exports = {
  findBy,
  allPaginate,
  update
};
