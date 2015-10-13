'use strict';
var streams = require('./../util/streams');
var log = require('./../util/log');
var respond = require('./../util/http').respond;

/**
 * Attach req.body as full "string" contents of req Stream
 */
function stringBodyMiddleware(req, res, next) {
  streams.streamToString(req, function(str) {
    req.body = str;
    next();
  });
}

/**
 * @param {String} method HTTP method
 * @return {Function}
 */
function enforceMethod(method) {
  return function(req, res, next) {
    if (req.method !== method.toUpperCase()) {
      res.statusCode = 400;
      respond(res, 'Only POST Allowed...')
    }
    next();
  }
}

function logIncomingMiddleware(req, res, next) {
  log('SERVER - INCOMING REQUEST: ' + req.body);
  next();
}


module.exports = {
  stringBodyMiddleware,
  enforceMethod,
  logIncomingMiddleware
};
