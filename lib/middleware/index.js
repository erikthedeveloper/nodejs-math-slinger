'use strict';
var respond = require('./../util/http').respond;
var url = require('url');

/**
 * @param {String} method HTTP method
 * @return {Function}
 */
function enforceMethod(method) {
  return function(req, res, next) {
    if (req.method !== method.toUpperCase()) {
      res.statusCode = 400;
      respond(res, `Only ${method} Allowed...`)
    }
    next();
  }
}

/**
 * Attach req.query (decoded query string as object
 * @param req
 * @param res
 * @param next
 */
function queryString(req, res, next) {
  req.query = url.parse(req.url, true).query;
  next();
}


module.exports = {
  enforceMethod,
  queryString,
};
