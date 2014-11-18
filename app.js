'use strict';

var dotenv = require('dotenv');
var express = require('express');
var favicon = require('serve-favicon');
var fb = require('fb');
var http = require('http');
var log = require('winston');
var path = require('path');

var routes = require('./src/routes');

process.chdir(__dirname);
dotenv.load();

fb.options({
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    redirectUri: 'http://' + process.env.HTTP_DOMAIN + ':' +
            process.env.HTTP_PORT + '/login/callback'
});

var app = express();

app.set('environment', process.env.NODE_ENV);
app.set('port', process.env.HTTP_PORT);

if (app.get('environment') === 'development') {
    app.use(express.errorHandler());
}

app.use('/bower_components', express.static(__dirname + '/bower_components'));
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
app.get('/login', routes.login);
app.get('/login/callback', routes.loginCallback);
app.get('/logout', routes.logout);

http.createServer(app).listen(app.get('port'));
log.info('Listening on port: ' + app.get('port'));
