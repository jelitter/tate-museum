//   ┌───────────────┐
//  │   Register    │
// └───────────────┘

const express = require('express');
const router = express.Router();
const handleError = require('../config/error.js');
let bcrypt = require('bcrypt');
let User = require('../models/user.js');

router.get('/', (req, res, next) => {
    User.findOne({ _id: req.session._id }, (err, user) => {
        if (err) res.status(500).redirect('/');
        if (user) {
            res.render('register', { 
                cache: true, 
                data: {
                    username: user.username,
                }
            });
        } else {
            res.render('register', { cache: true, data: {} });
        }
    });
});

router.get('/users.json', (req, res) => {
    User.find({}, (err, users) => {
        if (err) throw err;
        res.send(users);
    });
});

router.post('/', (req, res, next) => {
    var logindata = req.body;
    User.findOne({username: logindata.username }, (err, user) => {
        
        if (err) console.log("Error ");
        if (user) {
            console.log('User found: ', JSON.stringify(user,null,2));
            res.status(401).render('register', {
                data: {
                    type: 'warning',
                    message: 'User name ' + user.username +' already in use'
                }
            });
        } else {
            User.create({
                username: logindata.username,
                password: logindata.password,
                created_at: new Date()
            }, (err, user) => {
                if (err) res.status(500).render('register', {
                    data: {
                        type: 'warning',
                        message: 'user not created:' + err.message
                    }
                });
                else {
                    console.log("Created account and logged in: ", user.username);
                    req.session._id = user._id;
                    res.status(200).render('index', { 
                        data: { username: user.username } });
                }
            });
        }
    });
});

module.exports = router;
