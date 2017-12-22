var mongoose = require('mongoose');

var ArtworkSchema = mongoose.Schema({
    id: { type: Number },
    accession_number: { type: String, trim: true },
    artist: { type: String, trim: true },
    artistRole: { type: String, trim: true },
    artistId: { type: Number },
    title: { type: String, trim: true },
    dateText: { type: String, trim: true },
    medium: { type: String, trim: true },
    creditLine: { type: String, trim: true },
    year: { type: String, trim: true },
    acquisitionYear: { type: Number },
    dimensions: { type: String, trim: true },
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
    units: { type: String, trim: true },
    inscription: { type: String, trim: true },
    thumbnailCopyright: { type: String, trim: true },
    thumbnailUrl: { type: String, trim: true },
    url: { type: String, trim: true }
});


var Artwork = module.exports = mongoose.model('Artwork', ArtworkSchema, "artwork");


// Get Artworks
var getArtwork = function(callback, limit) {
    Artwork.count().exec((err, count) => {
        if (err) console.log("Couldn't get count.");
        else {
            const skip = Math.floor(Math.random() * count) - limit;
            console.log(`Count: ${count}, Skip: ${skip}`);
            Artwork.find(callback).limit(limit).skip(skip);
        }
    });
};

var searchArtworkByTitle = function(title, callback, limit=10) {
    
    Artwork.findOne({ title: query }, callback);
    
    // Artwork.find({ title: query }).limit(limit).exec((err, results) => {
    //     if (err) console.log("Error searching artwork by title.");
    //     else {
    //         Artwork.find(callback).limit(limit).skip(skip);
    //     }
    // });
};

// Get Artwork by id
module.exports.getArtworkById = function(artworkid, callback) {
    Artwork.findOne({ id: artworkid }, callback);
};

// Add Artwork
module.exports.addArtwork = function(artwork, callback) {
    Artwork.create(artwork, callback);
};

exports = { getArtwork, searchArtworkByTitle, Artwork }
