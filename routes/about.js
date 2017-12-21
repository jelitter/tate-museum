const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {

    console.log('/shop hit');
    User.findOne({ _id: req.session._id }, (err, user) => {
        // console.log('User found - shop:', user.username);
        if (err) res.status(401).redirect('/');
        if (user) res.status(200).render('../views/about.ejs', { cache: true, data: { username: user.username } });
        else res.status(200).render('../views/about.ejs', { cache: true, data: { username: '' } });
    });
});

module.exports = router;
