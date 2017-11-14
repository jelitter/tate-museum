//   ┌────────────────┐
//  │ Artwork Routes │
// └────────────────┘


var artworkModel = require('../models/Artwork.js');
const app = require('./app.js');


// Get Artworks
app.get('/api/artwork', (req, res, next) => {
    console.log("Artwork API");
    res.format({
        json: () => {
            artworkModel.getArtwork(function(err, results) {
                if (err) handleError(err);
                else res.send(results);
            });
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