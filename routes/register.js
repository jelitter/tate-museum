//   ┌───────────────┐
//  │   Register    │
// └───────────────┘

const express = require('express');
const router = express.Router();
const handleError = require('../config/error');
let bcrypt = require('bcrypt');
let User = require('../models/user');
let Cart = require('../models/cart');

router.get('/', (req, res, next) => {
    User.findOne({
        _id: req.session._id
    }, (err, user) => {
        if (err) res.status(500).redirect('/');
        if (user) {
            res.render('register', {
                cache: true,
                data: {
                    username: user.username,
                    cartItems: req.session.cartItems,
                    priceTotal: req.session.priceTotal,
                    pagename: 'Register'
                }
            });
        } else {
            res.render('register', {
                cache: true,
                data: { pagename: 'Register' }
            });
        }
    });
});

router.post('/', (req, res, next) => {
    var logindata = req.body;
    User.findOne({
        username: logindata.username
    }, (err, user) => {

        if (err) console.log("Error ");
        if (user) {
            console.log('User found: ', JSON.stringify(user, null, 2));
            res.status(401).render('register', {
                data: {
                    type: 'warning',
                    message: 'User name ' + user.username + ' already in use',
                    pagename: 'Register'
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
                                message: 'Both user name and password must be specified.',
                                pagename: 'Register'
                            }
                        });
                    },
                    json: () => {
                        return res.json({
                            status: 401,
                            message: 'Both user name and password must be specified',
                            pagename: 'Register'
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
                                message: 'Password must be at least 6 characters long',
                                pagename: 'Register'
                            }
                        });
                    },
                    json: () => {
                        return res.json({
                            status: 401,
                            message: 'Password must be at least 6 characters long',
                            pagename: 'Register'
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
                        message: 'user not created:' + err.message,
                        pagename: 'Register'
                    }
                });
                else {
                    // Now creating an empty cart for this user
                    Cart.createCart(user._id, user.username, (err, cart) => {
                        console.log('Created account and logged in:', user.username);
                        req.session._id = user._id;
                        req.session.username = user.username;
                        req.session.cartItems = 0;
                        req.session.priceTotal = 0;
                        res.status(200).render('index', {
                            data: {
                                username: user.username,
                                cartItems: req.session.cartItems,
                                priceTotal: req.session.priceTotal,
                                pagename: 'Register'
                            }
                        });
                    });
                }
            });
        }
    });
});

module.exports = router;