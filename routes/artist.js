//   ┌───────────────┐
//  │ Artist Routes │
// └───────────────┘

var artistModel = require('../models/Artist.js');
const app = require('./app.js');

// Get Artists
app.get('/api/artists', (req, res, next) => {
    console.log("Artists API - Get artists", req.query);
    res.format({
        // html: () => {
        //     // res.render('../templates/select.pug');
        //     res.send(JSON.stringify(artists, null, 2));
        // },
        json: () => {

            if (req.query.id !== undefined) {
                artistModel.getArtistById(req.query.id, function(err, a) {
                    if (err) handleError(err);
                    else {
                        res.send(a);
                    }
                });
            } else {
                artistModel.getArtists(function(err, a) {
                    if (err) handleError(err);
                    else {
                        res.send(a);
                    }
                }, 3);
            }


            // Cached
            // res.send(artists);

        }
    });
});

// Get Artist by id

app.get('/api/artists/:id', (req, res, next) => {
    const id = req.params.id
    console.log("GET - /api/artists/:id", req.params.id);
    res.format({
        json: () => {
            artistModel.getArtistById(id, function(err, a) {
                if (err) handleError(err);
                else {
                    res.send(a);
                }
            });

            // Cached
            // res.send(artists.filter(el => el.id == req.params.id));
        }
    });
});

// Add Artist
app.post('/api/artists', (req, res, next) => {
    console.log("POST - /api/artists", req.body);
    var newartist = req.body;
    artistModel.addArtist(newartist, function(err, artist) {
        if (err) {
            console.log("Error: ", JSON.stringify(err, null, 2));
        } else {
            res.format({
                json: () => {
                    res.send(newartist);
                    console.log("Artist added: ", JSON.stringify(newartist, null, 2));
                }
            });
        }
    });

});