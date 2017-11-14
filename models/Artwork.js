var mongoose = require('mongoose');

var ArtworkSchema = mongoose.Schema({
    id: { type: Number },
    accession_number: { type: String, trim: true, max: 100 },
    artist: { type: String, trim: true, max: 100 },
    artistRole: { type: String, trim: true, max: 100 },
    artistId: { type: Number },
    title: { type: String, trim: true, max: 100 },
    dateText: { type: String, trim: true, max: 100 },
    medium: { type: String, trim: true, max: 100 },
    creditLine: { type: String, trim: true, max: 100 },
    year: { type: String, trim: true, max: 100 },
    acquisitionYear: { type: Number },
    dimensions: { type: String, trim: true, max: 100 },
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
    units: { type: String, trim: true, max: 100 },
    inscription: { type: String, trim: true, max: 100 },
    thumbnailCopyright: { type: String, trim: true, max: 100 },
    thumbnailUrl: { type: String, trim: true, max: 100 },
    url: { type: String, trim: true, max: 100 }
});


var artworkModel = module.exports = mongoose.model('Artwork', ArtworkSchema, "artwork");

// Get Artworks
module.exports.getArtwork = function(callback, limit) {
    artworkModel.find(callback).limit(limit);
}

// Get Artwork by id
module.exports.getArtworkById = function(artworkid, callback) {
    artworkModel.findOne({ id: artworkid }, callback);
}

// Add Artwork
module.exports.addArtwork = function(artwork, callback) {
    artworkModel.create(artwork, callback);
}