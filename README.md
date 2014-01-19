# Interactive Twitterwall

## Twitter OAuth configuration

This server needs an OAuth 'consumerKey' and 'consumerSecret' to authenticate against Twitter.
In order to provide these credentials, you can set environment variables or JVM system properties.

```Shell
$> gradle -Dtwitter4j.oauth.consumerKey=aabbccddeeffaabbccddee -Dtwitter4j.oauth.consumerSecret=aabbccddeeffaabbccddee11aabbccddeeddff2233 war jeyttyRunWar
```

Or

```Shell
$> export twitter4j.oauth.consumerKey=aabbccddeeffaabbccddee
$> export twitter4j.oauth.consumerSecret=aabbccddeeffaabbccddee11aabbccddeeddff2233
$> gradle war jettyRunWar
```

## Development

### requirements

* node.js 0.10.x (or newer)
* grunt 0.4.x (or newer)

### Building

````$> grunt````

### Run automatic build (watcher)

````$> grunt watch````

### Run development server (reverse proxy for backend)

Assuming, Twitterwall-server is running on port 8000.

````$> node tools/development-server.js````

## Live Demo

http://hypoport.github.io/twitterwall

## Organize

All work is organized via Trello:
https://trello.com/board/twitterwall/51783b1b31046f9c7c006710
_Please ask Martin for invitation_

## Continuous Integration

[![Build Status](https://travis-ci.org/hypoport/twitterwall.png?branch=master)](https://travis-ci.org/hypoport/twitterwall)
