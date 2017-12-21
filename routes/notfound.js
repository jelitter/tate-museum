const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.error('404 - Not found:', req.originalUrl);
    res.status(404).render("../views/partials/error.ejs", {
        cache: true,
        data: {
            error: 404,
            errorMessage: "Not Found"
        }
    });
});

module.exports = router;
