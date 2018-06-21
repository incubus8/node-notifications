
exports.up = (knex, Promise) => {
  return Promise.all([
    // Maybe we can move this to use Redis KV
    // For now, just use single data store
    knex.schema.createTableIfNotExists('sms_insight_numbers', table => {
      table.increments('id').notNullable();
      table.string('user_request_number').notNullable();
      table.string('international_format_number').notNullable();
      table.string('national_format_number').notNullable();
      table.string('request_id').notNullable();
      table.timestamps(true, true);
      table.timestamp('deleted_at');
    }),

    knex.schema.createTableIfNotExists('sms_senders', table => {
      table.increments('id').notNullable();
      table.string('value').notNullable();
      table.string('security_token');
      table.timestamps(true, true);
      table.timestamp('deleted_at');
    }),

    knex.schema.createTableIfNotExists('sms_categories', table => {
      table.increments('id').notNullable();
      table.string('name').notNullable();
      table.string('message_masking_rules');
      table.string('message_masking_string');
      table.timestamps(true, true);
      table.timestamp('deleted_at');
    }),

    knex.schema.createTableIfNotExists('sms_provider_presets', table => {
      table.increments('id').notNullable();
      table.string('name').notNullable();

      table.jsonb('json_request_template').notNullable();

      table.integer('timeout_in_second').notNullable();
      table.integer('time_to_complete_in_second').notNullable();
      table.integer('retried').notNullable();
      table.string('priority').notNullable();
      table.string('error_check_xpath');
      table.string('request_type');
      table.integer('sender_id').notNullable().references('sms_senders.id');
      table.timestamps(true, true);
      table.timestamp('deleted_at');
    }),

    knex.schema.createTableIfNotExists('sms_provider_trackers', table => {
      table.increments('id');

      // In SMSGW-1, We use this for tracking sidekiq id
      table.string('job_id');
      // For SMSGW-2, taken from request header, if not present it will be starting from 0 each time server starts
      table.string('request_id');

      table.string('sms_to').notNullable();
      table.string('sms_from').notNullable();
      table.string('sms_message').notNullable();
      table.string('sms_content_hash').notNullable();
      table.string('job_status').notNullable();

      table.text('response_data', 'longtext');
      table.string('response_status');
      table.string('real_response_time'); // Deprecated
      table.jsonb('timings');
      table.jsonb('timingPhases');

      // Number of attempted messages being sent
      table.string('retry_count').notNullable();
      table.timestamp('recorded_at').notNullable();
      table.integer('sms_provider_preset_id').notNullable().references('sms_provider_presets.id');
      table.jsonb('dc_data');

      // Not used for backward compability from smsgw-1
      table.string('curl_cmd');
      // Record json preset template, we don\'t use column in table sms_provider_presets for better integrity track.
      table.jsonb('json_cmd');

      table.timestamps(true, true);
      table.timestamp('deleted_at');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.resolve();
};
