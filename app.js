'use strict';
var server = require('./server');
var log = require('./lib/util/log');
var PORT = process.env.PORT || 3000;

server().listen(PORT, function () {
  log(`Listening on port ${PORT}`);
});
