'use strict';

/**
 * @param {Readable} stream
 * @param {function} cb
 */
function streamToString(stream, cb) {
  var str = '';
  stream
    .setEncoding('utf8')
    .on('data', chunk => str += chunk)
    .on('end', _ => cb(str));
}

module.exports = {
  streamToString
};
