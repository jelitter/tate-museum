const compression = require('compression');
const express = require('express');
const app = express();
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const chalk = require('chalk');
const morgan = require('morgan');


app.use(compression());
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(favicon('./static/favicon.ico'));

app.set('view engine', 'ejs');

app.get('*', (req, res, next) => {
    console.info(chalk.green(req.method), req.originalUrl);
    // console.log(req);
    next();
});

app.get('/api', (req, res, next) => {
    res.format({
        html: () => {

            res.render('../views/api.ejs', { cache: true, data: [] });
        }
    });
});

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res, next) => {
    res.format({
        html: () => {
            res.render('../views/index.ejs', { cache: true, data: [] });
        }
    });
});

app.listen(port, () => {
    console.log(chalk.yellow(`HTTP server running on port: ${port}`));
});

module.exports = app;

require('./login.js');
require('./artist.js');
require('./artwork.js');
require('./cart.js');

app.use((req, res) => {
    console.error('404 - Not found:', req.originalUrl);
    res.status(404).render("../views/partials/error.ejs", {
        cache: true,
        error: 404,
        errorMessage: "Not Found"
    });
    // send({url: req.originalUrl + ' not found'})
});