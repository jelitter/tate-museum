var mongoose = require('mongoose');


var CartSchema = mongoose.Schema({
    items: { type: [Number] }, // Number array with Artwork ids
    priceTotal: { type: Number }
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