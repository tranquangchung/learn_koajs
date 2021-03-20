const Agenda = require('agenda');
const connectionString = 'mongodb://localhost:27017/polyglot_ninja';

const agenda = new Agenda({
    db: {address: connectionString},
    processEvery: '30 seconds'
});

module.exports = agenda;
