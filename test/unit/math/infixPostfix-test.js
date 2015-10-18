'use strict';
var assert = require('chai').assert;
var infixPostfix = require('./../../../lib/math/infixPostfix');

describe('Infix to Postfix Converter', function () {

  it('Should convert simple addition', function () {
    assert.equal(infixPostfix.toPostfix('x+2+9'), 'x 2 + 9 +');
  });

  it('should convert all sorts of infix goodies to postfix...', function() {
    assert.equal(infixPostfix.toPostfix('2+9-3'), '2 9 + 3 -');
    assert.equal(infixPostfix.toPostfix('a+23+9*3'), 'a 23 + 9 3 * +');
    assert.equal(infixPostfix.toPostfix('3+4*5'), '3 4 5 * +');
    assert.equal(infixPostfix.toPostfix('3+4*5'), '3 4 5 * +');
    assert.equal(infixPostfix.toPostfix('1*2^3+4'), '1 2 3 ^ * 4 +');
  });

  it('should reject expressions containing negative numbers', function() {
    assert.throws(infixPostfix.toPostfix.bind(null, '-3+4'));
  });

});

describe('Postfix Evaluator', function () {
  it('does math', function() {
    assert.equal(infixPostfix.evaluatePostfix('3 4 5 * +'), 23);
    assert.equal(infixPostfix.evaluatePostfix('8 4 2 / -'), 6);
    assert.equal(infixPostfix.evaluatePostfix('1 2 3 ^ * 4 +'), 12);
    assert.equal(infixPostfix.evaluatePostfix('7 1 3 1 * * 4 / -'), 6.25)
  });
});
