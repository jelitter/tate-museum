//   ┌───────────────┐
//  │ Login Routes  │
// └───────────────┘

const express = require('express');
const router = express.Router();
const handleError = require('../config/error');
let bcrypt = require('bcrypt');
let User = require('../models/user');
let Cart = require('../models/cart');


router.get('/', (req, res, next) => {

    User.findOne({ _id: req.session._id }, (err, user) => {
        if (err) res.status(500).redirect('/');
        res.render('index', {
            cache: false,
            data: {
                username: user ? user.username : ''
            }
        });
    });
});

router.post('/', (req, res, next) => {
    var logindata = req.body;

    if (!logindata.username || !logindata.password) {
        res.format({
            // html: () => {
            //     return res.status(401).render('index', {
            //         cache: false,
            //         data: {
            //             type: 'danger',
            //             message: 'Both user name and password must be specified.'
            //         }
            //     });
            // },
            json: () => {
                return res.json({
                    status: 401,
                    message: 'Both user name and password must be specified.'
                });
            }
        });
        return;
    }

    User.findOne({ username: logindata.username }, (err, user) => {
        if (err) return res.status(401).render('index', {
            cache: false,
            data: {
                type: 'danger',
                message: err.message
            }
        });
        if (!user) return res.status(401).render('index', {
            cache: false,
            data: {
                type: 'warning',
                message: 'User ' + logindata.username + ' does not exist'
            }
        });

        if (user.compare(logindata.password)) {
            console.log("Logged in:", user.username);
            req.session._id = user._id;
            req.session.username = user.username;

            Cart.findOne({
                owner: req.session._id
            }, (err, cart) => {
                if (err) return console.error('GET -  Error 500 retrieving cart');
                if (cart) {
                    console.log('Cart found in login', cart.items.length, 'items');
                    req.session.cartItems = cart.items.length;
                    res.render('index', {
                        cache: false,
                        data: {
                            username: user.username,
                            cartItems: req.session.cartItems
                        }
                    });
                } 
            });

        } else {
            console.log("Invalid credentials: ", user.username);
            res.status(401).render('index', {
                cache: false,
                data: {
                    type: 'danger',
                    message: 'Invalid credentials'
                }
            });
        }
    });
});

module.exports = loggedIn = function(req, res, next) {
    if (req.session._id) return next();
    else return res.redirect('/login');
};

module.exports = router;