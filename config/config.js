const mongocfg = {
    options: {
        useMongoClient: true,
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        reconnectInterval: 1000,
    },
    uri: 'mongodb://ds151355.mlab.com:51355/art'
};

module.exports = mongocfg;
