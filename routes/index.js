const express = require('express');
const router = express.Router();
let User = require('../models/user');


router.get('/', loggedIn, (req, res, next) => {
    console.log('/ hit');
    // res.status(200).render('index', { data: {} });

    User.findOne({ _id: req.session._id }, (err, user) => {
        if (err) res.status(401).redirect('/login');
        if (user) res.status(200).render('../views/shop.ejs', { cache: true, data: { username: user.username } });
        else res.status(401).redirect('/login');
    });
    // next();
});

function loggedIn(req, res, next) {
    console.log('loggedIn -> session:', req.session._id);
    if (req.session._id) return next();
    else return res.redirect('/login');
};

module.exports = router;