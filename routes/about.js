const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    User.findOne({ _id: req.session._id }, (err, user) => {
        if (err) res.status(401).redirect('/');
        res.status(200).render('about', {
            cache: true,
            data: {
                username: user ? user.username : '',
                pagename: 'About',
                cartItems: req.session.cartItems || 0
            }
        });
    });
});

module.exports = router;