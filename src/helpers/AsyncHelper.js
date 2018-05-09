
const toAsync = (inquirer) => new Promise((resolve, reject) => {
    inquirer
        .then((...args) => resolve(...args))
        .catch((...args) => reject(...args));
});

module.exports = { toAsync };