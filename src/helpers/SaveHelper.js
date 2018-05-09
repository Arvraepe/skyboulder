const fs = require('fs');

const serialize = (state) => {
    return JSON.stringify(state, (key, value) => {

        if (typeof value === 'function') return value.toString();

        return value;
    });
};

const deserialize = (string) => {
    return JSON.parse(string, (key, value) => {

        if (
            value &&
            typeof value === 'string' &&
            value.match(/function.*/i)
        ){
            const startBody = value.indexOf('{') + 1;
            const endBody = value.lastIndexOf('}');

            const startArgs = value.indexOf('(') + 1;
            const endArgs = value.indexOf(')');

            return new Function (value.substring(startArgs, endArgs), value.substring(startBody, endBody));
        }

        return value;
    });
};

const save = (name, state) => fs.writeFile(`${ROOT}/saves/${name}`, serialize(state));
const load = (name) => deserialize(fs.readFile(`${ROOT}/saves/${name}`));

module.exports = { save, load };