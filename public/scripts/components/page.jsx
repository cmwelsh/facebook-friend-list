define(function(require) {
    'use strict';

    var BPromise = require('bluebird');
    var $ = require('jquery');
    var React = require('react');
    var Button = require('react-bootstrap/Button');
    var ButtonToolbar = require('react-bootstrap/ButtonToolbar');

    var Friends = require('jsx!components/friends');

    return React.createClass({
        getInitialState: function() {
            return {
                authenticated: null,
                friends: null
            };
        },
        componentDidMount: function() {
            BPromise.resolve($.ajax({
                type: 'get',
                url: '/api/auth',
                dataType: 'json'
            }))
            .bind(this)
            .then(function(responseData) {
                var authenticated = false;
                if (responseData.authenticated) {
                    authenticated = true;
                }
                this.setState({
                    authenticated: authenticated
                });

                if (authenticated) {
                    this.getFriends();
                }
            });
        },
        render: function() {
            if (this.state.authenticated === null) {
                return <h1>Loading...</h1>;
            }

            var loginButton;
            if (this.state.authenticated) {
                loginButton = <Button onClick={this.onLogoutClicked} bsStyle="primary" bsSize="large">
                    Logout
                </Button>;
            } else {
                loginButton = <Button onClick={this.onLoginClicked} bsStyle="primary" bsSize="large">
                    Login
                </Button>;
            }

            var friendsComponent;
            if (this.state.friends) {
                friendsComponent = <Friends friends={this.state.friends} />;
            } else if (this.state.authenticated) {
                friendsComponent = <p>Loading friends...</p>;
            }

            return <div>
                <ButtonToolbar>
                    {loginButton}
                </ButtonToolbar>
                {friendsComponent}
            </div>;
        },
        onLoginClicked: function() {
            document.location.href = '/login';
        },
        onLogoutClicked: function() {
            document.location.href = '/logout';
        },
        getFriends: function() {
            BPromise.resolve($.ajax({
                type: 'get',
                url: '/api/friends',
                dataType: 'json'
            }))
            .bind(this)
            .then(function(friendsData) {
                this.setState({
                    friends: friendsData
                });
            });
        }
    });
});
