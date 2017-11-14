const mongocfg = {
    options: {
        useMongoClient: true,
        user: "user",
        pass: "tateuser557",
        // user: "admin",
        // pass: "tateadmin378",
        autoIndex: false,
        reconnectTries: Number.MAX_VALUE,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        reconnectInterval: 1000,
        socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }
    },
    uri: 'mongodb://ds151355.mlab.com:51355/art'
};

module.exports = mongocfg;