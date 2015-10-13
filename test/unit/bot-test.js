'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');
var http = require('http');
var PassThrough = require('stream').PassThrough;

var bot = require('./../../bot');

describe('Math Bot', function () {
  // TODO: This is basically garbage...

  var botInstance;
  var stubbedRequest;

  beforeEach(function() {
    stubbedRequest = sinon.stub(http, 'request');
    botInstance = bot('TestBot');
  });

  afterEach(function() {
    stubbedRequest.restore();
  });

  it('Requests solution to expression and does that funky thing...', function(done) {

    var expression = '1+1=';
    var expectedSolution = '2';
    var expectedResponse = new PassThrough();
    var request = new PassThrough();
    request.write('foo');

    expectedResponse.end(expectedSolution);

    stubbedRequest
      .callsArgWith(1, expectedResponse)
      .returns(request);

    botInstance.askMath(expression, function(solution) {
      expect(solution).to.equal(expectedSolution);
      done();
    });

  });
});
