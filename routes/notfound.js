const express = require('express');
const router = express.Router();
let User = require('../models/user');

router.get('/', (req, res) => {
    User.findOne({ _id: req.session._id }, (err, user) => {
        if (err) res.status(401).redirect('/');
        
        res.status(404).render("../views/partials/error.ejs", {
            cache: true,
            data: {
                error: 404,
                errorMessage: "Not Found",
                url: req.originalUrl,
                username: user ? user.username : '', 
                page: 'Not Found'
            }
        });
    });
});

module.exports = router;
