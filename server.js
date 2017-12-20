const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
const mongocfg = require('./config/mongo.js');
const handleError = require('./config/error.js');
const chalk = require('chalk');
const app = require('./app.js'); 


mongoose.Promise = global.Promise;
mongoose.connect(mongocfg.uri, mongocfg.options).then(
    () => { 
      console.log(chalk.yellow("Connected to DB!"));
       
      app.listen(port, () => {
        console.log(chalk.yellow(`HTTP server running on port: ${port}`));
      });
    },
    err => { console.error(`DB Error: ${err}`); }
  );
