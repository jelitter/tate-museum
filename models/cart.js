let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// let userSchema = new Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     created_at: Date
// });

var CartSchema = mongoose.Schema({
    owner: String,
    ownerName: String,
    items: {
        type: [{
            itemId: { type: Number, required: true, unique: true },
            info: {},
            price: { type: Number, default: 19.95 },
            quantity: { type: Number, required: true, default: 1 }
        }]
    },
    priceTotal: { type: Number, default: 0 },
    cartItems: { type: Number, default: 0 }
});

CartSchema.pre('save', function (next) {
    let cart = this;

    let cartItems = 0;
    let totalPrice = 0;

    console.log('*** cart middleware -', cart.items);
    next();
});

CartSchema.methods.updatePrice = function (pw) {
    return "test method";
};

var Cart = module.exports = mongoose.model('Cart', CartSchema, "cart");


// Get cart content
module.exports.getCart = function(callback, limit) {
    Cart.find(callback).limit(limit);
};

// Get cart order no. 
module.exports.getOrder = function(id, callback) {
    Cart.find({ id: id }, callback);
};

// Add artwork id to cart
module.exports.createCart = function(ownerId, ownerName, callback) {
    Cart.create({
        owner: ownerId,
        ownerName: ownerName,
        items: [],
        priceTotal: 0,
        cartItems: 0
    }, (err, cart) => {
        if (err) callback({});
        else {
            console.log("Created cart: ", JSON.stringify(cart));
            callback(cart);
        }
    });
};

module.exports.emptyCart = function (ownerId, callback) {
    Cart.findOneAndUpdate(
        { owner: ownerId }, 
        { 
            $set: { 
                items: [],
                cartItems: 0,
                priceTotal: 0
            } 
        },
        { upsert: true, new: true },
        (err, cart) => {
            if (err) callback({});
            else {
                console.log('Backend, cart emptied here.');
                callback(cart); 
            }
        }
    );
};

module.exports.addItem = function (owner, item, callback) {

    console.log('*** Adding item: ', JSON.stringify(item));

    Cart.findOneAndUpdate(
        { owner: owner },
        { 
            $push: { items: item },
            $inc: {
                cartItems: item.quantity,
                priceTotal: item.quantity * item.price
            }  
        },
        { upsert: true },
        (err, doc) => {
            if (err) res.status(500).send(err);
            else {
                console.log('Backend - Item added to cart.');
                callback(doc);
            }
        }
    );
};





// exports = { getCart, getOrder, createCart, addItem }

