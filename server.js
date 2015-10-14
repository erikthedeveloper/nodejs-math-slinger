'use strict';
var connect = require('connect');
var http = require('http');
var mw = require('./lib/middleware');
var respond = require('./lib/util/http').respond;
var log = require('./lib/util/log');
var evalutor = require('./lib/math/expressionEvaluator');

var queryString = require('querystring');
var url = require('url');

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

/**
 * GET /math?expression={encodeURIComponent('1+2=')}
 */
app.listen('/math', [
  mw.enforceMethod('GET'),
  (req, res, next) => {
    req.query = url.parse(req.url, true).query;
    log('SERVER - INCOMING REQUEST: ' + req.query.expression);
    next();
  },
  (req, res) => {
    var expression = req.query.expression;
    if (!evalutor.validateExpression(expression)) {
      res.statusCode = 400;
      return respond(res, 'Invalid expressionz!');
    }
    return respond(res, evalutor.evaluateExpression(expression));
  }
]);

/**
 * POST /evaluate (body='1+2=')
 */
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
