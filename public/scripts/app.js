/* global $ */
$(function() {
    'use strict';

    $.ajax({
        type: 'get',
        url: '/api/auth',
        dataType: 'json'
    })
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
});
