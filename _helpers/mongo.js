/*Used to connect node server to mongo using mongoose - communicates through object representing all objects in collection 
of users*/

const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.mongoURI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

module.exports = {
    User: require('../users/user.model'),
    Environment: require('../environments/environments.model'),
    Hub: require('./hubs.model'),
};