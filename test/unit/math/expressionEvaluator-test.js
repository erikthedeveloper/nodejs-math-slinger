'use strict';
var expect = require('chai').expect;

describe('expressionEvaluator', function () {

  var evaluator = require('./../../../lib/math/expressionEvaluator');

  describe('#validateExpression', function () {
    var validate = evaluator.validateExpression;
    it('should pass for a simple addition expression', function () {
      expect(
        validate('2+3+13=')
      ).to.be.true;
    });

    it('should fail for a simple subtraction expression', function () {
      expect(
        validate('2+3-13=')
      ).to.be.false;
    });

    it('should enforce the ending "="', function () {
      expect(
        validate('2+3+13')
      ).to.be.false;
    });

    it('should not allow any whitespace', function () {
      expect(
        validate('2 + 3 + 13=')
      ).to.be.false;
    });
  });

  describe('#evaluateExpression', function () {
    var evaluate = evaluator.evaluateExpression;

    it('evaluates simple addition expressions', function () {
      [
        ['0=', 0],
        ['1+0=', 1],
        ['2+3=', 5],
        ['1+3=', 4],
        ['10+20+5=', 35],
      ].forEach(pair =>
        expect(
          evaluate(pair[0])
        ).to.equal(pair[1])
      );
    });

    //it('throws...')
  });
});
