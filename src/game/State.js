const Outputter = require('io/Outputter');
const Colour = require('colour');
const CharacterCreation = require('game/story/CharacterCreation');
const SaveHelper = require('helpers/SaveHelper');

let Game = { running: false };

const isRunning = () => Game.running;

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
        Game.player = player;

        save();

        // TODO: Start game
        console.log('START GAME');
    }).catch((action) => {
        if (action === 'MAIN') require('game/Controller').showMainMenu();
    });
};

const save = () => {
    console.log('Saving game...');
    SaveHelper.save(Game.player.name, Game);
};

const load = () => {
    // Outputter.error('NOT_IMPLEMENTED_YET');
    // require('game/Controller').showMainMenu();

    const Inquirer = require('inquirer');
    const saves = SaveHelper.getSaveNames().map((name) => ({ name }));

    Inquirer.prompt({
        type: 'list',
        name: 'save',
        message: 'Please select the save file you want to load',
        choices: saves
    }).then((answers) => {
        Game = SaveHelper.load(answers.save);

        //TODO: Start game
        console.log('CONTINUE GAME');
    });

};

module.exports = { perform, isRunning, create, load };