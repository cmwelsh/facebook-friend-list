define(function(require) {
    'use strict';

    var BPromise = require('bluebird');
    var $ = require('jquery');
    var React = require('react');

    var Friends = require('jsx!components/friends');
    var Navigation = require('jsx!components/navigation');

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
            var authenticated = this.state.authenticated;
            if (authenticated === null) {
                return <h1>Loading...</h1>;
            }

            var friendsComponent;
            if (this.state.friends) {
                friendsComponent = <Friends friends={this.state.friends} />;
            } else if (authenticated) {
                friendsComponent = <p>Loading friends...</p>;
            } else {
                friendsComponent = <p>Sign in with Facebook to see a collage of friends!</p>;
            }

            return <div>
                <Navigation authenticated={authenticated} />
                {friendsComponent}
            </div>;
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
