const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Artwork = require('../models/Artwork.js');
const MAX_RESULTS = 8;

loggedIn = function(req, res, next) {
    if (req.session._id) return next();
    else {
        return res.render('index', {
            cache: false,
            data: {
                pagename: 'Login',
                type: 'warning',
                message: 'Please login first',
            }
        });
    }
};

router.get('/', loggedIn, (req, res) => {
    query = req.query.query || '';
    page = req.query.page || 1;
    
    Artwork.searchArtworkByTitle(query, 1, resultsPerPage = MAX_RESULTS, (results, count) => {
        res.status(200).render('shop', {
            cache: false,
            data: {
                artworks: results,
                items: results.length,
                page: 1 ,
                pagename: 'Shop', 
                query: '',
                resultsPerPage: resultsPerPage,
                total: count, 
                username: req.session.username,
                cartItems: req.session.cartItems
            }
        });
    });
});

router.post('/search', loggedIn, (req, res, next) => {

    // query = req.query.query || '';
    // page = req.query.page || 1;
    query = req.body.query;
    page = req.body.page;


    Artwork.searchArtworkByTitle(query, page, 8, (results, count) => {
        res.render('partials/shop_results', {
            cache: false,
            data: {
                artworks: results,
                items: results.length,
                page: page,
                pagename: 'Shop',
                query: query,
                resultsPerPage: resultsPerPage,
                total: count,
                username: req.session.username,
                cartItems: req.session.cartItems
            }
        });
    });
});







module.exports = router;