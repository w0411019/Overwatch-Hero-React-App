//import a bunch of helper packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var helmet = require('helmet');
var cors = require('cors');

dotenv.config();

//attempt to connect to mongodb
mongoose.connect(process.env.MONGODB_LOCATION);

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api'); //automatically looks for index.js because api.js doesn't exist and is a folder


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//configure our middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(helmet())//for security purposes

//aasign our routers to a path
app.use('/', indexRouter);
app.use('/api', apiRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
