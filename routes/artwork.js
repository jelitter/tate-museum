//   ┌────────────────┐
//  │ Artwork Routes │
// └────────────────┘


var artworkModel = require('../models/Artwork.js');
const app = require('./app.js');


// Get Artworks
app.get('/api/artwork', (req, res, next) => {
    console.log("Artwork API", req.query);
    res.format({
        html: () => {
            if (req.query.id !== undefined) {
                artworkModel.getArtworkById(req.query.id, function(err, artwork) {
                    if (err) handleError(err);
                    // else res.send(results);
                    // else res.render('../views/partials/artwork.ejs', {
                    else if (artwork) {
                        res.render('../views/partials/artwork2.ejs', {
                            thumbnailUrl: artwork.thumbnailUrl,
                            title: artwork.title,
                            artist: artwork.artist
                        });
                    } else {
                        res.render('../views/partials/404.ejs');
                    }
                });
            }
        },
        json: () => {

            if (req.query.id !== undefined) {
                artworkModel.getArtworkById(req.query.id, function(err, artwork) {
                    if (err) handleError(err);
                    // else res.send(results);
                    else res.render('../views/partials/artwork.ejs', {
                        thumbnailUrl: artwork.thumbnailUrl,
                        title: artwork.title,
                        artist: artwork.artist
                    });
                });
            } else {
                artworkModel.getArtwork(function(err, results) {
                    if (err) handleError(err);
                    else res.send(results);
                }, 3);
            }
        }
    });
});

// Get Artwork by id
app.get('/api/artwork/:id', (req, res, next) => {
    const id = req.params.id
    console.log("GET - /api/artwork/:id", req.params.id);
    res.format({
        json: () => {
            artworkModel.getArtworkById(id, function(err, result) {
                if (err) handleError(err);
                else res.send(result);
            });
        }
    });
});