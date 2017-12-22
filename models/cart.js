let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: Date
});


var CartSchema = mongoose.Schema({
    owner: Schema.Types.ObjectId,
    items: {
        type: [{
            itemId: { type: Number, required: true },
            price: { type: Number },
            amount: { type: Number, required: true, default: 1 }
        }]
    },
    priceTotal: Number
});

var cartModel = module.exports = mongoose.model('Cart', CartSchema, "cart");

// Get cart content
module.exports.getCart = function(callback, limit) {
    cartModel.find(callback).limit(limit);
};

// Get cart order no. 
module.exports.getOrder = function(id, callback) {
    cartModel.find({ id: id }, callback);
};

// Add artwork id to cart
module.exports.addItem = function(artworkid, callback) {
    artistModel.create(artworkid, callback);
};