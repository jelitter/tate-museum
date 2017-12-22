//   ┌────────────────┐
//  │ Artwork Routes │
// └────────────────┘

const express = require('express');
const router = express.Router();
const handleError = require('../../config/error.js');
const Artwork = require('../../models/Artwork.js');
const searchArtworkByTitle = require('../../models/Artwork.js');
const getArtwork = require('../../models/Artwork.js');


const MAX_RESULTS = 10;

// Get Artworks
router.get('/', (req, res, next) => {
    res.format({
        html: () => {
            if (req.query.id !== undefined && req.query.id != "") {
                Artwork.getArtworkById(req.query.id, function(err, artwork) {
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
                        res.render('shop', { cache: true, data: aw });

                    } else {
                        next();
                    }
                });
            } else {
                // No artwork ID
                Artwork.getArtwork(function(err, artwork) {
                    if (err) handleError(res, err);
                    else {
                        res.render('shop', { cache: true, data: artwork });
                    }
                }, numberOfResults);
            }
        },
        json: () => {

            if (req.query.id !== undefined) {
                Artwork.getArtworkById(req.query.id, function(err, artwork) {
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
                Artwork.getArtwork(function(err, results) {
                    if (err) handleError(res, err);
                    else res.send(results);
                }, numberOfResults);
            }
        }
    });
});

// Get Artwork by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id

    Artwork.getArtworkById(id, function (err, result) {
        if (err) handleError(res, err);
        else {
            res.format({
                json: () => {
                    res.send(result);
                },
                html: () => {
                    res.render('partials/artwork_b', {
                        cache: true,
                        data: {
                            artwork: result
                        }
                    });
                }
            });
        }
    });
});

router.post('/search', (req,res,next) => {
    
    const query = req.body.query;
    console.log('Searching for', query, '...');
    let re = new RegExp('.*'+ query + '.*', "i")

    Artwork.find({ title: re }).count().exec((err, count) => {
        if (err) console.log("Couldn't get count.");
        else {
            const skip = MAX_RESULTS;
            console.log(`Count for ${query}: ${count}, Skip: ${skip}`);
            Artwork.find({ title: re }, (err, results) => {
                if (err) console.log('err', err);
                else {
                    console.log(results.length, ' items found for', query);
                    res.render('partials/shop_results', {
                        cache: true,
                        data: {
                            artworks: results,
                            items: results.length,
                            total: count
                        }
                    });
                }
            }).limit(MAX_RESULTS).skip(0);
        }
    });


    

    

    // searchArtworkByTitle(query, (err, result) => {
    //     if (err) console.log('err', err);
    //     else console.log('result', result);
    // }, 10);

    // getArtworkById = function (artworkid, callback) {
    //     artworkModel.findOne({ id: artworkid }, callback);
    // };
});

module.exports = router;
