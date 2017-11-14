var artists = require('../server.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const read = require('node-readability');
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'))

app.get('/', (req, res, next) => {
    console.log("Home page");
    res.format({
        html: () => {
            res.render('../templates/index.ejs');
        }
    });
});



app.listen(port, () => {
    console.log(`HTTP server running on port: ${port}`);
});

module.exports = app;

require('./artist.js');
require('./artwork.js');

app.use((req, res) => {
    res.status(404).render('../templates/404.ejs');
    // send({url: req.originalUrl + ' not found'})
});