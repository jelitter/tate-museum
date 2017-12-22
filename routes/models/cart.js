//   ┌─────────────┐
//  │ Cart Routes │
// └─────────────┘
const handleError = require('../config/error.js');
const express = require('express');
const router = express.Router();
var Cart = require('../models/cart.js');
let username = null;

router.post('*', loggedIn, (req, res, next) => {
    User.findOne({ _id: req.session._id }, (err, user) => {
        if (err) {
            res.render('index', {
                cache: true,
                data: {
                    pagename: 'Main',
                    type: 'danger',
                    message: 'Error - Please login',
                }
            });
        }
        if (user) {
            username = user.username;
            next();
        } else {
            res.render('index', {
                cache: true,
                data: {
                    pagename: 'Main',
                    type: 'warning',
                    message: 'Please login',
                }
            });
        }
    });
});
router.get('*', loggedIn, (req, res, next) => {
    User.findOne({ _id: req.session._id }, (err, user) => {
        if (err) {
            res.render('index', {
                cache: true,
                data: {
                    pagename: 'Main',
                    type: 'danger',
                    message: 'Error - Please login',
                }
            });
        }
        if (user) {
            username = user.username;
            next();
        } else {
            res.render('index', {
                cache: true,
                data: {
                    pagename: 'Main',
                    type: 'warning',
                    message: 'Please login',
                }
            });
        }
    });
});

loggedIn = function(req, res, next) {
    if (req.session._id) return next();
    else return res.redirect(401, '/');
};

router.post('/', loggedIn, (req, res, next) => {
    const query = req.body.query;

    console.log('Cart - POST, Query: ', JSON.stringify(query));
});



router.get('/api/cart/:id', (req, res, next) => {
    console.log("Cart API - Get cart", req.params);
    res.format({
        html: () => {
            if (req.query.id !== undefined) {
                Cart.getOrder(req.query.id, function(err, order) {
                    if (err) handleError(err);
                    else res.render('../views/partials/order.ejs', {
                        cache: true,
                        id: order.id,
                        artworkid: order.artworkid
                    });
                });
            } else {
                Cart.getCart(function(err, cart) {
                    if (err) handleError(err);
                    else res.render('../views/partials/cart.ejs', {
                        cache: true,
                        cart: cart
                    });
                });
            }
        },
        json: () => {
            if (req.query.id !== undefined) {
                Cart.getOrder(req.query.id, function(err, a) {
                    if (err) handleError(err);
                    else {
                        res.send(a);
                    }
                });
            } else {
                Cart.getCart(function(err, cart) {
                    if (err) handleError(err);
                    else {
                        res.send(cart);
                    }
                }, 3);
            }
        }
    });
});


// Add item to order
router.post('/api/cart', (req, res, next) => {
    console.log("POST - /api/cart", req.body);
    var artistid = req.body.id;
    Cart.addItem(newartist, function(err, artist) {
        if (err) {
            console.log("Error: ", JSON.stringify(err, null, 2));
        } else {
            res.format({
                json: () => {
                    res.send(newartist);
                    console.log("Artist added: ", JSON.stringify(newartist, null, 2));
                }
            });
        }
    });

});


module.exports = router;