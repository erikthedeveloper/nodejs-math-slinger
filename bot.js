'use strict';
var http = require('http');
var streams = require('./lib/util/streams');
var log = require('./lib/util/log');

var requestOptions = {
  host: 'localhost',
  port: 3000
};

function bot(options) {
  options = options || {};

  return {

    /** @type {http} */
    client: options.client || http,

    /** @type {String} */
    name: options.name || generateBotName(),

    /**
     * @param {string} expression
     * @param {function} callback
     */
    askMath(expression, callback) {
      this.get('/math', {expression}, callback);
      this.log(`REQUEST: ${expression}`);
    },

    get(uri, data, callback) {
      var fullUri = uri + '?' + require('querystring').stringify(data);
      var req = this.request({path: fullUri, method: 'GET'}, callback);
      req.end();
    },

    /**
     * HTTP request
     * @param options
     * @param callback
     * @return {*}
     */
    request(options, callback) {
      var req = this.client.request(
        Object.assign({}, requestOptions, options),
        res => streams.streamToString(res, callback)
      );
      req.on('error', err => this.log(`Error making request! \n${err.message}`));
      return req;
    },

    log(msg) {
      log(`${this.name} - ${msg}`);
    }
  };

}

function generateBotName() {
  return 'BOT_' + Math.ceil(Math.random() * 1000);
}

module.exports = bot;
