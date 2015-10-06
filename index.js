'use strict';

/**
 *
 */

var express = require('express');
var campaign = require('./lib/campaign');
var bodyParser = require('body-parser');
var campaignController = require('./lib/campaign/controller');
var port = process.env.PORT || 3008;
var app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// apps
app.use(campaign);


// schedule all active campaigns
campaignController.scheduleAll();

// Listen
app.listen(port, function () {
  console.log('app listening on port %d', 3008);
});