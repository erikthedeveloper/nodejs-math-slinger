'use strict';
var infixPostfix = require('./infixPostfix');

/**
 * Validate expression.
 *  Require trailing "="
 *  Allow operators: + - * / ^
 *  Cannot begin with a negative number
 *  Valid use of parentheses
 */
function validateExpression(expr) {
  return (
    /^([0-9+\-*/^()])+\=$/.test(expr) &&
    /^[^\-]/.test(expr) &&
    validateClosingParentheses(expr)
  )
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

/**
 * Verify correct usage of parentheses opening/closing
 * @param {string} expr
 */
function validateClosingParentheses(expr) {
  var balance = 0;
  for (let char of expr.split('')){
    if (char === "(") balance++;
    if (char === ')') balance--;
    if (balance < 0) return false;
  }

  return balance === 0;
}

module.exports = {
  validateExpression,
  evaluateExpression
};
