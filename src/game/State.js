const Outputter = require('io/Outputter');
const Colour = require('colour');
const CharacterCreation = require('game/story/CharacterCreation');

let Game = null;

const isRunning = () => !!Game;

const perform = (command) => {

    const [action, interactable, ...rest] = command;

    switch (action) {
        case 'show': show(interactable, ...rest); break;
        default: Outputter.error('DO_NOT_UNDERSTAND');
    }

};

const show = (what, ...rest) => {
  switch (what) {
      case 'stats': require('game/models/Player').showStatistics(); break;
      default: Outputter.error('DO_NOT_UNDERSTAND');
  }
};

const create = () => {
    CharacterCreation().then((player) => {
        Game = { player };

        // TODO: Start game
        console.log('START GAME');
    }).catch((action) => {
        if (action === 'MAIN') require('game/Controller').showMainMenu();
    });
};

const load = () => {
    Outputter.error('NOT_IMPLEMENTED_YET');
    require('game/Controller').showMainMenu();
};

module.exports = { perform, isRunning, create, load };