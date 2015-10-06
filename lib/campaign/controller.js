'use strict';

/**
 *
 */

var _schedule = require('node-schedule');
var scheduler = require('./scheduler');
var _queue = {};

/**
 *
 */

exports.scheduleAll = function scheduleAll () {
  /*var operation;

  console.log('scheduling all...');

  for (var i = 1; i <= 20; i++) {
    operation = {
      method: 'schedule',
      campaign: {
        id: i,
        dateStart: new Date('2015-10-06T07:26:00.386Z')
      }
    }

    setTimeout(function (op) {
      
      return function () {
        scheduler.schedule(op);
      }

    }(operation), i*100);
  }*/

};

/**
 *
 */

exports.schedule = function schedule (req, res, next) {

  var id = req.body.id;
  var start = new Date(req.body.start);

  var operation = {
    method: 'schedule',
    campaign: {
      id: id,
      dateStart: start
    }
  };

  scheduler.schedule(operation);

  res.json(operation);
};

/**
 *
 */

exports.unschedule = function unschedule (req, res, next) {
  var id = req.body.id;

  var operation = {
    method: 'unschedule',
    campaign: {
      id: id
    }
  };

  scheduler.unschedule(operation);

  res.json(operation);
};

/**
 *
 */

exports.queue = function queue (options, fn) {
  options = options || {};

  var campaign = options.campaign;

  console.log('queue campaign => ', options);

  var job = _queue[campaign.id];

  if (job) return fn(options);

  job = _schedule.scheduleJob(campaign.dateStart, function () {
    console.log('running campaign => ', campaign);
  });

  _queue[campaign.id] = job;

  fn(options);
}

/**
 *
 */

exports.unqueue = function unqueue (options, fn) {
  options = options || {};

  console.log('unqueue campaign => ', options);

  var campaign = options.campaign;
  var job = _queue[campaign.id];

  if (job) {
    job.cancel();
    delete _queue[campaign.id];
  }

  fn(options);
}