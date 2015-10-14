'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var http = require('http');
var PassThrough = require('stream').PassThrough;

var bot = require('./../../bot');

describe('MathBot - Requester of Mathematical Solutions', function() {
  var stubbedRequest;
  var dummyRequest;
  var dummyResponse;

  beforeEach(function() {
    stubbedRequest = sinon.stub(http, 'request');
    dummyResponse = new PassThrough();
    dummyRequest = new PassThrough();
  });

  afterEach(function() {
    stubbedRequest.restore();
  });

  it('Accepts options and is humanized via "name"', function () {
    expect(bot().name).to.match(/BOT_/, 'Should have default/generate name');
    expect(bot({name: 'TestBot'}).name).to.equal('TestBot');
    expect(bot({client: http}).client).to.equal(http);
    expect(bot({foo: 'bar'}).foo, 'Only whitelist options!').to.be.undefined;
  });

  it('should request a "solution" to an "expression" via HTTP "/evaluate"', function(done) {
    var expression = '1+1=';
    var expectedSolution = '2';
    var spyRequestWrite = sinon.spy(dummyRequest, 'write');

    dummyResponse.end(expectedSolution);

    stubbedRequest
      .callsArgWith(1, dummyResponse, 'request({}, cb) cb is called w/ Stream')
      .returns(dummyRequest);

    bot({client: http}).askMath(expression, function(solution) {
      expect(solution).to.equal(expectedSolution, 'Expected solution {string} read from response Stream');
      sinon.assert.calledWith(spyRequestWrite, expression);
      done();
    });
  });
});
