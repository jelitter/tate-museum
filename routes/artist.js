//   ┌───────────────┐
//  │ Artist Routes │
// └───────────────┘

var artistModel = require('../models/Artist.js');
const app = require('./app.js');

// Get Artists
app.get('/api/artists', (req, res, next) => {
    console.log(JSON.stringify(req.params, null, 2));
    console.log("Artists API - Get artists");
    res.format({
        // html: () => {
        //     // res.render('../templates/select.pug');
        //     res.send(JSON.stringify(artists, null, 2));
        // },
        json: () => {

            artistModel.getArtists(function(err, a) {
                if (err) handleError(err);
                else {
                    res.send(a);
                }
            });

            // Cached
            // res.send(artists);

        }
    });
});

// Get Artist by id

app.get('/api/artists/:id', (req, res, next) => {
    console.log(JSON.stringify(req.params, null, 2));
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