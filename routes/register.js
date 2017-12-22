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

            // Validation that both username and password are non-empty
            if (!logindata.username || !logindata.password) {
                res.format({
                    html: () => {
                        return res.status(401).render('register', {
                            cache: true,
                            data: {
                                type: 'danger',
                                message: 'Both user name and password must be specified.'
                            }
                        });
                    },
                    json: () => {
                        return res.json({
                            status: 401,
                            message: 'Both user name and password must be specified'
                        });
                    }
                });
                return;
            }

            // Validation that password is at least 6 characters long
            if (logindata.password.length < 6) {
                res.format({
                    html: () => {
                        return res.status(401).render('register', {
                            cache: true,
                            data: {
                                type: 'danger',
                                message: 'Password must be at least 6 characters long'
                            }
                        });
                    },
                    json: () => {
                        return res.json({
                            status: 401,
                            message: 'Password must be at least 6 characters long'
                        });
                    }
                });
                return;
            }

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
