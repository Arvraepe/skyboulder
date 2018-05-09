require('app-module-path').addPath(__dirname + '/src');

require('io/Inputter').initialize();

const Controller = require('game/Controller');

global.ROOT = __dirname;

Controller.boot();