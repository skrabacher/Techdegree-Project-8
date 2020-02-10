var createError = require('http-errors');
var express = require('express');
var path = require('path'); //module provides utilities for working with file and directory paths. 
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); //requires the index.js file in the routes folder
var booksRouter = require('./routes/books'); //requires the books.js file in the routes folder

var app = express();

// VIEW ENGINE SET UP
app.set('views', path.join(__dirname, 'views'));//tells express the file path for the folder where the different views templates will be stored
//__dirname has value of the absolute path of the directory containing the currently executing file
app.set('view engine', 'pug'); // tells express we will be using pug templates 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Root Paths for the Route Files
app.use('/', indexRouter); //requires /routes/index for root path in app.js
app.use('/books', booksRouter); //requires /routes/books for the "/book" url path

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
    if (err.status === 404) {
      console.log("404 - App.js")
      res.render("page-not-found");
    } else {
      console.log("other error - App.js")
      res.render('error');
    }
});

module.exports = app;
