const Outputter = require('io/Outputter');
const State = require('game/State');
const Meta = require('../../package.json');
const Colour = require('colour');
const Inquirer = require('inquirer');

const receive = (input) => {

    // Handle the input based on the current state.
    const command = input.split(' ');


    if (State.isRunning()) State.perform(command);
    else {
        switch (command) {
            case 'new': State.new(); break;
            default: Outputter.error('DO_NOT_UNDERSTAND');
        }
    }
};

const boot = () => {

    console.log(`   
   ▄████████    ▄█   ▄█▄ ▄██   ▄   ▀█████████▄   ▄██████▄  ███    █▄   ▄█       ████████▄     ▄████████    ▄████████ 
  ███    ███   ███ ▄███▀ ███   ██▄   ███    ███ ███    ███ ███    ███ ███       ███   ▀███   ███    ███   ███    ███ 
  ███    █▀    ███▐██▀   ███▄▄▄███   ███    ███ ███    ███ ███    ███ ███       ███    ███   ███    █▀    ███    ███ 
  ███         ▄█████▀    ▀▀▀▀▀▀███  ▄███▄▄▄██▀  ███    ███ ███    ███ ███       ███    ███  ▄███▄▄▄      ▄███▄▄▄▄██▀ 
▀███████████ ▀▀█████▄    ▄██   ███ ▀▀███▀▀▀██▄  ███    ███ ███    ███ ███       ███    ███ ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   
         ███   ███▐██▄   ███   ███   ███    ██▄ ███    ███ ███    ███ ███       ███    ███   ███    █▄  ▀███████████ 
   ▄█    ███   ███ ▀███▄ ███   ███   ███    ███ ███    ███ ███    ███ ███▌    ▄ ███   ▄███   ███    ███   ███    ███ 
 ▄████████▀    ███   ▀█▀  ▀█████▀  ▄█████████▀   ▀██████▀  ████████▀  █████▄▄██ ████████▀    ██████████   ███    ███ 
               ▀                                                      ▀                                   ███    ███ 
 ${ 'Version'.green } ${Meta.version} - ${ 'Created by'.green } ${Meta.author}
`);

    showMainMenu();

};

const showMainMenu = () => {
    Inquirer.prompt({
        type: 'list',
        message: 'Choose an option from the menu',
        name: 'menu',
        choices: [{
            name: 'New'
        }, {
            name: 'Load'
        }, {
            name: 'Credits'
        }, {
            name: 'Exit'
        }]
    }).then((answers) => {
        switch (answers.menu) {
            case 'New' :
                State.create();
                break;
            case 'Load' :
                State.load();
                break;
            case 'Credits' :
                console.log(`

Special thanks to:
${ 'Delbarleone'.green }       

Now to get back to the ${ 'main menu'.green }          
                `);
                showMainMenu();
                break;
            case 'Exit' :
                console.log('\nThanks for playing Skyboulder, see you soon\n'.green);
                process.exit(0);
                break;
        }
    });
};

module.exports = { receive, boot, showMainMenu };