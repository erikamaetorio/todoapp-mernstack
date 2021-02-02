const mongoose = require('mongoose');
const config = require("./config");

function connect() {
    //connect to MongoDB
    return new Promise((resolve, reject) => {
        mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((res, err) => {
                if (err) return reject(err);
                resolve();
            })
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };