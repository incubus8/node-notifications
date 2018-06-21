'use strict';

const {db, TABLES} = require('../db');

const findBy = ({
  idAndSecurityToken: (id, securityToken) => {
    const query = db.first()
      .from(TABLES.SMS_SENDERS)
      .where('id', id)
      .orderBy('created_at');

    if (securityToken) {
      return query.where('security_token', securityToken);
    }

    return query;
  }
});

function allPaginate(search, perPage, currentPage) {
  return db.from(TABLES.SMS_SENDERS)
    .paginate(perPage, currentPage);
}

module.exports = {
  findBy,
  allPaginate
};
