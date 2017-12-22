const compression = require('compression');
const express = require('express');
const app = express();
const routes = require('./routes')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');
const chalk = require('chalk');
const morgan = require('morgan');
const session = require('express-session')
const loggedIn = require('./routes/login');

var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var shop = require('./routes/shop');
var about = require('./routes/about');
var notfound = require('./routes/notfound');
var artwork = require('./routes/models/artwork');


// Setup
app.set('view engine', 'ejs');
app.set('trust proxy', 1);


// Middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(favicon('./static/favicon.ico'));
app.use(session({secret:'sdfjlksjdl234!%aa12_', saveUninitialized: true, resave: true }));

// Routes
app.use((req, res, next) => {
    console.info(chalk.green(req.method), req.originalUrl);
    next();
});
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/shop', shop);
app.use('/about', about);
app.use('/artwork', artwork);
app.use('*', notfound);

module.exports = app;