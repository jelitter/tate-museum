const express = require('express');
const router = express.Router();
let User = require('../models/user');

loggedIn = function (req, res, next) {
    if (req.session._id) {
        // return next();
        res.redirect(301, 'shop');
    }
    else {
        // console.log("Auth middleware - index");
        // return res.render('index', {
        //     cache: true,
        //     data: {
        //         pagename: 'Login',
        //         type: 'warning',
        //         message: 'Please login first',
        //     }
        // });
        res.render('index', {
            cache: true,
            data: {
                pagename: 'Login',
                type: 'info',
                message: ''
            }
        });
    }
};

router.get('/', loggedIn, (req, res, next) => {
    // res.redirect(301,'shop');
    
});

router.get('/users.json', (req, res) => {
    User.find({}, (err, users) => {
        if (err) console.error(err);
        res.send(users);
    });
});



module.exports = router;