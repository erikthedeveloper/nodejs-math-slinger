'use strict';
var request = require('supertest');
var server = require('./../../server');
var app = server();

describe('Math Evaluator Service [integration]', function () {

  describe('POST /evaluate', function () {
    it('should accept and evaluate a basic addition expression', function (done) {
      request(app)
        .post('/evaluate')
        .send('2+3=')
        .expect(200, '5', done);
    });

    it('should accept and evaluate a lengthy addition expression', function (done) {
      request(app)
        .post('/evaluate')
        .send('1+3+53+78+123456789+9+12+8=')
        .expect(200, '123456953', done);
    });

    it('should reject invalid expressions', function (done) {
      assertRequestsFail([
        // Requires "="
        '1+3',
        // Only supports addition
        '1-2=',
        '1+2-3=',
        // Garbage, empty, etc...
        'Just plain garbage...',
        ''
      ]);

      function assertRequestsFail(expressions) {
        var expression = expressions.pop();
        request(app)
          .post('/evaluate')
          .send(expression)
          .expect(400, /Invalid/i, function(err) {
            if (err) {
              return done(new Error(`${err.message} \n\tExpression: "${expression}"`));
            }
            if (expressions.length === 0) {
              return done();
            }
            assertRequestsFail(expressions);
          })
      }
    });

  });


});
