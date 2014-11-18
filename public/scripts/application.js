/* global document */
define(function(require) {
    'use strict';

    var React = require('react');

    var Page = require('jsx!components/page');

    var Application = function() {
    };

    Application.prototype.run = function() {
        React.renderComponent(
            Page(),
            document.getElementById('container')
        );
    };

    return Application;
});
