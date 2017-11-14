//   ┌─────────────┐
//  │ Cart Routes │
// └─────────────┘
const handleError = require('../config/error.js');
var cartModel = require('../models/cart.js');
const app = require('./app.js');


app.get('/api/cart/:id', (req, res, next) => {
    console.log("Cart API - Get cart", req.params);
    res.format({
        html: () => {
            if (req.query.id !== undefined) {
                cartModel.getOrder(req.query.id, function(err, order) {
                    if (err) handleError(err);
                    else res.render('../views/partials/order.ejs', {
                        id: order.id,
                        artworkid: order.artworkid
                    });
                });
            } else {
                cartModel.getCart(function(err, cart) {
                    if (err) handleError(err);
                    else res.render('../views/partials/cart.ejs', {
                        cart: cart
                    });
                });
            }
        },
        json: () => {
            if (req.query.id !== undefined) {
                cartModel.getOrder(req.query.id, function(err, a) {
                    if (err) handleError(err);
                    else {
                        res.send(a);
                    }
                });
            } else {
                cartModel.getCart(function(err, cart) {
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
app.post('/api/cart', (req, res, next) => {
    console.log("POST - /api/cart", req.body);
    var artistid = req.body.id;
    cartModel.addItem(newartist, function(err, artist) {
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