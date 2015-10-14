'use strict';
var expect = require('chai').expect;

describe('expressionGenerator', function () {

  var generator = require('./../../../lib/math/expressionGenerator');

  describe('#randomExpression', function () {
    it('should generate a random, simple addition expression', function () {
      expect(
        generator.randomExpression()
      ).to.match(/^[0-9+\-*/^]+\=$/);
    });

    it('should allow specifying count of numbers involved (length)', function () {
      expect(
        generator.randomExpression(3)
      ).to.match(/^([0-9]+[+\-*/^]?){3}\=$/);
      expect(
        generator.randomExpression(6)
      ).to.match(/^([0-9]+[+\-*/^]?){6}\=$/);
      expect(
        generator.randomExpression(1)
      ).to.match(/^([0-9]+[+\-*/^]?){1}\=$/);
    });
  });
});
