const mongoose = require('mongoose');
const config = require('../../config.json')

module.exports = async () => { 
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            connectTimeoutMS: 10000,
            family:4
        };

        mongoose.connect(config.MONGOURL, dbOptions);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose has successfully connected!');
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection lost');
        });
    }
}