//   ┌───────────────┐
//  │ Artist Routes │
// └───────────────┘
const handleError = require('../../config/error');
var artistModel = require('../../models/Artist');
const app = require('../../app');

// Get Artists
app.get('/', (req, res, next) => {
    res.format({
        html: () => {
            if (req.query.id !== undefined) {
                artistModel.getArtistById(req.query.id, function(err, artist) {
                    if (err) handleError(res, err);
                    else res.render('../views/partials/artist2.ejs', {
                        cache: true,
                        name: artist.name,
                        yearOfBirth: artist.yearOfBirth,
                        placeOfBirth: artist.placeOfBirth
                    });
                });
            }
        },
        json: () => {

            if (req.query.id !== undefined) {
                artistModel.getArtistById(req.query.id, function(err, a) {
                    if (err) handleError(res, err);
                    else res.send(a);
                });
            } else {
                artistModel.getArtists(function(err, a) {
                    if (err) handleError(res, err);
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
    const id = req.params.id;
    res.format({
        json: () => {
            artistModel.getArtistById(id, function(err, a) {
                if (err) handleError(res, err);
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
    console.log("POST", req.originalUrl);
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