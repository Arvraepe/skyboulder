require('app-module-path').addPath(__dirname + '/src');

require('io/Inputter').initialize();

const Controller = require('game/Controller');

Controller.boot();