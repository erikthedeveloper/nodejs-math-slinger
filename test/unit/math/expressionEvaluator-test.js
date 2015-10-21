'use strict';
var expect = require('chai').expect;
var evaluator = require('./../../../lib/math/expressionEvaluator');

describe('expressionEvaluator', function () {


  describe('#validateExpression', function () {
    var validate = evaluator.validateExpression;
    it('should pass for a simple addition expression', function () {
      expect(
        validate('2+3+13=')
      ).to.be.true;
    });

    it('should pass for a simple subtraction expression', function () {
      expect(
        validate('2+3-13=')
      ).to.be.true;
    });

    it('should pass for an expression containing parentheses', function () {
      expect(
        validate('2*(12-10)=')
      ).to.be.true;
    });

    it('should fail for an expression containing unclosed/mismatched parentheses', function () {
      expect(
        validate('2*(12-10=')
      ).to.be.false;
      expect(
        validate('2+(4+4)+4)(=')
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

    it('evaluates addition/substraction expressions', function () {
      [
        ['2+3-1=', 4],
        ['1+3-2=', 2],
        ['20-10+5=', 15],
      ].forEach(pair =>
        expect(
          evaluate(pair[0])
        ).to.equal(pair[1], 'For: ' + pair[0])
      );
    });

    it('evaluates multiplication/division expressions', function () {
      [
        ['2*2=', 4],
        ['2*3*4=', 24],
        ['2*10/5=', 4],
      ].forEach(pair =>
        expect(
          evaluate(pair[0])
        ).to.equal(pair[1], 'For: ' + pair[0])
      );
    });

    it('evaluates exponent expressions', function () {
      [
        ['2^10=', 1024],
        ['2+4^4=', 258]
      ].forEach(pair =>
        expect(
          evaluate(pair[0])
        ).to.equal(pair[1], 'For: ' + pair[0])
      );
    });

  });
});
