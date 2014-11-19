# Facebook Friend List

This application allows a user to authenticate with their Facebook account
in order to see a list of their friends.

# Install

Install Node.js 0.10.30 (optionally using [nvm][1]):

    $ nvm install 0.10.30
    $ nvm use 0.10.30

Install npm dependencies:

    $ npm install

Install Bower 1.3.9:

    $ npm install -g bower

Install Bower dependencies:

    $ bower install

# Configure

Register your application with Facebook at [Facebook Developers][2] and
configure the application to have support for the following platforms under
the Settings tab:

* Facebook Canvas (required for invitable friends API, see Issues and
  Workarounds below)
* Website

Under the App Details tab, make sure you set the category to "Games" (required
for invitable friends API).

Copy the example environment variables and fill them in with correct values,
including the Facebook App ID and App Secret from the Facebook Developers site.

    $ cp .env-example .env

# Run

Run HTTP server:

    $ npm start

Navigate to `http://localhost:3000` in a browser.

# Issues & Workarounds

## API changes in Facebook Open Graph API v2

This application violates the Facebook Open Graph API Terms of Service because
they no longer (since v2) allow applications to enumerate the entire list of
friends for a user. Thus, it is not advisable to use this proof of concept in
a production application.

The workaround, as implemented in this application, is to register your
application as a game and merge the results of the friends API (friends who
are also using the application) with the results of the invitable friends API
(friends who are not also using the application). Unfortunately, this means
that you cannot provide a link directly to a friend's Facebook profile,
because the user IDs provided by the invitable friends API are anonymized.

[1]: https://github.com/creationix/nvm
[2]: https://developers.facebook.com/
