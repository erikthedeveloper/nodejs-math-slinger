'use strict';
var respond = require('./../util/http').respond;

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


module.exports = {
  enforceMethod
};
