'use strict';

const all = require('./all');
const get = require('./get');
const create = require('./create');
const patch = require('./patch');
const del = require('./delete');

module.exports = {
  all,
  get,
  create,
  patch,
  delete: del
};
