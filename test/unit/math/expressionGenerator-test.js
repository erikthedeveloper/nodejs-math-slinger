'use strict';
var assert = require('chai').assert;

describe('expressionGenerator', function() {

  var randomExpression = require('./../../../lib/math/expressionGenerator').randomExpression;

  describe('#randomExpression', function() {
    it('should generate a random, simple addition expression', function() {
      assert.match(randomExpression(), /^[0-9+\-*/^]+\=$/);
    });

    it('should allow specifying count of numbers involved (length)', function() {
      assert.match(randomExpression(3), /^([0-9]+[+\-*/^]?){3}\=$/);
      assert.match(randomExpression(6), /^([0-9]+[+\-*/^]?){6}\=$/);
      assert.match(randomExpression(1), /^([0-9]+[+\-*/^]?){1}\=$/);
    });
  });
});
