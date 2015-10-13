'use strict';
var connect = require('connect');
var http = require('http');
var mw = require('./lib/middleware');
var respond = require('./lib/util/http').respond;
var log = require('./lib/util/log');
var evalutor = require('./lib/math/expressionEvaluator');

var app = Object.assign(connect(), {
  /**
   * @param {String} uri
   * @param {Function|Array} middlewares
   */
  listen(uri, middlewares) {
    if (!Array.isArray(middlewares)) middlewares = [middlewares];
    middlewares.forEach(middleware => this.use(uri, middleware));
  }
});

app.listen('/evaluate', [
  mw.enforceMethod('POST'),
  mw.stringBodyMiddleware,
  mw.logIncomingMiddleware,
  evaluateHandler,
]);

/**
 * POST /evaluate
 */
function evaluateHandler(req, res) {
  if (!evalutor.validateExpression(req.body)) {
    res.statusCode = 400;
    return respond(res, 'Invalid expression!');
  }

  return respond(res, evalutor.evaluateExpression(req.body));
}

module.exports = function() {
  return http.createServer(app);
};
