'use strict';

var fb = require('fb');
var path = require('path');
var step = require('step');
var log = require('winston');

function auth(req, res) {
    var accessToken = req.session.access_token;

    var authenticated = Boolean(accessToken);

    res.send(JSON.stringify({
        authenticated: authenticated
    }));
}

function friends(req, res) {
    fb.api('me/friends', {
        fields: 'name,picture',
        limit: 250,
        access_token: req.session.access_token
    }, function(result) {
        if (!result || result.error) {
            return res.send(500, 'error');
        }
        res.send(result);
    });
}

function home(req, res) {
    res.sendfile(path.resolve(__dirname + '/../public/index.html'));
}

function login(req, res) {
    res.redirect(fb.getLoginUrl({ scope: 'user_friends' }));
}

function loginCallback(req, res, next) {
    var code = req.query.code;

    if (req.query.error) {
        // @todo not sure what this means
        return res.send('login-error ' + req.query.error_description);
    } else if (!code) {
        return res.redirect('/');
    }

    step(
        function exchangeCodeForAccessToken() {
            fb.napi('oauth/access_token', {
                client_id: fb.options('appId'),
                client_secret: fb.options('appSecret'),
                redirect_uri: fb.options('redirectUri'),
                code: code
            }, this);
        },
        function extendAccessToken(err, result) {
            if (err) {
                throw err;
            }
            fb.napi('oauth/access_token', {
                client_id: fb.options('appId'),
                client_secret: fb.options('appSecret'),
                grant_type: 'fb_exchange_token',
                fb_exchange_token: result.access_token
            }, this);
        },
        function(err, result) {
            if (err) {
                return next(err);
            }

            req.session.access_token = result.access_token;
            req.session.expires = result.expires || 0;

            // @todo not sure what this means
            if (req.query.state) {
                var parameters = JSON.parse(req.query.state);
                parameters.access_token = req.session.access_token;

                log.info(parameters);
            } else {
                return res.redirect('/');
            }
        }
    );
}

function logout(req, res) {
    // Clear session data
    req.session = null;

    res.redirect('/');
}

module.exports = {
    auth: auth,
    friends: friends,
    home: home,
    login: login,
    loginCallback: loginCallback,
    logout: logout
};
