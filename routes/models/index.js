const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.format({
        html: () => {
            res.render('../views/about.ejs', { cache: true, data: [] });
        }
    });
});

module.exports = router;


// TO - DO