var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var mongoose = require('mongoose');
var router = require('./config/router');


var port = process.env.PORT || 3000;

// set up mongo
mongoose.connect('mongodb://localhost:27017/virtuous');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var app = express();

//nunjucks setup
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname + '/views'), { 
    dev: true, 
    autoescape: true 
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
env.express(app);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

router(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
