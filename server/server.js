'use strict';

const express = require('express');
const app = express();

require('./setup/express')(app);

module.exports = app;