var mongoose = require('mongoose');
const mongocfg = require('./config/mongo.js');
const handleError = require('./config/error.js');
const chalk = require('chalk');

// mongoose.connect(mongocfg.uri, mongocfg.options);

mongoose.Promise = global.Promise;
mongoose.connect(mongocfg.uri, mongocfg.options).then(
    () => { console.log(chalk.yellow("Connected to DB!"));
    const app = require('./routes/app.js'); },
    err => { console.error(`DB Error: ${err}`); }
  );



// var db = mongoose.connection;
// db.on('error', (err) => {
//     // handleError(err);
//     console.error(`DB Error: ${err}`);
// });

// db.once('open', () => {
//     console.log(chalk.yellow("Connected to DB!"));
//     const app = require('./routes/app.js');
// });