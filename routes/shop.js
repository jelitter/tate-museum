const express = require('express');
const router = express.Router();
const User = require('../models/user');

loggedIn = function(req, res, next) {
    if (req.session._id) return next();
    else {
        console.log("Auth middleware - shop");
        return res.render('index', {
            cache: false,
            data: {
                pagename: 'Login',
                type: 'warning',
                message: 'Please login first',
            }
        });
    }
};

router.get('/', loggedIn, (req, res, next) => {
    User.findOne({ _id: req.session._id }, (err, user) => {
        if (err) res.status(401).redirect('/');
        if (user) res.status(200).render('shop', {
            cache: true,
            data: {
                username: user.username,
                pagename: 'Shop',
                query: ''
            }
        });
        else res.status(401).redirect('/');
    });
});

module.exports = router;