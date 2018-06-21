'use strict';

module.exports = cluster => (job, done) => {
  console.log('Job done by worker', cluster.worker.id, job.id);

  done();
};
