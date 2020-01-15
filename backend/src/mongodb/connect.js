const mongoose = require('mongoose');

const setupDb = async() => {
    console.log('running')
    mongoose.set('useCreateIndex', true);
    mongoose.connect(
        process.env.MONGO_STRING,
        { useNewUrlParser: true,
        useUnifiedTopology: true,
        },
    );
    mongoose.connection.on('error', console.log);
    mongoose.connection.once('open', () => console.log('conected to db'))
}

module.exports = {
    setupDb
}