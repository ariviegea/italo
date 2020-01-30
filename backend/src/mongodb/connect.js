const mongoose = require('mongoose');

const setupDb = async() => {
    // console.log('running')
    mongoose.set('useCreateIndex', true);
    mongoose.connect(
        process.env.MONGO_STRING,
        { useNewUrlParser: true,
        useUnifiedTopology: true,
        },
    );
    const dbConnection = mongoose.connection;
    dbConnection.on('error', console.log);
    dbConnection.once('open', () => console.log('conected to db'));
    // dbConnection.on('error', (err) => logger.error(err));
    // dbConnection.once('open', () => logger.info('connected to mongo db'));
}

module.exports = {
    setupDb
}