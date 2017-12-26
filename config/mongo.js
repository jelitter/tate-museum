const mongocfg = {
    options: {
        useMongoClient: true,
        autoIndex: false,
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
        reconnectTries: Number.MAX_VALUE,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        reconnectInterval: 1000,
    },
    uri: process.env.MONGO_URL
};

module.exports = mongocfg;