const Knex = require('knex');
const KnexQueryBuilder = require('knex/lib/query/builder');
const config = require('./knexfile');
const environment = process.env.NODE_ENV || 'development';

exports.db = Knex(config[environment]);

KnexQueryBuilder.prototype.paginate = function (per_page = 8, current_page = 1) {
  per_page = Number(per_page);
  current_page = Number(current_page);

  let page = current_page;
  if (page < 1) {
    page = 1;
  }

  const offset = (page - 1) * per_page;
  return Promise.all([
    this.clone().count('* as count').first(),
    this.offset(offset).limit(per_page)
  ])
    .then(values => {
      if (!values[0] || !values[1]) {
        return {
          data: [],
          total: 0,
          per_page,
          offset,
          to: 0,
          last_page: 0,
          current_page: 0,
          from: 0
        };
      }

      const count = values[0].count;
      const rows = values[1];
      return {
        data: rows,
        total: count,
        per_page,
        offset,
        to: offset + rows.length,
        last_page: Math.ceil(count / per_page),
        current_page: page,
        from: offset
      };
    });
};

exports.db.queryBuilder = function () {
  return new KnexQueryBuilder(exports.db.client);
};

exports.TABLES = {
  SMS_CATEGORIES: 'sms_categories',
  SMS_SENDERS: 'sms_senders',
  SMS_PROVIDER_PRESETS: 'sms_provider_presets',
  SMS_PROVIDER_TRACKERS: 'sms_provider_trackers',
  SMS_INSIGHT_NUMBERS: 'sms_insight_numbers'
};
