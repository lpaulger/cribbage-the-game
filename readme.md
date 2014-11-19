#Cribbage, The Game 
[![Build Status](https://travis-ci.org/lpaulger/cribbage-the-game.svg?branch=master)](https://travis-ci.org/lpaulger/cribbage-the-game)
[![Coverage Status](https://img.shields.io/coveralls/lpaulger/cribbage-the-game.svg)](https://coveralls.io/r/lpaulger/cribbage-the-game?branch=master)
[![Code Climate](https://codeclimate.com/github/lpaulger/cribbage-the-game/badges/gpa.svg)](https://codeclimate.com/github/lpaulger/cribbage-the-game)
[![Dev Dependencies](https://david-dm.org/lpaulger/cribbage-the-game/dev-status.svg)](https://david-dm.org/lpaulger/cribbage-the-game#info=devDependencies&view=table)

A simple cribbage game built using javascript, no frameworks and only mustache as a templating library.
You can view the latest preview here http://lucaspaulger.com/cribbage-the-game/ after each successful build.

## Getting Started
<img align="right" height="480" src="http://lucaspaulger.com/images/2014-11-19/cribbage-the-game-demo.gif">
This project uses ruby for compass, and node for grunt. Additionally there is configuration for Cordova when I am creating native apps.

Make sure you have the following tools installed on your development machine
```shell
gem install compass
npm install -g grunt-cli
npm install -g bower
```

```shell
npm install
bower install
```

Now that the project is setup run the application locally with the following commands
```shell
grunt serve
```

to run unit tests you can run
```shell
karma start
```
OR
```shell
grunt test
```
* the last step will fail for coveralls (used specifically for CI)

## Support / Contributing

Please feel free to contribute, no guidelines defined yet :).

### resources

http://selfthinker.github.io/CSS-Playing-Cards/ but with a few modifications, primarily converting to sass.
https://github.com/janl/mustache.js

### Release History
See the [CHANGELOG](CHANGELOG).
