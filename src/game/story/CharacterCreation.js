const Inquirer = require('inquirer');
const AsyncHelper = require('helpers/AsyncHelper');
const Roll = require('roll');

module.exports = () => new Promise ((resolve, reject) => {

    console.log(`\n"Longer than any mortal dares remember, the devil gods dawned a war against the demon lords of the abyss. A war so 
destructive and vile that even the upper god refrained from interfering. Instead, the gods ignored the mayhem and focused 
their attention to the lesser folk, the mortals on the material plane.\n`);

    console.log(`The mortals lived out their relatively peaceful lives in ignorance, but then came ${'The Rupture'.underline.green}. A rift opened in the middle
of the ${ 'Cedan Kingdom'.underline.green } dividing the continent into 6 islands, slowly drifting apart. Over the course of 6 years, 
terror reigned over the isles, with demons and devils spawning through the ${ 'Yester Rift'.underline.green } wreaking havoc, 
killing innocents and most importantly, collecting souls to power their vile lords. It was a female gnome 
wizard going by the name of ${ 'Iyona Fizzlestick'.underline.green } that united the strongest mages, devised a plan to 
drive them back into the rift and construct a magical ward that is still keeping evil at bay until this day. 
${ 'The Bulwark'.underline.green } is maintained by the sages of the ${ 'Silver Ward'.underline.green }, an organisation dedicated to keep evil from 
slipping through the barrier."

-- excerpt from ${ '"Since the Beginning of Time"'.italic}, written by ${ 'Sage Savael Fageiros'.underline.green }\n`);

    Inquirer.prompt({
        type: 'confirm',
        name: 'start',
        message: 'Are you ready to embark on your new adventure?'
    }).then((answer) => {
        if (answer.start) define(resolve, reject);
        else reject('MAIN');
    });

});

const define = async (resolve, reject) => {
    let player = require('game/models/Player').getDefault();

    const name = await Inquirer.prompt({
        type: 'input',
        name: 'name',
        message: `What's your name?`,
        validate: (input) => !!input,
    }).then((answer) => answer.name);

    const attributes = await Inquirer.prompt({
        type: 'checkbox',
        name: 'attributes',
        message: 'What do you value most in life? (select 2)',
        validate: (input) => input.length === 2,
        choices: Object.keys(player.attributes)
    }).then((answer) => answer.attributes);

    const race = await Inquirer.prompt({
        type: 'list',
        name: 'race',
        message: `What is your race?`,
        choices: [
            { name: 'human' },
            { name: 'elf' },
            { name: 'dwarf' },
            { name: 'gnome' },
            { name: 'halfling' },
            { name: 'orc' },
            { name: 'goblin' },
            { name: 'dragonborn' },
            { name: 'tiefling' }
        ]
    }).then((answer) => answer.race);

    player = await rollAttributes(player);

    attributes.forEach((attribute) => {
        player.attributes[attribute] += 1;
    });

    player.name = name;
    player.race = race;

    applyRacialAttributes(player);

    console.log(`A character with the name ${player.name}, has been created\n`.green);

    resolve(player);
};

const rollAttributes = async (player) => {

    const dice = new Roll();

        Object.keys(player.attributes).forEach((attribute) => {
            player.attributes[attribute] = dice.roll('3d6').result;
        });

    const proceed = await Inquirer.prompt({
        type: 'confirm',
        name: 'proceed',
        message: `Are you satisfied with following rolls? ` +
        Object.entries(player.attributes).map(([attribute, value]) => `${attribute.green}: ${value}`).join(', ')
    }).then((answer) => answer.proceed);

    if (!proceed) return rollAttributes(player);
    else return player;

};

const applyRacialAttributes = (player) => {

    switch (player.race) {
        case 'human':
            player.attributes.power += 1;
            player.attributes.awareness += 1;
            player.attributes.agility += 1;
            player.attributes.knowledge += 1;
            player.attributes.luck += 2;
            break;
        case 'elf':
            player.attributes.agility += 1;
            player.attributes.knowledge += 1;
            player.attributes.awareness += 1;
            player.attributes.charisma += 1;
            break;
        case 'dwarf':
            player.attributes.power += 2;
            player.attributes.grit += 1;
            player.attributes.charisma -= 1;
            break;
        case 'gnome':
            player.attributes.knowledge += 3;
            player.attributes.awareness += 1;
            player.attributes.power -= 1;
            break;
        case 'halfling':
            player.attributes.agility += 2;
            player.attributes.grit += 1;
            player.attributes.luck += 3;
            player.attributes.power -= 1;
            break;
        case 'orc':
            player.attributes.power += 3;
            player.attributes.grit += 2;
            player.attributes.knowledge -= 1;
            player.attributes.charisma -= 1;
            player.attributes.awareness -= 1;
            break;
        case 'goblin':
            player.attributes.agility += 3;
            player.attributes.grit += 2;
            player.attributes.power -= 1;
            player.attributes.charisma -= 1;
            player.attributes.awareness -= 1;
            break;
        case 'dragonborn':
            player.attributes.agility += 1;
            player.attributes.grit += 2;
            player.attributes.power += 1;
            player.attributes.charisma += 1;
            player.attributes.luck -= 1;
            break;
        case 'tiefling':
            player.attributes.knowledge += 2;
            player.attributes.charisma += 1;
            player.attributes.grit += 1;
            player.attributes.luck -= 1;
            break;
    }

};
