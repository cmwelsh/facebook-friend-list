/* global requirejs: false */

requirejs.config({
    paths: {
        bluebird: '/bower_components/bluebird/js/browser/bluebird',
        jquery: '/bower_components/jquery/dist/jquery'
    },
    shim: {
    },
    urlArgs: (new Date()).getTime()
});

require.config({
    baseUrl: '/scripts'
});
