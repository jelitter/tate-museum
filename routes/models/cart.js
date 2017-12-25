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

loggedIn = function (req, res, next) {
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

router.post('/create', loggedIn, (req, res, next) => {
    const item = req.body; // { itemId, quantity }

    Cart.findOne({
        owner: req.session._id
    }, (err, cart) => {
        if (err) return console.error('Error 500 retrieving cart');
        if (!cart) {
            Cart.create(req.session._id, username, (err, cart) => {
                if (err) res.status(500).render('error', {
                    data: {
                        type: 'danger',
                        message: 'Error creating shopping cart:' + err.message
                    }
                });
                else {
                    console.log("Created cart: ", JSON.stringify(cart));
                    res.status(201).send();
                }
            });
        }
    });
});

// Add item to cart
router.post('/item', loggedIn, (req,res,next) => {
    let item = req.body;
    let owner = req.session._id;

    Artwork.findOne({
        id: item.itemId
    }, (err, itemInfo) => {
        if (err) return console.error('Error retrieving item info when adding to cart.');
        if (itemInfo) {

            let qty = parseInt(item.quantity);
            let price = itemInfo.price || 19.95;
            
            if (item.quantity == 0) {
                console.log('Trying to remove item: ', JSON.stringify(item));
                
                Cart.removeItem(owner, item.itemId, (err, cart) => {
                    console.log("Item removed from cart:", item.itemId);
                    req.session.cartItems = cart.cartItems;
                    req.session.priceTotal = cart.priceTotal;
                    res.status(202).send();
                });
                
            } else {
                item.quantity = qty;
                item.price = price;
                item.info = itemInfo;
                Cart.addItem(owner, item, (err, cart) => {
                    console.log("Item added to cart:", item.itemId, '*', item.quantity);
                    req.session.cartItems = cart.cartItems;
                    req.session.priceTotal = cart.priceTotal.toFixed(2);
                    res.status(201).send();
                });
            }
        }
    });
});

router.delete('/item', loggedIn, (req, res, next) => {
    let item = req.body;
    let owner = req.session._id;

    Cart.emptyCart(owner, (err, cart) => {
        if (err) console.error('Error emptying cart.');
        else {
           res.status(202).send();
        }
    });
});

router.post('/', loggedIn, (req, res, next) => {
    const item = req.body; // { itemId, quantity }

    Cart.findOne({
        owner: req.session._id
    }, (err, cart) => {
        if (err) return console.error('Error 500 retrieving cart');

        if (!cart) {
            // Create cart
            console.log('Cart not found, creating...');

            Cart.create(req.session._id, username, (err, cart) => {
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
    });
    res.status(201).send(); // Temp.
});

router.get('/checkout', loggedIn, (req, res, next) => {
    Cart.findOne({
        owner: req.session._id
    }, (err, cart) => {
        if (err) return console.error('GET -  Error 500 retrieving cart');

        if (cart) {

            console.log('Sending checkout template...');

            req.session.priceTotal = 0.00;
            req.session.cartItems = 0;

            res.status(200).render('checkout', {
                cache: true,
                data: {
                    username: cart.ownerName,
                    pagename: 'Checkout',
                    cart: cart,
                    cartItems: parseInt(cart.cartItems),
                    priceTotal: parseFloat(cart.priceTotal).toFixed(2),
                    checkedOut: true
                }
            });
        } else {
            return console.log('GET - Cart not found for this user');
        }
    });
});

router.get('/', loggedIn, (req, res, next) => {
    Cart.findOne({
        owner: req.session._id
    }, (err, cart) => {
        if (err) return console.error('GET -  Error 500 retrieving cart');

        if (cart) {

            req.session.priceTotal = parseFloat(cart.priceTotal);
            req.session.cartItems = parseInt(cart.cartItems);

            res.status(200).render('cart', {
                cache: true,
                data: {
                    username: cart.ownerName,
                    pagename: 'Shopping Cart',
                    cart: cart,
                    cartItems: cart.cartItems,
                    priceTotal: cart.priceTotal
                }
            });
        } else {
            return console.log('GET - Cart not found for this user');
        }
    });
});


module.exports = router;