'use strict';

/**
 *
 */

var jackrabbit = require('jackrabbit');
var config = require('../config');
var controller = require('./controller');

var rabbit = jackrabbit(config.rabbit_url);

var exchange = rabbit.default();
var queue = exchange.queue({
  name: 'rpc_schedule', 
  prefetch: 1, 
  durable: false
});

queue.consume(onRequest);

console.log('worker started');

/**
 *
 */

function onRequest (options, reply) {
  options = options || {};

  switch (options.method) {

    //
    case 'schedule':
      controller.queue(options, reply);
    break;

    //
    case 'unschedule':
      controller.unqueue(options, reply);
    break;

    default:
      reply(new Error('Method not found'));
    break;

  }

}