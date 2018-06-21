
exports.seed = knex => {
  return knex('sms_senders').del()
    .then(() => {
      return knex('sms_senders').insert([
        {id: 1, value: '+6281225088578'},
        {id: 2, value: 'BTPN'},
        {id: 3, value: 'Jenius'}
      ]);
    })
    .then(() => {
      return knex('sms_provider_presets').del()
        .then(() => {
        // Inserts seed entries
          return knex('sms_provider_presets').insert([
            {
              id: 1,
              name: '[DEV] Twillio',
              json_request_template: JSON.stringify({
                method: 'POST',
                url: 'https://api.twilio.com/2010-04-01/Accounts/AC7a3bd7b4a2b509629ed7d8f23db53bcf/Messages.json',
                headers: {
                  'User-Agent': 'twilio-node/3.9.2 v8.9.1',
                  'Accept-Charset': 'utf-8',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  Accept: 'application/json'
                },
                form: {
                  To: '{MobileNumber}',
                  From: '{SenderId}',
                  Body: '{SmsMessage}'
                },
                auth: {
                  username: 'AC7a3bd7b4a2b509629ed7d8f23db53bcf',
                  password: '6c74737102defb75af7ba461ef5c2d0b'
                },
                json: true
              }),
              timeout_in_second: 10,
              time_to_complete_in_second: 8,
              retried: 2,
              sender_id: 1,
              priority: 'low',
              error_check_xpath: '$..message',
              request_type: 'third_party'
            },
            {
              id: 2,
              name: '[DEV] Nexmo',
              json_request_template: JSON.stringify({
                method: 'POST',
                url: 'https://rest.nexmo.com/sms/json',
                form: {
                  api_key: '1fab22df',
                  api_secret: '383de9b2a2dcd72a',
                  from: '{SenderId}',
                  to: '{MobileNumber}',
                  text: '{SmsMessage}'
                }
              }),
              time_to_complete_in_second: 10,
              timeout_in_second: 10,
              retried: 2,
              sender_id: 1,
              priority: 'high',
              error_check_xpath: '$..error-text',
              request_type: 'third_party'
            },
            {
              id: 3,
              json_request_template: JSON.stringify({
                url: 'http://10.1.82.132:8840/dc/BtpnNotificationServices',
                method: 'POST',
                headers: {
                  'Content-Type': 'text/xml;charset=UTF-8',
                  SOAPAction: 'http://pegasus/integration/BtpnNotificationService/SmsNotificationGeneral'
                },
                body: `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:btp="http://pegasus/integration/btpnnotification">
    <soapenv:Header/>
    <soapenv:Body>
      <btp:SmsNotificationGeneral>
        {request_data}
      </btp:SmsNotificationGeneral>
    </soapenv:Body>
  </soapenv:Envelope>`
              }),
              name: '[SIT] FFC',
              time_to_complete_in_second: 10,
              timeout_in_second: 10,
              retried: 2,
              sender_id: 2,
              priority: 'low',
              request_type: 'ffc'
            }
          ]);
        });
    });
};
