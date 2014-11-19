define(function(require) {
    'use strict';

    var React = require('react');
    var ButtonToolbar = require('react-bootstrap/ButtonToolbar');

    var Friend = require('jsx!components/friend');

    return React.createClass({
        render: function() {
            var friends = this.props.friends;

            return <div className="friends">
                {friends.map(function(friend) {
                    return <Friend friend={friend} />
                })}
            </div>;
        }
    });
});
