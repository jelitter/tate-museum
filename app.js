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
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/shop', shop);
app.use('/about', about);
app.use((req, res, next) => {
    console.info(chalk.green(req.method), req.originalUrl);
    next();
});

// Start the server
// app.listen(port, () => {
//     console.log(chalk.yellow(`HTTP server running on port: ${port}`));
// });


// app.get('/', loggedIn, (req, res, next) => {
//     // res.redirect('/login');

//     User.findOne({ _id: req.session._id }, (err, user) => {
//         if (err) res.status(401).redirect('/login');
//         if (user) res.status(200).redirect('/shop');
//         // render('../views/shop.ejs', { cache: true, data: [], username: user.username });
//         else res.status(401).redirect('/');
//     });
// });

app.use((req, res) => {
    console.error('404 - Not found:', req.originalUrl);
    res.status(404).render("../views/partials/error.ejs", {
        cache: true,
        data: {
            error: 404,
            errorMessage: "Not Found"
        }
    });
    // send({url: req.originalUrl + ' not found'})
});

module.exports = app;