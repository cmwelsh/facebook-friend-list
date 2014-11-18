define(function(require) {
    'use strict';

    var BPromise = require('bluebird');
    var $ = require('jquery');

    var Application = function() {
    };

    Application.prototype.run = function() {
        BPromise.resolve($.ajax({
            type: 'get',
            url: '/api/auth',
            dataType: 'json'
        }))
        .then(function(responseData) {
            if (responseData.authenticated) {
                $('#test').text('Logged in');
                $('#login').hide();
                $('#logout').show();
            } else {
                $('#test').text('Logged out');
                $('#login').show();
                $('#logout').hide();
            }
        });
    };

    return Application;
});
