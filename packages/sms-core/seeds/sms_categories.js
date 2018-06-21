'use strict';

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('sms_categories').del()
    .then(() => {
      // Inserts seed entries
      return knex('sms_categories').insert([
        {id: 1, name: 'OTP', message_masking_rules: '.{3}$', message_masking_string: 'xxx'},
        {id: 2, name: 'Reset Password'},
        {id: 3, name: 'Promotion'}
      ]);
    });
};
