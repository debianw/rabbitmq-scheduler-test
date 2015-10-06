/**
 *
 */

var jackrabbit = require('jackrabbit');
var config = require('../config');

var rabbit = jackrabbit(config.rabbit_url);
var exchange = rabbit.default();
var noop = function () {};

var QUEUE_NAME = 'rpc_schedule';

/**
 *
 */

module.exports.schedule = function (operation, callback) {

  callback = callback || noop;

  exchange.publish(operation, {
    key: QUEUE_NAME,
    reply: onReply    // auto sends necessary info so the reply can come to the exclusive reply-to queue for this rabbit instance
  });

  function onReply (campaign) {
    console.log('on reply => ', campaign);

    callback(campaign);
    //rabbit.close();
  }

};

/**
 *
 */

module.exports.unschedule = function (operation, callback) {
  callback = callback || noop;

  exchange.publish(operation, {
    key: QUEUE_NAME,
    reply: onReply
  });

  function onReply (campaign) {
    console.log('on reply => ', campaign);
    callback(campaign);
  }
}