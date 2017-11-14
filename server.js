var mongoose = require('mongoose');
const mongocfg = require('./config/config.js')

mongoose.connect(mongocfg.uri, mongocfg.options);
mongoose.Promise = global.Promise;


var db = mongoose.connection;
db.on('error', (err) => {
    handleError(err);
});

db.once('open', () => {
    console.log("Connected to DB!");
    const app = require('./routes/app.js');
});

function handleError(err) {
    console.log('DB error:', JSON.stringify(err, null, 2));
}