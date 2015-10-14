'use strict';
var infixPostfix = require('./infixPostfix');

/**
 * Validate expression.
 *  Require trailing "="
 *  Allow operators: + - * / ^
 */
function validateExpression(expr) {
  return /^[0-9+\-*/^]+\=$/.test(expr);
}

function evaluateExpression(expr) {
  if (!validateExpression(expr)) {
    throw new Error(`Invalid expression supplied "${expr}"`);
  }
  var infix = expr.replace('=', '');
  return infixPostfix.evaluatePostfix(
    infixPostfix.toPostfix(infix)
  );
}

module.exports = {
  validateExpression,
  evaluateExpression
};
