/* global requirejs: false */

requirejs.config({
    paths: {
        bluebird: '/bower_components/bluebird/js/browser/bluebird',
        jquery: '/bower_components/jquery/dist/jquery',
        JSXTransformer: '/scripts/vendor/JSXTransformer',
        jsx: '/scripts/vendor/jsx',
        react: '/bower_components/react/react-with-addons',
        'react-bootstrap': '/bower_components/react-bootstrap',
        text: '/scripts/vendor/text'
    },
    shim: {
    },
    jsx: {
        fileExtension: '.jsx'
    },
    urlArgs: (new Date()).getTime()
});

require.config({
    baseUrl: '/scripts'
});
