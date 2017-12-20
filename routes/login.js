//   ┌───────────────┐
//  │ Login Routes  │
// └───────────────┘

const express = require('express');
const router = express.Router();
const handleError = require('../config/error');
let bcrypt = require('bcrypt');
let User = require('../models/user');
// const app = require('./app');
// const session = require('express-session')


router.get('/', (req, res, next) => {
    res.format({
        html: () => {
            res.render('../views/index.ejs', { cache: true, data: [] });
        }
    });
});

router.post('/', (req, res, next) => {
    var logindata = req.body;

    User.findOne({ username: logindata.username }, (err, user) => {
        if (err)
            return res.status(401).render('../views/index.ejs', { data: { title: 'Error', message: 'Invalid credentials' }});
        if (!user)
            return res.status(401).render('../views/index.ejs', { data: { title: 'Error', message: 'Invalid username or password' }});

        if (user.compare(logindata.password)) {
            console.log("Logged in: ", user.username);
            req.session._id = user._id;
            res.redirect('/shop'); //, { data: { username: user.username } });
        } else {
            res.redirect('/'); //, { data: { title: 'Error', message: 'Invalid credentials' } });
        }
    });
});

module.exports = loggedIn = function (req, res, next) {
    console.log('loggedIn -> session:', req.session._id);
    if (req.session._id) return next();
    else return res.redirect('/login');
};

module.exports = router;

