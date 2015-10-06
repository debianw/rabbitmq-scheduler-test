'use strict';

var express = require('express');
var controller = require('./controller');
var app = module.exports = express();

/**
 *
 */

app.post('/campaign/schedule', controller.schedule);
app.post('/campaign/unschedule', controller.unschedule);