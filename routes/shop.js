const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const loggedIn = require('./login');


router.get('/', loggedIn, (req, res, next) => {

    console.log('/shop hit');
    User.findOne({ _id: req.session._id }, (err, user) => {
        console.log('User found - shop:', user.username);
        if (err) res.status(401).redirect('/');
        if (user) res.status(200).render('../views/shop.ejs', { cache: true, data: { username: user.username }});
        else res.status(401).redirect('/');
    });
});

loggedIn = function (req, res, next) {
    console.log('loggedIn -> session:', req.session._id);
    if (req.session._id) return next();
    else return res.redirect('/login');
};

module.exports = router;
