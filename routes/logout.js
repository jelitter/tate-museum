const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    req.session._id = null;
    res.status(200).redirect('/');
});

module.exports = router;