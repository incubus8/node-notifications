
const {db, TABLES} = require('../db');

function insert(data) {
  const values = {
    request_id: data.reqId,
    sms_to: data.to,
    sms_from: data.smsSender.value,
    sms_message: data.message,
    sms_content_hash: 'abcd',
    job_status: 'START',
    retry_count: 0,
    sms_provider_preset_id: data.smsPreset.id,
    json_cmd: data.json_cmd,
    recorded_at: new Date()
  };

  return db.insert(values)
    .returning('id')
    .into(TABLES.SMS_PROVIDER_TRACKERS);
}

function addRetry(prevSmsTrackers) {
  const values = {
    sms_to: prevSmsTrackers.sms_to,
    sms_message: prevSmsTrackers.sms_message,
    sms_from: prevSmsTrackers.sms_from,
    sms_content_hash: prevSmsTrackers.sms_content_hash,

    job_status: 'START',
    retry_count: (prevSmsTrackers.retry_count += 1),
    recorded_at: new Date()
  };

  return db.insert(values)
    .into(TABLES.SMS_PROVIDER_TRACKERS);
}

function updateWithResponse(id, response) {
  return db.transaction(trx => {
    return trx
      .table(TABLES.SMS_PROVIDER_TRACKERS)
      .update({
        real_response_time: response.timings.end,
        response_data: response.body,
        response_status: response.statusCode,
        timings: response.timings,
        timingPhases: response.timingPhases,
        job_status: 'COMPLETE'
      })
      .where('id', id);
  });
}

function allPaginate(search) {
  let query = db.from(TABLES.SMS_PROVIDER_TRACKERS);

  if (search.to) {
    query = query.where('sms_to', search.to);
  }

  if (search.content) {
    query = query.where('sms_message', search.content);
  }

  if (search.response_status) {
    query = query.where('response_status', search.responseStatus);
  }

  if (!search.perPage) {
    search.perPage = 50;
  }

  return query
    .whereNull('deleted_at')
    .orderBy('created_at', 'desc')
    .groupBy('created_at')
    .groupBy('id')
    .paginate(search.perPage, search.currentPage);
}

module.exports = {
  insert,
  updateWithResponse,
  addRetry,
  allPaginate
};
