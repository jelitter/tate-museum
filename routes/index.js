const express = require('express');
const router = express.Router();
let User = require('../models/user');

loggedIn = function (req, res, next) {
    if (req.session._id) return next();
    else {
        console.log("Auth middleware - artwork");
        return res.render('index', {
            cache: true,
            data: {
                pagename: 'Login',
                type: 'warning',
                message: 'Please login first',
            }
        });
    }
};

router.get('/', loggedIn, (req, res, next) => {
    res.redirect(301,'shop');
});

router.get('/users.json', (req, res) => {
    User.find({}, (err, users) => {
        if (err) throw err;
        res.send(users);
    });
});



module.exports = router;