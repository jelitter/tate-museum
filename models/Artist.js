var mongoose = require('mongoose');

var ArtistSchema = mongoose.Schema({
    id: { type: Number },
    name: { type: String, trim: true, max: 100 },
    gender: { type: String, trim: true, max: 100 },
    dates: { type: String, trim: true, max: 100 },
    yearOfBirth: { type: Number },
    yearOfDeath: { type: Number },
    placeOfBirth: { type: String, trim: true, max: 100 },
    placeOfDeath: { type: String, trim: true, max: 100 },
    url: { type: String, trim: true, max: 100 }
});

var artistModel = module.exports = mongoose.model('Artist', ArtistSchema, "artists");

// Get Artists
module.exports.getArtists = function(callback, limit) {
    artistModel.find(callback).limit(limit);
}

// Get Artist by id
module.exports.getArtistById = function(artistid, callback) {
    artistModel.findOne({ id: artistid }, callback);
}

// Add Artist
module.exports.addArtist = function(artist, callback) {
    artistModel.create(artist, callback);
}