'use strict';
var assert = require('chai').assert;
var evaluator = require('./../../../lib/math/expressionEvaluator');

describe('expressionEvaluator', function () {


  describe('#validateExpression', function () {
    const assertValidate = (expected, expr) => {
      assert.equal(expected, evaluator.validateExpression(expr));
    };
    it('should pass for a simple addition expression', function () {
      assertValidate(true, '2+3+13=');
    });

    it('should pass for a simple subtraction expression', function () {
      assertValidate(true, '2+3-13=');
    });

    it('should pass for an expression containing parentheses', function () {
      assertValidate(true, '2*(12-10)=');
    });

    it('should fail for an expression containing unclosed/mismatched parentheses', function () {
      assertValidate(false, '2*(12-10=');
      assertValidate(false, '2+(4+4)+4)(=');
    });

    it('should enforce the ending "="', function () {
      assertValidate(false, '2+3+13');
    });

    it('should not allow any whitespace', function () {
      assertValidate(false, '2 + 3 + 13=');
    });
  });

  describe('#evaluateExpression', function () {
    const assertSolutions = pairs => pairs.forEach(pair =>
      assert.equal(
        pair[1],
        evaluator.evaluateExpression(pair[0]),
        'Expression: ' + pair[0]
      )
    );

    it('evaluates simple addition expressions', function () {
      assertSolutions([
        ['0=', 0],
        ['1+0=', 1],
        ['2+3=', 5],
        ['1+3=', 4],
        ['10+20+5=', 35],
      ])
    });

    it('evaluates addition/substraction expressions', function () {
      assertSolutions([
        ['2+3-1=', 4],
        ['1+3-2=', 2],
        ['20-10+5=', 15],
      ]);
    });

    it('evaluates multiplication/division expressions', function () {
      assertSolutions([
        ['2*2=', 4],
        ['2*3*4=', 24],
        ['2*10/5=', 4],
      ]);
    });

    it('evaluates exponent expressions', function () {
      assertSolutions([
        ['2^10=', 1024],
        ['2+4^4=', 258]
      ]);
    });

    it('evaluates expressions containing parentheses', function () {
      assertSolutions([
        ['10*(5-3)=', 20],
        ['100/(2*(10/5))=', 25]
      ]);
    });

  });
});
