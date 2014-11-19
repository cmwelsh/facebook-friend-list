define(function(require) {
    'use strict';

    var React = require('react');
    var ButtonToolbar = require('react-bootstrap/ButtonToolbar');

    return React.createClass({
        render: function() {
            var friend = this.props.friend;

            return <div key={friend.id} className="friend hint--top" data-hint={friend.name}>
                <img className="friend-picture" src={friend.pictureUrl} alt={friend.name} />
            </div>;
        }
    });
});
