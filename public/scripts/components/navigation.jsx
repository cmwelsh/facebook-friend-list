define(function(require) {
    'use strict';

    var React = require('react');

    var Button = require('react-bootstrap/Button');
    var ButtonToolbar = require('react-bootstrap/ButtonToolbar');

    return React.createClass({
        render: function() {
            var loginButton;
            if (this.props.authenticated) {
                loginButton = <Button onClick={this.onLogoutClicked}>
                    Sign out
                </Button>;
            } else {
                loginButton = <Button onClick={this.onLoginClicked}>
                    Sign in
                </Button>;
            }

            return <ButtonToolbar className="navigation">
                {loginButton}
            </ButtonToolbar>;
        },
        onLoginClicked: function() {
            document.location.href = '/login';
        },
        onLogoutClicked: function() {
            document.location.href = '/logout';
        }
    });
});
