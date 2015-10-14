'use strict';
var log = require('./log');

function respond(res, content) {
  log('SERVER - OUTGOING RESPONSE: ' + content);
  res.end(content + '');
}

module.exports = {
  respond
};
