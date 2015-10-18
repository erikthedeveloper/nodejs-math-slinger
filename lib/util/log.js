'use strict';
var utilLog = require('util').log;

function log(msg) {
  if (process.env.NODE_ENV !== 'test') {
    utilLog(msg);
  }
}

module.exports = log;
