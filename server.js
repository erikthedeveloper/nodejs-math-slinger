'use strict';
var connect = require('connect');
var http = require('http');
var mw = require('./lib/middleware');
var respond = require('./lib/util/http').respond;
var log = require('./lib/util/log');
var evalutor = require('./lib/math/expressionEvaluator');

const ensureArray = item => Array.isArray(item) ? item : [item];

var app = Object.assign(connect(), {
  /**
   * @param {String} uri
   * @param {Function|Array} middlewares
   */
  listen(uri, middlewares) {
    ensureArray(middlewares).forEach(middleware => this.use(uri, middleware));
  },

  /**
   * Listen for GET requests at `uri`
   * @param {String} uri
   * @param {Function|Array} middlewares
   */
  get(uri, middlewares) {
    this.listen(uri, [
      mw.enforceMethod('GET'),
      mw.queryString,
    ].concat(ensureArray(middlewares)));
  }
});

/**
 * GET /math?expression={encodeURIComponent('1+2=')}
 */
app.get('/math', function(req, res) {
  var expression = req.query.expression;
  log('SERVER - INCOMING REQUEST: ' + req.query.expression);
  if (!evalutor.validateExpression(expression)) {
    res.statusCode = 400;
    return respond(res, 'Invalid expression!');
  }
  return respond(res, evalutor.evaluateExpression(expression));
});

module.exports = function() {
  return http.createServer(app);
};
