'use strict';
var operandRegex = /[\d\w]/;
var operatorValues = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3
};
/**
 * Get a weighted "value" for an operator
 * @param operand
 */
const operatorVal = operand => operatorValues[operand] || 0;

/**
 * Convert an infix expression to postfix format.
 * @param infix
 * @return {string}
 */
function toPostfix(infix) {

  var postfix = '';
  var _stack = makeStack();
  const addItem = item => postfix += `${item} `;
  var expressionPieces = infix.match(/\d+|\D/g);

  if (/^-\d/.test(infix)) {
    // TODO: Fix for this is simple. Require whitespace between "items" (i.e. "-31 + 4 - -33" instead of "-31+4--33"
    throw new Error('Negative numbers not yet supported...');
  }

  expressionPieces
    .forEach(item => {
      if (operandRegex.test(item)) {
        addItem(item);
      } else if (_stack.empty() || operatorVal(item) > operatorVal(_stack.top())) {
        _stack.push(item);
      } else {
        while (!_stack.empty() && operatorVal(item) <= operatorVal(_stack.top())) {
          addItem(_stack.pop());
        }
        _stack.push(item);
      }
    });

  while (!_stack.empty()) {
    addItem(_stack.pop());
  }

  return postfix.trim();
}

/**
 * Evaluate a postfix expression
 * @param postfix
 * @return {number}
 */
function evaluatePostfix(postfix) {
  var stack = makeStack();
  postfix.split(' ').forEach(item => {
    if (operandRegex.test(item)) {
      return stack.push(item);
    }
    var right = stack.pop();
    var left = stack.pop();
    stack.push(evalItems(item, left, right))
  });

  return parseFloat(stack.top(), 10);
}

/**
 * Perform the math!
 * @param operator
 * @param left
 * @param right
 * @return {number}
 */
function evalItems(operator, left, right) {
  left = parseFloat(left, 10);
  right = parseFloat(right, 10);
  switch (operator) {
    case '+': return left + right;
    case '-': return left - right;
    case '/': return left / right;
    case '*': return left * right;
    case '^': return Math.pow(left, right);
  }
}

/**
 * A simple little stack...
 * @return {*}
 */
function makeStack() {
  var items = [];
  return {
    push(item) {
      items.push(item);
    },

    empty() {
      return items.length === 0;
    },

    top() {
      return items[items.length - 1];
    },

    pop() {
      return items.pop();
    }
  };
}

module.exports = {
  toPostfix,
  evaluatePostfix
};
