require('dotenv').config();
const express = require('express');
const path = require('path');
let logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

app.use('/tournament', require('./routes/tournament'));
module.exports = app;