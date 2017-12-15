//   ┌────────────────┐
//  │ Artwork Routes │
// └────────────────┘

const handleError = require('../config/error.js');
var artworkModel = require('../models/Artwork.js');
const app = require('./app.js');
const numberOfResults = 5;

// Get Artworks
app.get('/api/artwork', (req, res, next) => {
    res.format({
        html: () => {
            if (req.query.id !== undefined && req.query.id != "") {
                artworkModel.getArtworkById(req.query.id, function(err, artwork) {
                    if (err) handleError(res, err);
                    // else res.send(results);
                    // else res.render('../views/partials/artwork.ejs', {
                    else if (artwork) {
                        const aw = [{
                            thumbnailUrl: artwork.thumbnailUrl,
                            title: artwork.title,
                            artist: artwork.artist,
                            id: artwork.id
                        }];
                        res.render('../views/api.ejs', { cache: true, data: aw });

                    } else {
                        next();
                    }
                });
            } else {
                // No artwork ID
                artworkModel.getArtwork(function(err, artwork) {
                    if (err) handleError(res, err);
                    else {
                        res.render('../views/api.ejs', { cache: true, data: artwork });
                    }
                }, numberOfResults);
            }
        },
        json: () => {

            if (req.query.id !== undefined) {
                artworkModel.getArtworkById(req.query.id, function(err, artwork) {
                    if (err) handleError(res, err);
                    // else res.send(results);
                    else res.render('../views/partials/artwork.ejs', {
                        cache: true,
                        thumbnailUrl: artwork.thumbnailUrl,
                        title: artwork.title,
                        artist: artwork.artist
                    });
                });
            } else {
                artworkModel.getArtwork(function(err, results) {
                    if (err) handleError(res, err);
                    else res.send(results);
                }, numberOfResults);
            }
        }
    });
});

// Get Artwork by id
app.get('/api/artwork/:id', (req, res, next) => {
    const id = req.params.id
    res.format({
        json: () => {
            artworkModel.getArtworkById(id, function(err, result) {
                if (err) handleError(res, err);
                else res.send(result);
            });
        }
    });
});