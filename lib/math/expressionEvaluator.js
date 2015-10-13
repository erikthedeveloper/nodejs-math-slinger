'use strict';
/*
Currently, only simple addition is supported
*/

function validateExpression(expr) {
  return /^[0-9+]+\=$/.test(expr);
}

function evaluateExpression(expr) {
  var result = expr
    .split('+')
    .reduce((sum, n) => sum + parseInt(n, 10), 0);
  return result;
}

module.exports = {
  validateExpression,
  evaluateExpression
};
