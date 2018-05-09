const colour = require('colour');

const errors = {
    'DO_NOT_UNDERSTAND': `I did not understand what you are trying to do`,
    'NOT_IMPLEMENTED_YET': `The Skyboulder team is working around the clock to implement all features, but this is not yet finished`
};

const write = (...args) => {
    console.log.apply(null, args);
};

const error = (code) => {
    if (errors[code])
        console.log(errors[code].red);
};

module.exports = { write, error };