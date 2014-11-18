'use strict';

var fb = require('fb');
var path = require('path');

function auth(req, res) {
    var accessToken = req.session.access_token;

    var authenticated = !!accessToken;

    res.send(JSON.stringify({
        authenticated: authenticated
    }));
}

function friends(req, res) {
    fb.api('me/invitable_friends', {
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

module.exports = {
    auth: auth,
    friends: friends,
    home: home
};
