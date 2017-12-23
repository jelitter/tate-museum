//   ┌─────────────┐
//  │ Cart Routes │
// └─────────────┘
const handleError = require('../../config/error.js');
const express = require('express');
const router = express.Router();
const Cart = require('../../models/cart.js');
const Artwork = require('../../models/Artwork.js');
const User = require('../../models/user.js');

let username = null;

loggedIn = function(req, res, next) {
    if (req.session._id) return next();
    else {
        console.log("Auth middleware - cart");
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

router.post('/', loggedIn, (req, res, next) => {
    const item = req.body; // { itemId, quantity }

    Cart.findOne({ owner: req.session._id }, (err, cart) => {
        if (err) return console.error('Error 500 retrieving cart');

        if (!cart) {
            // Create cart
            console.log('Cart not found, creating...');
            Cart.create({
                owner: req.session._id,
                ownerName: username,
                items: [],
                priceTotal: 0
            }, (err, cart) => {
                if (err) res.status(500).render('error', {
                    data: {
                        type: 'danger',
                        message: 'Error creating shopping cart:' + err.message
                    }
                });
                else {
                    console.log("Created cart: ", JSON.stringify(cart));
                }
            });

        }
        // Push item to cart
        console.log('Pushing item to cart:', item);

        Artwork.findOne({ id: item.itemId }, (err, itemInfo) => {
            if (err) return console.error('Error retrieving item info when adding to cart.');
            if (itemInfo) {
                item.info = itemInfo;
                Cart.findOneAndUpdate({ owner: req.session._id }, { $push: { items: item } }, { upsert: true }, (err, cart) => {
                    if (err) {
                        console.error('Error updating cart.');
                        res.status(500).send('Error updating cart.');
                    } else {
                        console.log("Item added to cart!");
                        res.status(201).send();
                        // res.status(200).json(cart);
                    }
                });
            }
        });
    });

    console.log('POST - Cart, Query: ', JSON.stringify(item));
});

router.get('/', loggedIn, (req, res, next) => {
    Cart.find({
        owner: req.session._id
    }, (err, cart) => {
        if (err) return console.error('GET -  Error 500 retrieving cart');

        if (cart) {
            res.status(200).render('cart', {
                cache: true,
                data: {
                    username: cart[0].ownerName,
                    pagename: 'Shopping Cart',
                    cart: cart
                }
            });
        } else {
            return console.log('GET - Cart not found for this user');
        }
    });
});


module.exports = router;