// EXTERNAL IMPORTS
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// INTERNAL IMPORTS
var { errorController } = require('./controllers');
var { appointmentRouter, userRouter } = require('./routes');

// APP
var app = express();

// ENV VARIABLES
require('dotenv').config();

// MONGODB CONNECTION
require('./configs/db');

// MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// ROUTES
app.use('/appointment', appointmentRouter);
app.use('/user', userRouter);

// ERROR MIDDLEWARE
app.use(errorController);

module.exports = app;
