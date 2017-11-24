//   ┌────────────────┐
//  │ Artwork Routes │
// └────────────────┘

const handleError = require('../config/error.js');
var artworkModel = require('../models/Artwork.js');
const app = require('./app.js');


// const artworks = [{
//         thumbnailUrl: "http://www.tate.org.uk/art/images/work/T/T07/T07912_8.jpg",
//         title: "Help",
//         artist: "Meadows, Bernard",
//         id: 225
//     },
//     {
//         thumbnailUrl: "http://www.tate.org.uk/art/images/work/T/T07/T07746_8.jpg",
//         title: "Mariner",
//         artist: "Morley, Malcolm",
//         id: 224
//     },
//     {
//         thumbnailUrl: "http://www.tate.org.uk/art/images/work/T/T07/T07867_8.jpg",
//         title: "After",
//         artist: "Deacon, Richard",
//         id: 223
//     }
// ];

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
                            thumbnailUrl: artwork.thumbnailUrl || '../static/missing.png',
                            title: artwork.title,
                            artist: artwork.artist,
                            id: artwork.id
                        }];
                        res.render('../views/index.ejs', { data: aw });

                    } else {
                        next();
                    }
                });
            } else {
                // No artwork ID
                artworkModel.getArtwork(function(err, artwork) {
                    if (err) handleError(res, err);
                    else res.render('../views/index.ejs', { data: artwork });
                }, 5);
            }
        },
        json: () => {

            if (req.query.id !== undefined) {
                artworkModel.getArtworkById(req.query.id, function(err, artwork) {
                    if (err) handleError(res, err);
                    // else res.send(results);
                    else res.render('../views/partials/artwork.ejs', {
                        thumbnailUrl: artwork.thumbnailUrl || '../static/missing.png',
                        title: artwork.title,
                        artist: artwork.artist
                    });
                });
            } else {
                artworkModel.getArtwork(function(err, results) {
                    if (err) handleError(res, err);
                    else res.send(results);
                }, 5);
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