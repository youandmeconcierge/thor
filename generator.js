'use strict';

/**
 * Generate a UTF-8 messages that we will be send to a connected client.
 *
 * @async
 * @param {String} id The task ID being worked on.
 * @param {Number} size The specified in bytes for the message.
 * @param {Function} fn The callback function for the data.
 * @public
 */
exports.utf8 = function utf(id, size, fn) {
  var key = 'utf8::'+ size
    , cached = cache[key];

  // We have a cached version of this size, return that instead.
  if (cached) return fn(undefined, cached);

  cached = cache[key] = new Buffer(size).toString('utf-8');
  fn(undefined, cached);
};

/**
 * Generate a binary message that we will be send to a connected client.
 *
 * @async
 * @param {String} id The task ID being worked on.
 * @param {Number} size The specified in bytes for the message.
 * @param {Function} fn The callback function for the data.
 * @public
 */
exports.binary = function binary(id, size, fn) {
  var key = 'binary::'+ size
    , cached = cache[key];

  // We have a cached version of this size, return that instead.
  if (cached) return fn(undefined, cached);

  cached = cache[key] = new Buffer(size);
  fn(undefined, cached);
};

/**
 * Generate a custom URL for the websocket connection. Returns the new URL to use.
 *
 * @param {String} original_url The original connection URL specified by the user.
 * @param {String} task_id The ID of the task being worked on.
 * @public
 */
exports.custom_url = function custom_url(original_url, task_id) {
  return original_url;
};


//
// The following is not needed to create a session file. We don't want to
// re-create & re-allocate memory every time we receive a message so we cache
// them in a variable.
//
var cache = Object.create(null);
