const cluster = require('cluster');
const {services} = require('@incubus8/sms-core');

const numWorkers = process.env.NUM_OF_WORKERS || 8;

if (cluster.isMaster) {
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  services.queueManager
    .SmsQueue.process(require('./worker/sms_worker')(cluster));
}
