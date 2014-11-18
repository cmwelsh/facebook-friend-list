'use strict';

var dotenv = require('dotenv');
var express = require('express');
var favicon = require('serve-favicon');
var http = require('http');
var log = require('winston');
var path = require('path');

var routes = require('./src/routes');

process.chdir(__dirname);
dotenv.load();

var app = express();

app.set('environment', process.env.NODE_ENV);
app.set('port', process.env.HTTP_PORT);

if (app.get('environment') === 'development') {
    app.use(express.errorHandler());
}

app.use(express.static(__dirname + '/public'));
app.use(favicon(path.resolve(__dirname + '/public/images/favicon.ico')));
var loggerType = app.get('environment') === 'development' ? 'dev' : 'default';
app.use(express.logger(loggerType));
app.use(express.cookieParser());
app.use(express.cookieSession({
    secret: process.env.SESSION_SECRET
}));

app.get('/', routes.home);
app.get('/api/auth', routes.auth);
app.get('/api/friends', routes.friends);

http.createServer(app).listen(app.get('port'));
log.info('Listening on port: ' + app.get('port'));
