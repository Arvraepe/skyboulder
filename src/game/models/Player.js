const Colour = require('Colour');
const Outputter = require('io/Outputter');

const Default = {
    name: 'Player',
    attributes: {
        power: 10,
        knowledge: 10,
        agility: 10,
        awareness: 10,
        charisma: 10,
        grit: 10,
        luck: 10,
    }
};

const getDefault = () => Default;

const showStatistics = (State) => {

    Outputter.write(`Your current attributes:`);
    Outputter.write(Object.entries(State.player.attributes).reduce((str, [attribute, value]) => str+`${attribute}`.green+`: ${value}\n`, ''));

};

module.exports = {
    getDefault,
    showStatistics
};