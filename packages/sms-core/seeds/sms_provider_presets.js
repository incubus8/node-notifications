
exports.seed = knex => {
  return knex('sms_senders').del()
    .then(() => {
      return knex('sms_senders').insert([
        // Add here
        // {id: 1, value: '+6281'}
      ]);
    })
    .then(() => {
      return knex('sms_provider_presets').del()
        .then(() => {
          return knex('sms_provider_presets').insert([
            // Add here
          ]);
        });
    });
};
