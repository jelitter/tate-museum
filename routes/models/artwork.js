//   ┌────────────────┐
//  │ Artwork Routes │
// └────────────────┘

const express = require('express');
const router = express.Router();
const handleError = require('../../config/error.js');
const User = require('../../models/user');
const Artwork = require('../../models/Artwork.js');
const searchArtworkByTitle = require('../../models/Artwork.js');
const getArtwork = require('../../models/Artwork.js');

const MAX_RESULTS = 8;
let username = null;

// router.post('*', loggedIn, (req, res, next) => {
//     User.findOne({ _id: req.session._id }, (err, user) => {
//         if (err) res.status(401).redirect('/');
//         if (user) {
//             username = user.username;
//             next();
//             // res.status(200).render('shop', { cache: true, data: { username: user.username, pagename: 'shop' } });
//         } else res.status(401).redirect('/');
//     });
// });
// router.get('*', loggedIn, (req, res, next) => {
//     User.findOne({ _id: req.session._id }, (err, user) => {
//         if (err) {
//             res.render('index', {
//                 cache: true,
//                 data: {
//                     pagename: 'Main',
//                     type: 'danger',
//                     message: 'Error - Please login',
//                 }
//             });
//         }
//         if (user) {
//             username = user.username;
//             next();
//             // res.status(200).render('shop', { cache: true, data: { username: user.username, pagename: 'shop' } });
//         } else {
//             res.render('index', {
//                 cache: true,
//                 data: {
//                     pagename: 'Main',
//                     type: 'warning',
//                     message: 'Please login',
//                 }
//             });
//         }
//     });
// });

loggedIn = function (req, res, next) {
    if (req.session._id) return next();
    else {
        console.log("Auth middleware - artwork");
        return res.render('index', {
            cache: true,
            data: {
                pagename: 'Login',
                type: 'warning',
                message: 'Please login first',
            }
        });
    }
};

router.get('/search', loggedIn, (req, res, next) => {

    const query = req.body.query;
    const page = req.body.page | 1;

    console.log('Searching for', query, '...');
    

    // if (query.length < 3) {
    //     res.render('partials/shop_results', {
    //         cache: true,
    //         data: {
    //             type: 'warning',
    //             message: 'Please enter at least 3 characters',
    //             total: 0,
    //             page: 1,
    //             pagename: 'Shop',
    //             query: query,
    //             username: username
    //         }
    //     });
    //     return;
    // }
    Artwork.searchArtworkByTitle(query, page, MAX_RESULTS, (results, count) => {

        res.json({ results, count });
    });
});

router.get('/search/:query', (req, res, next) => {
    console.log('GET - params:', JSON.stringify(req.params));
    res.redirect('/artwork/search/' + req.params.query + '/1');
    // next();
});

router.get('/search/:query/:page', loggedIn, (req, res, next) => {
    const query = req.params.query;
    const page = req.params.page || 1;

    console.log('GET - Searching for', query, ' - Page: ', page);
    let re = new RegExp('.*' + query + '.*', "i")

    Artwork.find({ title: re }).count().exec((err, count) => {
        if (err) console.log("Couldn't get count.");
        else {
            const skip = (page - 1) * MAX_RESULTS;
            console.log(`Count for ${query}: ${count}, Skip: ${skip}`);
            Artwork.find({ title: re }, (err, results) => {
                if (err) console.log('err', err);
                else {
                    console.log(results.length, ' items found for', query);
                    res.render('shop', {
                        cache: true,
                        data: {
                            artworks: results,
                            items: results.length,
                            total: count,
                            page: page,
                            pagename: 'Shop',
                            query: query,
                            username: username
                        }
                    });
                }
            }).limit(MAX_RESULTS).skip(skip);
        }
    });
});





module.exports = router;