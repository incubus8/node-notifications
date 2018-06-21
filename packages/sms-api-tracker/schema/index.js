'use strict';

const all = require('./all');
const get = require('./get');
const create = require('./create');
const del = require('./delete');
const patch = require('./patch');

module.exports = {
  all,
  get,
  create,
  patch,
  delete: del
};
